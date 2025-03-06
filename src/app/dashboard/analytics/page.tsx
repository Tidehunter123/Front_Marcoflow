'use client';

import * as React from 'react';
import { keyframes } from '@emotion/react';
import { Button, Modal, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

import { UserContext } from '@/contexts/auth/user-context';
import { DigitalWallet } from '@/components/dashboard/crypto/digital-wallet';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

export default function Page(): React.JSX.Element {
  const userContext = React.useContext(UserContext);
  const [Bmr, setBmr] = React.useState<number | null>(null);
  const [TotalCalorie, setTotalCalorie] = React.useState<number | null>(null);
  const [TargetCalorie, setTargetCalorie] = React.useState<number | null>(null);
  const [Protein, setProtein] = React.useState<number | null>(null);
  const [Fats, setFats] = React.useState<number | null>(null);
  const [Carbos, setCarbos] = React.useState<number | null>(null);
  const [Fibre, setFibre] = React.useState<number | null>(null);
  const [oldBmr, setOldBmr] = React.useState<number | null>(null);
  const [oldTotalCalorie, setOldTotalCalorie] = React.useState<number | null>(null);
  const [oldTargetCalorie, setOldTargetCalorie] = React.useState<number | null>(null);
  const [oldProtein, setOldProtein] = React.useState<number | null>(null);
  const [oldFats, setOldFats] = React.useState<number | null>(null);
  const [oldCarbos, setOldCarbos] = React.useState<number | null>(null);
  const [oldFibre, setOldFibre] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState<boolean>(false); // Modal is closed by default
  const [currentWeight, setCurrentWeight] = React.useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState<string | null>(null); // Replace with dynamic data
  const [isCalculating, setIsCalculating] = React.useState(false);
  if (!userContext) {
    throw new Error('UserContext is not available. Make sure the component is wrapped in a UserProvider.');
  }

  const { user, isLoading, error } = userContext;

  const handleRecalculate = async () => {
    // Add logic to recalculate BMR, Total Calories, and Target Calories based on the new weight
    console.log('Recalculating with current weight:', currentWeight);
    // Example: Call an API or perform calculations here
    setOpen(false); // Close the modal after recalculation

    setIsCalculating(true);

    const userProfileData = {
      id: user?.id,
      mail: user?.email,
      weight: currentWeight,
    };

    try {
      const response = await fetch(`http://localhost:3003/profiles/updateProfile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfileData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user profile');
      }

      const result = await response.json();
      console.log('Profile created successfully:', result.data);

      // Save BMR, TotalCalorie, and TargetCalorie to localStorage
      if (
        Bmr !== null &&
        TotalCalorie !== null &&
        TargetCalorie !== null &&
        Protein !== null &&
        Fats !== null &&
        Carbos !== null &&
        Fibre !== null
      ) {
        localStorage.setItem('Bmr', Bmr.toString());
        localStorage.setItem('TotalCalorie', TotalCalorie.toString());
        localStorage.setItem('TargetCalorie', TargetCalorie.toString());
        localStorage.setItem('Protein', Protein.toString());
        localStorage.setItem('Fats', Fats.toString());
        localStorage.setItem('Carbos', Carbos.toString());
        localStorage.setItem('Fibre', Fibre.toString());
      }

      window.location.reload();
    } catch (error) {
      console.error('Error creating user profile:', error);
      // Handle error in the UI
    } finally {
      setIsCalculating(false); // Reset loading state
    }
  };

  const getExactDate = (dateString: string) => {
    // Extract the date part (YYYY-MM-DD)
    const dateOnly = dateString.split('T')[0];

    // Split the date into year, month, and day
    const [year, month, day] = dateOnly.split('-');

    // Format it as DD-MM-YYYY
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  const getPastDays = (pastDateString: string) => {
    const pastDate = new Date(pastDateString);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - pastDate;

    // Convert milliseconds to days
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    console.log(differenceInDays);

    return differenceInDays;
  };

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

        setBmr(summaryData.BMR);
        setTargetCalorie(summaryData.Target_Calories);
        setTotalCalorie(summaryData.Total_Maintenance_Calories);
        setProtein(summaryData.Protein);
        setFats(summaryData.Fats);
        setCarbos(summaryData.Carbohydrates);
        setFibre(summaryData.Fibre);
        setLastUpdated(result.CalculationData.updated_at);

        const bmr = localStorage.getItem('Bmr');
        const totalCalorie = localStorage.getItem('TotalCalorie');
        const targetCalorie = localStorage.getItem('TargetCalorie');
        const protein = localStorage.getItem('Protein');
        const fats = localStorage.getItem('Fats');
        const carbos = localStorage.getItem('Carbos');
        const fibre = localStorage.getItem('Fibre');

        // Parse and set the data in state
        if (bmr) setOldBmr(parseFloat(bmr));
        if (totalCalorie) setOldTotalCalorie(parseFloat(totalCalorie));
        if (targetCalorie) setOldTargetCalorie(parseFloat(targetCalorie));
        if (protein) setOldProtein(parseFloat(protein));
        if (fats) setOldFats(parseFloat(fats));
        if (carbos) setOldCarbos(parseFloat(carbos));
        if (fibre) setOldFibre(parseFloat(fibre));

        // Check if the last updated date is more than 1 day ago
        const pastDays = getPastDays(result.CalculationData.updated_at);
        if (pastDays > 1) {
          setOpen(true); // Open the modal if more than 1 day has passed
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id]);

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
            <Typography variant="h4">Weekly Weight Tracking & Auto-Adjustments</Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2" color="text.secondary" sx={{ color: '#000000' }}>
            Last updated:{' '}
            <span style={{ color: '#D51331', fontWeight: '700' }}>
              {getExactDate(String(lastUpdated)) === 'undefined-undefined-null'
                ? ''
                : getExactDate(String(lastUpdated))}
            </span>
          </Typography>
          {/* Label (Typography) */}
          <Typography variant="body2">Current Weight (kg):</Typography>

          {/* Input (TextField) */}
          <TextField
            type="number"
            value={currentWeight || ''}
            onChange={(e) => {
              setCurrentWeight(parseFloat(e.target.value));
            }}
            sx={{
              width: '100px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#E3E3E3', // Light gray border
                },
                '&:hover fieldset': {
                  borderColor: '#FDFA53', // Accent color on hover
                },
              },
            }}
          />

          {/* Button */}
          <Button
            onClick={handleRecalculate}
            disabled={!currentWeight}
            sx={{
              width: '100px',
              bgcolor: '#FDFA53', // Use accent color
              color: 'black', // Black text
              fontWeight: '600',
              fontFamily: 'Poppins, sans-serif',
              border: '2px solid black', // Add a border
              '&:hover': {
                bgcolor: '#E3E3E3', // Light gray on hover
                transform: 'scale(1.05)', // Slight scale effect on hover
                border: '2px solid #FDFA53', // Change border color on hover
              },
              transition: 'all 0.2s ease-in-out', // Smooth transition
            }}
          >
            Submit
          </Button>
        </Stack>
        <Grid container spacing={4}>
          <Grid size={12}>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', xl: '1fr 1fr 1fr' },
              }}
            >
              <DigitalWallet
                amount={Bmr ? Bmr.toFixed(0) : '---'}
                color="#D51331"
                type="BMR"
                data={[
                  56, 61, 64, 60, 63, 61, 60, 68, 66, 64, 77, 60, 65, 51, 72, 80, 74, 67, 77, 83, 94, 95, 89, 100, 94,
                  104, 101, 105, 104, 103, 107, 120,
                ]}
                diff={Bmr !== null && oldBmr !== null ? parseFloat(Math.abs(Bmr - oldBmr).toFixed(0)) : null}
                isDiff={oldBmr !== null}
                trend={Bmr !== null && oldBmr !== null && parseFloat((Bmr - oldBmr).toFixed(0)) >= 0 ? 'up' : 'down'}
              />

              <DigitalWallet
                amount={TotalCalorie ? TotalCalorie.toFixed(0) : '---'}
                color="#D51331"
                type="Total"
                data={[
                  65, 64, 70, 76, 82, 80, 85, 78, 82, 95, 93, 80, 112, 102, 105, 95, 98, 102, 104, 99, 101, 100, 109,
                  106, 111, 105, 108, 102, 118, 129,
                ]}
                diff={
                  TotalCalorie !== null && oldTotalCalorie !== null
                    ? parseFloat(Math.abs(TotalCalorie - oldTotalCalorie).toFixed(0))
                    : null
                }
                trend={
                  TotalCalorie !== null &&
                  oldTotalCalorie !== null &&
                  parseFloat((TotalCalorie - oldTotalCalorie).toFixed(0)) >= 0
                    ? 'up'
                    : 'down'
                }
                isDiff={oldTotalCalorie !== null}
              />
              <DigitalWallet
                amount={TargetCalorie ? TargetCalorie.toFixed(0) : '---'}
                color="#D51331"
                type="Target"
                data={[
                  99, 101, 104, 98, 99, 99, 102, 103, 100, 101, 99, 101, 101, 98, 95, 97, 98, 92, 94, 93, 95, 82, 78,
                  75, 80, 78, 76, 54, 45, 32, 31, 27,
                ]}
                diff={
                  TargetCalorie !== null && oldTargetCalorie !== null
                    ? parseFloat(Math.abs(TargetCalorie - oldTargetCalorie).toFixed(0))
                    : null
                }
                isDiff={oldTargetCalorie !== null}
                trend={
                  TargetCalorie !== null &&
                  oldTargetCalorie !== null &&
                  parseFloat((TargetCalorie - oldTargetCalorie).toFixed(0)) >= 0
                    ? 'up'
                    : 'down'
                }
              />
            </Box>
          </Grid>
          <Grid size={12} mt={1}>
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
                  {Protein ? (
                    <Typography variant="h3">{Protein.toFixed(2)} g</Typography>
                  ) : (
                    <Typography variant="h3">---</Typography>
                  )}
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    {oldProtein !== null && Protein !== null ? (
                      <>
                        {Protein - oldProtein >= 0 ? (
                          <>
                            {' '}
                            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
                            <Typography color="text.secondary" variant="body2">
                              <Typography color="success.main" component="span" variant="subtitle2">
                                {Math.abs(Protein - oldProtein).toFixed(2)} g
                              </Typography>{' '}
                              increase
                            </Typography>
                          </>
                        ) : (
                          <>
                            <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
                            <Typography color="text.secondary" variant="body2">
                              <Typography color="error.main" component="span" variant="subtitle2">
                                {Math.abs(Protein - oldProtein).toFixed(2)} g
                              </Typography>{' '}
                              decrease
                            </Typography>
                          </>
                        )}
                      </>
                    ) : null}
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
                  {Fats ? (
                    <Typography variant="h3">{Fats.toFixed(2)} g</Typography>
                  ) : (
                    <Typography variant="h3">---</Typography>
                  )}
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    {oldFats !== null && Fats !== null ? (
                      <>
                        {Fats - oldFats >= 0 ? (
                          <>
                            {' '}
                            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
                            <Typography color="text.secondary" variant="body2">
                              <Typography color="success.main" component="span" variant="subtitle2">
                                {Math.abs(Fats - oldFats).toFixed(2)} g
                              </Typography>{' '}
                              increase
                            </Typography>
                          </>
                        ) : (
                          <>
                            <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
                            <Typography color="text.secondary" variant="body2">
                              <Typography color="error.main" component="span" variant="subtitle2">
                                {Math.abs(Fats - oldFats).toFixed(2)} g
                              </Typography>{' '}
                              decrease
                            </Typography>
                          </>
                        )}
                      </>
                    ) : null}
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
                    {Carbos ? (
                      <Typography variant="h3">{Carbos.toFixed(2)} g</Typography>
                    ) : (
                      <Typography variant="h3">---</Typography>
                    )}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    {oldCarbos !== null && Carbos !== null ? (
                      <>
                        {Carbos - oldCarbos >= 0 ? (
                          <>
                            {' '}
                            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
                            <Typography color="text.secondary" variant="body2">
                              <Typography color="success.main" component="span" variant="subtitle2">
                                {Math.abs(Carbos - oldCarbos).toFixed(2)} g
                              </Typography>{' '}
                              increase
                            </Typography>
                          </>
                        ) : (
                          <>
                            <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
                            <Typography color="text.secondary" variant="body2">
                              <Typography color="error.main" component="span" variant="subtitle2">
                                {Math.abs(Carbos - oldCarbos).toFixed(2)} g
                              </Typography>{' '}
                              decrease
                            </Typography>
                          </>
                        )}
                      </>
                    ) : null}
                  </Stack>
                </Stack>
                <Stack spacing={1}>
                  <Typography color="text.secondary">Fibre</Typography>
                  {Fibre ? (
                    <Typography variant="h3">{Fibre.toFixed(2)} g</Typography>
                  ) : (
                    <Typography variant="h3">---</Typography>
                  )}
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    {oldFibre !== null && Fibre !== null ? (
                      <>
                        {Fibre - oldFibre >= 0 ? (
                          <>
                            {' '}
                            <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
                            <Typography color="text.secondary" variant="body2">
                              <Typography color="success.main" component="span" variant="subtitle2">
                                {Math.abs(Fibre - oldFibre).toFixed(2)} g
                              </Typography>{' '}
                              increase
                            </Typography>
                          </>
                        ) : (
                          <>
                            <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
                            <Typography color="text.secondary" variant="body2">
                              <Typography color="error.main" component="span" variant="subtitle2">
                                {Math.abs(Fibre - oldFibre).toFixed(2)} g
                              </Typography>{' '}
                              decrease
                            </Typography>
                          </>
                        )}
                      </>
                    ) : null}
                  </Stack>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Stack>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="weight-update-modal"
        aria-describedby="update-your-weight"
        sx={{
          backdropFilter: 'blur(1px)', // Add backdrop blur
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '400px',
            bgcolor: 'white', // Use white background
            boxShadow: 24,
            borderRadius: '12px', // Slightly larger border radius
            p: 3,
            animation: `${fadeIn} 0.3s ease-out`, // Apply fade-in animation
            border: '2px solid #FDFA53', // Add a border with the accent color
          }}
        >
          <Typography
            variant="h6"
            id="weight-update-modal"
            gutterBottom
            sx={{
              color: 'rgba(0,0,0,0.7)', // Use black for text
              fontWeight: '600', // Bold font weight
              fontFamily: 'Poppins, sans-serif', // Modern font
            }}
          >
            Please update your current weight. It’s been{' '}
            <span style={{ color: '#D51331', fontWeight: '700' }}>{getPastDays(String(lastUpdated))}</span> days since
            your last calculation.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, color: '#888', fontFamily: 'Poppins, sans-serif' }} // Lighter text for last updated
          >
            Last updated: {getExactDate(String(lastUpdated))}
          </Typography>
          <Grid container spacing={4}>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Current Weight (kg)"
                type="number"
                value={currentWeight || ''}
                onChange={(e) => {
                  setCurrentWeight(parseFloat(e.target.value));
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E3E3E3', // Light gray border
                    },
                    '&:hover fieldset': {
                      borderColor: '#FDFA53', // Accent color on hover
                    },
                  },
                }}
              />
            </Grid>
            <Grid size={6} mt={3.5}>
              <Button
                onClick={handleRecalculate}
                disabled={!currentWeight}
                sx={{
                  width: '100%',
                  maxWidth: '200px',
                  bgcolor: '#FDFA53', // Use accent color
                  color: 'black', // Black text
                  fontWeight: '600',
                  fontFamily: 'Poppins, sans-serif',
                  '&:hover': {
                    bgcolor: '#E3E3E3', // Light gray on hover
                    transform: 'scale(1.05)', // Slight scale effect on hover
                  },
                  transition: 'all 0.2s ease-in-out', // Smooth transition
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
