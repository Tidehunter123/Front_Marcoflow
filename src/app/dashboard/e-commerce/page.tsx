'use client';

import * as React from 'react';
import {
  Paper,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { UserContext } from '@/contexts/auth/user-context';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  transition: 'background 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const columns = [
  'Week',
  'Weight (kg)',
  'BMR (kcal)',
  'Total Maintenance Calories (kcal)',
  'Target Calories (kcal)',
  'Protein (g)',
  'Fats (g)',
  'Carbohydrates (g)',
  'Fibre (g)',
];

const cyclingColumns = [
  'Week',
  'Weight (kg)',
  'BMR (kcal)',
  'Total Maintenance Calories (kcal)',
  'Target Calories (kcal)',
  'TrainingDay Calories (kcal)',
  'TrainingDay Protein (g)',
  'TrainingDay Fats (g)',
  'TrainigDay Carbohydrates (g)',
  'TrainigDay Fibre (g)',
  'RestDay Calories (kcal)',
  'RestDay Protein (g)',
  'RestDay Fats (g)',
  'RestDay Carbohydrates (g)',
  'RestDay Fibre (g)',
];

const bankingColumns = [
  'Week',
  'Weight (kg)',
  'BMR (kcal)',
  'Total Maintenance Calories (kcal)',
  'Target Calories (kcal)',
  'weekday Calories (kcal)',
  'weekday Protein (g)',
  'weekday Fats (g)',
  'weekday Carbohydrates (g)',
  'weekday Fibre (g)',
  'weekend Calories (kcal)',
  'weekend Protein (g)',
  'weekend Fats (g)',
  'weekend Carbohydrates (g)',
  'weekend Fibre (g)',
];

const getTypeFromTab = (tab: '-0.5%' | '-1%' | '+0.5%' | '+0.75%') => {
  switch (tab) {
    case '-0.5%':
      return 1;
    case '-1%':
      return 2;
    case '+0.5%':
      return 3;
    case '+0.75%':
      return 4;
    default:
      return 1;
  }
};

export default function Page(): React.JSX.Element {
  const userContext = React.useContext(UserContext);
  const [progressionData, setProgressionData] = React.useState<any[]>([]);
  const [weight, setWeight] = React.useState<number | null>(null);
  const [activeTab, setActiveTab] = React.useState<'-0.5%' | '-1%' | '+0.5%' | '+0.75%'>('-0.5%');
  const [calorieCycling, setCalorieCycling] = React.useState(false);
  const [calorieBanking, setCalorieBanking] = React.useState(false);

  if (!userContext) {
    throw new Error('UserContext is not available. Make sure the component is wrapped in a UserProvider.');
  }

  const { user, isLoading, error } = userContext;

  React.useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch('https://backend.macroflow.io/profiles/weeklyData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id, // Ensure `user.id` exists
            type: getTypeFromTab(activeTab), // Map tab value to type
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        console.log(result, 'result');

        setProgressionData(result.data);

        if (result.Profile?.weight) setWeight(Number(result.Profile.weight));
        if (result.Profile?.calorieCycling !== undefined) setCalorieCycling(result.Profile.calorieCycling);
        if (result.Profile?.calorieBanking !== undefined) setCalorieBanking(result.Profile.calorieBanking);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id, activeTab]);

  console.log(progressionData, 'progressionData');
  console.log(weight, 'weight');
  console.log(calorieCycling, 'calorieCycling');
  console.log(calorieBanking, 'calorieBanking');

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
            <div className="p-4">
              <Tabs
                value={activeTab}
                onChange={(_: React.SyntheticEvent, newValue: '-0.5%' | '-1%' | '+0.5%' | '+0.75%') => {
                  setActiveTab(newValue);
                }}
                variant="fullWidth"
                sx={{
                  mb: 1,
                  '& .MuiTabs-indicator': { backgroundColor: '#D51331' },
                  '& .MuiTab-root': { fontSize: '1.2rem' },
                }}
              >
                <Tab label="Weekly WL 0.5%" value="-0.5%" />
                <Tab label="Weekly WL 1%" value="-1%" />
                <Tab label="Weekly MG 0.5%" value="+0.5%" />
                <Tab label="Weekly MG 0.75%" value="+0.75%" />
              </Tabs>

              <TableContainer component={Paper} elevation={3} sx={{ maxHeight: '65vh', overflowY: 'auto' }}>
                <Table size="small" stickyHeader aria-label="nutrition table">
                  <TableHead sx={{ bgcolor: 'background.default' }}>
                    <TableRow>
                      {!calorieCycling &&
                        !calorieBanking &&
                        columns.map((col) => (
                          <TableCell
                            key={col}
                            sx={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.8)', textAlign: 'center' }}
                          >
                            {col}
                          </TableCell>
                        ))}
                      {calorieCycling && !calorieBanking
                        ? cyclingColumns.map((col) => (
                            <TableCell
                              key={col}
                              sx={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.8)', textAlign: 'center' }}
                            >
                              {col}
                            </TableCell>
                          ))
                        : null}
                      {!calorieCycling && calorieBanking
                        ? bankingColumns.map((col) => (
                            <TableCell
                              key={col}
                              sx={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.8)', textAlign: 'center' }}
                            >
                              {col}
                            </TableCell>
                          ))
                        : null}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {!calorieCycling &&
                      !calorieBanking &&
                      progressionData.map((row) => (
                        <StyledTableRow key={row.Week}>
                          <TableCell sx={{ textAlign: 'center' }}>{row.Week}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{Number(row.Weight).toFixed(1)}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{Math.round(row.BMR)}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>
                            {Math.round(row.Total_Maintenance_Calories)}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{Math.round(row.Target_Calories)}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{row.Protein.toFixed(1)}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{row.Fats.toFixed(1)}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{row.Carbohydrates.toFixed(1)}</TableCell>
                          <TableCell sx={{ textAlign: 'center' }}>{row.Fibre}</TableCell>
                        </StyledTableRow>
                      ))}
                    {calorieCycling && !calorieBanking
                      ? progressionData.map((row) => (
                          <StyledTableRow key={row.Week}>
                            <TableCell sx={{ textAlign: 'center' }}>{row.Week}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{Number(row.Weight).toFixed(1)}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{Math.round(row.BMR.toFixed(0))}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Total_Maintenance_Calories.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Target_Calories.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.TrainingDayCalories.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Training_Protein.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Training_Fats.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Training_Carbohydrates.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Training_Fibre.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.RestDayCalories.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Rest_Protein.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{Math.round(row.Rest_Fats.toFixed(0))}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Rest_Carbohydrates.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{Math.round(row.Rest_Fibre.toFixed(0))}</TableCell>
                          </StyledTableRow>
                        ))
                      : null}
                    {!calorieCycling && calorieBanking
                      ? progressionData.map((row) => (
                          <StyledTableRow key={row.Week}>
                            <TableCell sx={{ textAlign: 'center' }} b>
                              {row.Week}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{Number(row.Weight).toFixed(1)}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{Math.round(row.BMR.toFixed(0))}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Total_Maintenance_Calories.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Target_Calories.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.WeekdayCalories.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Weekday_Protein.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Weekday_Fats.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Weekday_Carbohydrates.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Weekday_Fibre.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.WeekendCalories.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Weekend_Protein.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Weekend_Fats.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Weekend_Carbohydrates.toFixed(0))}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                              {Math.round(row.Weekend_Fibre.toFixed(0))}
                            </TableCell>
                          </StyledTableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
