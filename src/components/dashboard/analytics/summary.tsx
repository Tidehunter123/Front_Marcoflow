import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

import { UserContext } from '@/contexts/auth/user-context';

export function Summary(): React.JSX.Element {
  const userContext = React.useContext(UserContext);
  const [oldProtein, setOldProtein] = React.useState<number | null>(null);
  const [oldFats, setOldFats] = React.useState<number | null>(null);
  const [oldCarbos, setOldCarbos] = React.useState<number | null>(null);
  const [oldFibre, setOldFibre] = React.useState<number | null>(null);

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

        const summaryData = result.CalculationData.json_data.macroflow_results.summary;

        setOldProtein(summaryData.Protein);
        setOldFats(summaryData.Fats);
        setOldCarbos(summaryData.Carbohydrates);
        setOldFibre(summaryData.Fibre);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id]);

  return (
    <Card>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
          p: 3,
        }}
      >
        <Stack
          spacing={1}
          sx={{
            borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' },
            borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
            pb: { xs: 2, md: 0 },
          }}
        >
          <Typography color="text.secondary">Protein</Typography>
          {oldProtein ? (
            <Typography variant="h3">{oldProtein.toFixed(2)} g</Typography>
          ) : (
            <Typography variant="h3">---</Typography>
          )}
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="success.main" component="span" variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(15 / 100)}
              </Typography>{' '}
              increase
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={1}
          sx={{
            borderRight: { xs: 'none', lg: '1px solid var(--mui-palette-divider)' },
            borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
            pb: { xs: 2, md: 0 },
          }}
        >
          <Typography color="text.secondary">Fats</Typography>
          {oldFats ? (
            <Typography variant="h3">{oldFats.toFixed(2)} g</Typography>
          ) : (
            <Typography variant="h3">---</Typography>
          )}
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="success.main" component="span" variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(10 / 100)}
              </Typography>{' '}
              increase
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={1}
          sx={{
            borderRight: { xs: 'none', md: '1px solid var(--mui-palette-divider)' },
            borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
            pb: { xs: 2, md: 0 },
          }}
        >
          <Typography color="text.secondary">Cabohydrates</Typography>
          <Typography variant="h3">
            {oldCarbos ? (
              <Typography variant="h3">{oldCarbos.toFixed(2)} g</Typography>
            ) : (
              <Typography variant="h3">---</Typography>
            )}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="error.main" component="span" variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(25 / 100)}
              </Typography>{' '}
              decrease
            </Typography>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography color="text.secondary">Fibre</Typography>
          {oldFibre ? (
            <Typography variant="h3">{oldFibre.toFixed(2)} g</Typography>
          ) : (
            <Typography variant="h3">---</Typography>
          )}
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
            <Typography color="text.secondary" variant="body2">
              <Typography color="error.main" component="span" variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(15 / 100)}
              </Typography>{' '}
              decrease
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
