'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { UserContext } from '@/contexts/auth/user-context';
import { Stats } from '@/components/dashboard/e-commerce/stats';

export default function Page(): React.JSX.Element {
  const userContext = React.useContext(UserContext);
  const [progressionData, setProgressionData] = React.useState<
    { name: string; v1: number; v2: number; v3: number; v4: number }[]
  >([]);
  const [weight, setWeight] = React.useState<number | null>(null);

  if (!userContext) {
    throw new Error('UserContext is not available. Make sure the component is wrapped in a UserProvider.');
  }

  const { user, isLoading, error } = userContext;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/profiles/${user?.id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log(result, 'result');

        const progressionData = result.CalculationData.json_data.progression_chart;
        setProgressionData(progressionData);

        const weight = result.Profile.weight;
        if (weight) setWeight(Number(weight));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id]);

  const chartData = progressionData?.map((week) => ({
    name: `Week ${week.week}`,
    v1: week['weight_loss_0.5%'],
    v2: week['weight_loss_1%'],
    v3: week['weight_gain_0.5%'],
    v4: week['weight_gain_0.75%'],
  }));

  return (
    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
        mt: -2,
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Progress Tracking & Insights</Typography>
          </Box>
        </Stack>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Stats data={chartData} weight={weight} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
