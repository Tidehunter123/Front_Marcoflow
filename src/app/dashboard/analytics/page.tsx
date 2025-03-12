'use client';

import * as React from 'react';
import { keyframes } from '@emotion/react';
import { Button, CircularProgress, Modal, TextField, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const userContext = React.useContext(UserContext);
  const [Bmr, setBmr] = React.useState<number | null>(null);
  const [TotalCalorie, setTotalCalorie] = React.useState<number | null>(null);
  const [TargetCalorie, setTargetCalorie] = React.useState<number | null>(null);
  const [trainingDayCalories, setTrainingDayCalories] = React.useState<number | null>(null);
  const [restDayCalories, setRestDayCalories] = React.useState<number | null>(null);
  const [weekdayCalories, setWeekdayCalories] = React.useState<number | null>(null);
  const [weekendCalories, setWeekendCalories] = React.useState<number | null>(null);
  const [Protein, setProtein] = React.useState<number | null>(null);
  const [Fats, setFats] = React.useState<number | null>(null);
  const [Carbos, setCarbos] = React.useState<number | null>(null);
  const [Fibre, setFibre] = React.useState<number | null>(null);
  const [oldBmr, setOldBmr] = React.useState<number | null>(null);
  const [oldTotalCalorie, setOldTotalCalorie] = React.useState<number | null>(null);
  const [oldTargetCalorie, setOldTargetCalorie] = React.useState<number | null>(null);

  const [oldTrainingDayCalories, setOldTrainingDayCalories] = React.useState<number | null>(null);
  const [oldRestDayCalories, setOldRestDayCalories] = React.useState<number | null>(null);

  const [oldWeekdayCalories, setOldWeekdayCalories] = React.useState<number | null>(null);
  const [oldWeekendCalories, setOldWeekendCalories] = React.useState<number | null>(null);
  const [oldTrainingDayProtein, setOldTrainingDayProtein] = React.useState<number | null>(null);
  const [oldTrainingFats, setOldTrainingDayFats] = React.useState<number | null>(null);
  const [oldTrainingDayCarbos, setOldTrainingDayCarbos] = React.useState<number | null>(null);
  const [oldTrainingDayFibre, setOldTrainingDayFibre] = React.useState<number | null>(null);

  const [oldRestDayProtein, setOldRestDayProtein] = React.useState<number | null>(null);
  const [oldRestDayFats, setOldRestDayFats] = React.useState<number | null>(null);
  const [oldRestDayCarbos, setOldRestDayCarbos] = React.useState<number | null>(null);
  const [oldRestDayFibre, setOldRestDayFibre] = React.useState<number | null>(null);

  const [oldWeekDayProtein, setOldWeekDayProtein] = React.useState<number | null>(null);
  const [oldWeekDayFats, setOldWeekDayFats] = React.useState<number | null>(null);
  const [oldWeekDayCarbos, setOldWeekDayCarbos] = React.useState<number | null>(null);
  const [oldWeekDayFibre, setOldWeekDayFibre] = React.useState<number | null>(null);

  const [oldWeekendProtein, setOldWeekendProtein] = React.useState<number | null>(null);
  const [oldWeekendFats, setOldWeekendFats] = React.useState<number | null>(null);
  const [oldWeekendCarbos, setOldWeekendCarbos] = React.useState<number | null>(null);
  const [oldWeekendFibre, setOldWeekendFibre] = React.useState<number | null>(null);

  const [oldProtein, setOldProtein] = React.useState<number | null>(null);
  const [oldFats, setOldFats] = React.useState<number | null>(null);
  const [oldCarbos, setOldCarbos] = React.useState<number | null>(null);
  const [oldFibre, setOldFibre] = React.useState<number | null>(null);

  const [open, setOpen] = React.useState<boolean>(false); // Modal is closed by default
  const [currentWeight, setCurrentWeight] = React.useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState<string | null>(null); // Replace with dynamic data
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [trainingDayProtein, setTrainingDayProtein] = React.useState<number | null>(null);
  const [trainingDayFats, setTrainingDayFats] = React.useState<number | null>(null);
  const [trainingDayCarbos, setTrainingDayCarbos] = React.useState<number | null>(null);
  const [trainingDayFibre, setTrainingDayFibre] = React.useState<number | null>(null);

  const [restDayProtein, setRestDayProtein] = React.useState<number | null>(null);
  const [restDayFats, setRestDayFats] = React.useState<number | null>(null);
  const [restDayCarbos, setRestDayCarbos] = React.useState<number | null>(null);
  const [restDayFibre, setRestDayFibre] = React.useState<number | null>(null);

  const [weekDayProtein, setWeekDayProtein] = React.useState<number | null>(null);
  const [weekDayFats, setWeekDayFats] = React.useState<number | null>(null);
  const [weekDayCarbos, setWeekDayCarbos] = React.useState<number | null>(null);
  const [weekDayFibre, setWeekDayFibre] = React.useState<number | null>(null);

  const [weekendProtein, setWeekendProtein] = React.useState<number | null>(null);
  const [weekendFats, setWeekendFats] = React.useState<number | null>(null);
  const [weekendCarbos, setWeekendCarbos] = React.useState<number | null>(null);
  const [weekendFibre, setWeekendFibre] = React.useState<number | null>(null);
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
      const response = await fetch(`https://backend.macroflow.io/profiles/updateProfile`, {
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

      if (trainingDayCalories !== null) {
        localStorage.setItem('trainingDayCalories', trainingDayCalories.toString());
      }
      if (restDayCalories !== null) {
        localStorage.setItem('restDayCalories', restDayCalories.toString());
      }
      if (weekdayCalories !== null) {
        localStorage.setItem('weekdayCalories', weekdayCalories.toString());
      }
      if (weekendCalories !== null) {
        localStorage.setItem('weekendCalories', weekendCalories.toString());
      }

      if (trainingDayProtein !== null) {
        localStorage.setItem('trainingDayProtein', trainingDayProtein.toString());
      }
      if (trainingDayFats !== null) {
        localStorage.setItem('trainingDayFats', trainingDayFats.toString());
      }
      if (trainingDayCarbos !== null) {
        localStorage.setItem('trainingDayCarbos', trainingDayCarbos.toString());
      }
      if (trainingDayFibre !== null) {
        localStorage.setItem('trainingDayFibre', trainingDayFibre.toString());
      }

      if (restDayProtein !== null) {
        localStorage.setItem('restDayProtein', restDayProtein.toString());
      }
      if (restDayFats !== null) {
        localStorage.setItem('restDayFats', restDayFats.toString());
      }
      if (restDayCarbos !== null) {
        localStorage.setItem('restDayCarbos', restDayCarbos.toString());
      }
      if (restDayFibre !== null) {
        localStorage.setItem('restDayFibre', restDayFibre.toString());
      }

      if (weekDayProtein !== null) {
        localStorage.setItem('weekDayProtein', weekDayProtein.toString());
      }
      if (weekDayFats !== null) {
        localStorage.setItem('weekDayFats', weekDayFats.toString());
      }
      if (weekDayCarbos !== null) {
        localStorage.setItem('weekDayCarbos', weekDayCarbos.toString());
      }
      if (weekDayFibre !== null) {
        localStorage.setItem('weekDayFibre', weekDayFibre.toString());
      }

      if (weekendProtein !== null) {
        localStorage.setItem('weekendProtein', weekendProtein.toString());
      }
      if (weekendFats !== null) {
        localStorage.setItem('weekendFats', weekendFats.toString());
      }
      if (weekendCarbos !== null) {
        localStorage.setItem('weekendCarbos', weekendCarbos.toString());
      }
      if (weekendFibre !== null) {
        localStorage.setItem('weekendFibre', weekendFibre.toString());
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

    return differenceInDays;
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend.macroflow.io/profiles/${user?.id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log(result, 'result');

        const summaryData = result.CalculationData.json_data.summary;

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

        if (summaryData.TrainingDayCalories !== null) {
          setTrainingDayCalories(summaryData.TrainingDayCalories);
        }
        if (summaryData.RestDayCalories !== null) {
          setRestDayCalories(summaryData.RestDayCalories);
        }
        if (summaryData.WeekdayCalories !== null) {
          setWeekdayCalories(summaryData.WeekdayCalories);
        }
        if (summaryData.WeekendCalories !== null) {
          setWeekendCalories(summaryData.WeekendCalories);
        }

        if (summaryData.Training_Protein !== null) {
          setTrainingDayProtein(summaryData.Training_Protein);
        }
        if (summaryData.Training_Fats !== null) {
          setTrainingDayFats(summaryData.Training_Fats);
        }
        if (summaryData.Training_Carbohydrates !== null) {
          setTrainingDayCarbos(summaryData.Training_Carbohydrates);
        }
        if (summaryData.Training_Fibre !== null) {
          setTrainingDayFibre(summaryData.Training_Fibre);
        }

        if (summaryData.Rest_Protein !== null) {
          setRestDayProtein(summaryData.Rest_Protein);
        }
        if (summaryData.Rest_Fats !== null) {
          setRestDayFats(summaryData.Rest_Fats);
        }
        if (summaryData.Rest_Carbohydrates !== null) {
          setRestDayCarbos(summaryData.Rest_Carbohydrates);
        }
        if (summaryData.Rest_Fibre !== null) {
          setRestDayFibre(summaryData.Rest_Fibre);
        }

        if (summaryData.Weekday_Protein !== null) {
          setWeekDayProtein(summaryData.Weekday_Protein);
        }
        if (summaryData.Weekday_Fats !== null) {
          setWeekDayFats(summaryData.Weekday_Fats);
        }
        if (summaryData.Weekday_Carbohydrates !== null) {
          setWeekDayCarbos(summaryData.Weekday_Carbohydrates);
        }
        if (summaryData.Weekday_Fibre !== null) {
          setWeekDayFibre(summaryData.Weekday_Fibre);
        }

        if (summaryData.Weekend_Protein !== null) {
          setWeekendProtein(summaryData.Weekend_Protein);
        }
        if (summaryData.Weekend_Fats !== null) {
          setWeekendFats(summaryData.Weekend_Fats);
        }
        if (summaryData.Weekend_Carbohydrates !== null) {
          setWeekendCarbos(summaryData.Weekend_Carbohydrates);
        }
        if (summaryData.Weekend_Fibre !== null) {
          setWeekendFibre(summaryData.Weekend_Fibre);
        }

        const trainingDayCalories = localStorage.getItem('trainingDayCalories');
        const restDayCalories = localStorage.getItem('restDayCalories');
        const weekdayCalories = localStorage.getItem('weekdayCalories');
        const weekendCalories = localStorage.getItem('weekendCalories');

        const trainingDayProtein = localStorage.getItem('trainingDayProtein');
        const trainingDayFats = localStorage.getItem('trainingDayFats');
        const trainingDayCarbos = localStorage.getItem('trainingDayCarbos');
        const trainingDayFibre = localStorage.getItem('trainingDayFibre');

        const restDayProtein = localStorage.getItem('trainingDayProtein');
        const restDayFats = localStorage.getItem('trainingDayFats');
        const restDayCarbos = localStorage.getItem('trainingDayCarbos');
        const restDayFibre = localStorage.getItem('trainingDayFibre');

        const weekendProtein = localStorage.getItem('weekendProtein');
        const weekendFats = localStorage.getItem('weekendFats');
        const weekendCarbos = localStorage.getItem('weekendCarbos');
        const weekendFibre = localStorage.getItem('weekendFibre');

        const weekDayProtein = localStorage.getItem('weekDayProtein');
        const weekDayFats = localStorage.getItem('weekDayFats');
        const weekDayCarbos = localStorage.getItem('weekDayCarbos');
        const weekDayFibre = localStorage.getItem('weekDayFibre');

        // Parse and set the data in state
        if (trainingDayCalories) setOldTrainingDayCalories(parseFloat(trainingDayCalories));
        if (restDayCalories) setOldRestDayCalories(parseFloat(restDayCalories));
        if (weekdayCalories) setOldWeekdayCalories(parseFloat(weekdayCalories));
        if (weekendCalories) setOldWeekendCalories(parseFloat(weekendCalories));
        if (trainingDayProtein) setOldTrainingDayProtein(parseFloat(trainingDayProtein));
        if (trainingDayFats) setOldTrainingDayFats(parseFloat(trainingDayFats));
        if (trainingDayCarbos) setOldTrainingDayCarbos(parseFloat(trainingDayCarbos));
        if (trainingDayFibre) setOldTrainingDayFibre(parseFloat(trainingDayFibre));

        if (restDayProtein) setOldRestDayProtein(parseFloat(restDayProtein));
        if (restDayFats) setOldRestDayFats(parseFloat(restDayFats));
        if (restDayCarbos) setOldRestDayCarbos(parseFloat(restDayCarbos));
        if (restDayFibre) setOldRestDayFibre(parseFloat(restDayFibre));

        if (weekDayProtein) setOldWeekDayProtein(parseFloat(weekDayProtein));
        if (weekDayFats) setOldWeekDayFats(parseFloat(weekDayFats));
        if (weekDayCarbos) setOldWeekDayCarbos(parseFloat(weekDayCarbos));
        if (weekDayFibre) setOldWeekDayFibre(parseFloat(weekDayFibre));

        if (weekendProtein) setOldWeekendProtein(parseFloat(weekendProtein));
        if (weekendFats) setOldWeekendFats(parseFloat(weekendFats));
        if (weekendCarbos) setOldWeekendCarbos(parseFloat(weekendCarbos));
        if (weekendFibre) setOldWeekendFibre(parseFloat(weekendFibre));

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
        mt: !isMobile ? -3 : 0,
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant={!isMobile ? 'h4' : 'h5'}>Weekly Weight Tracking & Auto-Adjustments</Typography>
          </Box>
        </Stack>
        {!isMobile ? (
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
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ color: '#000000' }}>
              Last updated:{' '}
              <span style={{ color: '#D51331', fontWeight: '700' }}>
                {getExactDate(String(lastUpdated)) === 'undefined-undefined-null'
                  ? ''
                  : getExactDate(String(lastUpdated))}
              </span>
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* Label (Typography) */}
              <Typography variant="body2">Weight (kg):</Typography>

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
          </>
        )}
        <Grid container spacing={4}>
          <Grid size={12}>
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: (() => {
                  if (!trainingDayCalories && !weekdayCalories) {
                    return { xs: '1fr 1fr', sm: '1fr 1fr', xl: '1fr 1fr 1fr' };
                  } else if (trainingDayCalories && !weekdayCalories) {
                    return { xs: '1fr 1fr', sm: '1fr 1fr', xl: '1fr 1fr 1fr 1fr 1fr' };
                  } else if (!trainingDayCalories && weekdayCalories) {
                    return { xs: '1fr 1fr', sm: '1fr 1fr', xl: '1fr 1fr 1fr 1fr 1fr' };
                  } else if (trainingDayCalories && weekdayCalories) {
                    return { xs: '1fr 1fr', sm: '1fr 1fr', xl: '1fr 1fr 1fr 1fr 1fr 1fr 1fr' };
                  }
                })(),
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
                isCalculating={isCalculating}
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
                isCalculating={isCalculating}
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
                isCalculating={isCalculating}
              />

              {trainingDayCalories ? (
                <>
                  <DigitalWallet
                    amount={trainingDayCalories ? trainingDayCalories.toFixed(0) : '---'}
                    color="#D51331"
                    type="TrainingDay"
                    data={[
                      65, 64, 70, 76, 82, 80, 85, 78, 82, 95, 93, 80, 112, 102, 105, 95, 98, 102, 104, 99, 101, 100,
                      109, 106, 111, 105, 108, 102, 118, 129,
                    ]}
                    diff={
                      trainingDayCalories !== null && oldTrainingDayCalories !== null
                        ? parseFloat(Math.abs(trainingDayCalories - oldTrainingDayCalories).toFixed(0))
                        : null
                    }
                    trend={
                      trainingDayCalories !== null &&
                      oldTrainingDayCalories !== null &&
                      parseFloat((trainingDayCalories - oldTrainingDayCalories).toFixed(0)) >= 0
                        ? 'up'
                        : 'down'
                    }
                    isDiff={oldTrainingDayCalories !== null}
                    isCalculating={isCalculating}
                  />
                  <DigitalWallet
                    amount={restDayCalories ? restDayCalories.toFixed(0) : '---'}
                    color="#D51331"
                    type="RestDay"
                    data={[
                      99, 101, 104, 98, 99, 99, 102, 103, 100, 101, 99, 101, 101, 98, 95, 97, 98, 92, 94, 93, 95, 82,
                      78, 75, 80, 78, 76, 54, 45, 32, 31, 27,
                    ]}
                    diff={
                      restDayCalories !== null && oldRestDayCalories !== null
                        ? parseFloat(Math.abs(restDayCalories - oldRestDayCalories).toFixed(0))
                        : null
                    }
                    isDiff={oldRestDayCalories !== null}
                    trend={
                      restDayCalories !== null &&
                      oldRestDayCalories !== null &&
                      parseFloat((restDayCalories - oldRestDayCalories).toFixed(0)) >= 0
                        ? 'up'
                        : 'down'
                    }
                    isCalculating={isCalculating}
                  />
                </>
              ) : null}

              {weekdayCalories ? (
                <>
                  <DigitalWallet
                    amount={weekdayCalories ? weekdayCalories.toFixed(0) : '---'}
                    color="#D51331"
                    type="Weekday"
                    data={[
                      65, 64, 70, 76, 82, 80, 85, 78, 82, 95, 93, 80, 112, 102, 105, 95, 98, 102, 104, 99, 101, 100,
                      109, 106, 111, 105, 108, 102, 118, 129,
                    ]}
                    diff={
                      weekdayCalories !== null && oldWeekdayCalories !== null
                        ? parseFloat(Math.abs(weekdayCalories - oldWeekdayCalories).toFixed(0))
                        : null
                    }
                    trend={
                      weekdayCalories !== null &&
                      oldWeekdayCalories !== null &&
                      parseFloat((weekdayCalories - oldWeekdayCalories).toFixed(0)) >= 0
                        ? 'up'
                        : 'down'
                    }
                    isDiff={oldWeekdayCalories !== null}
                    isCalculating={isCalculating}
                  />
                  <DigitalWallet
                    amount={weekendCalories ? weekendCalories.toFixed(0) : '---'}
                    color="#D51331"
                    type="Weekend"
                    data={[
                      99, 101, 104, 98, 99, 99, 102, 103, 100, 101, 99, 101, 101, 98, 95, 97, 98, 92, 94, 93, 95, 82,
                      78, 75, 80, 78, 76, 54, 45, 32, 31, 27,
                    ]}
                    diff={
                      weekendCalories !== null && oldWeekendCalories !== null
                        ? parseFloat(Math.abs(weekendCalories - oldWeekendCalories).toFixed(0))
                        : null
                    }
                    isDiff={oldWeekendCalories !== null}
                    trend={
                      weekendCalories !== null &&
                      oldWeekendCalories !== null &&
                      parseFloat((weekendCalories - oldWeekendCalories).toFixed(0)) >= 0
                        ? 'up'
                        : 'down'
                    }
                    isCalculating={isCalculating}
                  />
                </>
              ) : null}
            </Box>
          </Grid>
          {!trainingDayCalories && !weekdayCalories ? (
            <Grid size={12} mt={1}>
              <Card>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                    {isCalculating ? (
                      <Box>
                        <CircularProgress size={40} />
                      </Box>
                    ) : (
                      <>
                        {Protein ? (
                          <Typography variant="h3">{Protein.toFixed(0)} g</Typography>
                        ) : (
                          <Typography variant="h3">---</Typography>
                        )}
                      </>
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
                                  {Math.abs(Protein - oldProtein).toFixed(0)} g
                                </Typography>{' '}
                                increase
                              </Typography>
                            </>
                          ) : (
                            <>
                              <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
                              <Typography color="text.secondary" variant="body2">
                                <Typography color="error.main" component="span" variant="subtitle2">
                                  {Math.abs(Protein - oldProtein).toFixed(0)} g
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
                    {isCalculating ? (
                      <Box>
                        <CircularProgress size={40} />
                      </Box>
                    ) : (
                      <>
                        {Fats ? (
                          <Typography variant="h3">{Fats.toFixed(0)} g</Typography>
                        ) : (
                          <Typography variant="h3">---</Typography>
                        )}
                      </>
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
                                  {Math.abs(Fats - oldFats).toFixed(0)} g
                                </Typography>{' '}
                                increase
                              </Typography>
                            </>
                          ) : (
                            <>
                              <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
                              <Typography color="text.secondary" variant="body2">
                                <Typography color="error.main" component="span" variant="subtitle2">
                                  {Math.abs(Fats - oldFats).toFixed(0)} g
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
                    {isCalculating ? (
                      <Box>
                        <CircularProgress size={40} />
                      </Box>
                    ) : (
                      <>
                        {Carbos ? (
                          <Typography variant="h3">{Carbos.toFixed(0)} g</Typography>
                        ) : (
                          <Typography variant="h3">---</Typography>
                        )}
                      </>
                    )}

                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      {oldCarbos !== null && Carbos !== null ? (
                        <>
                          {Carbos - oldCarbos >= 0 ? (
                            <>
                              {' '}
                              <TrendUpIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
                              <Typography color="text.secondary" variant="body2">
                                <Typography color="success.main" component="span" variant="subtitle2">
                                  {Math.abs(Carbos - oldCarbos).toFixed(0)} g
                                </Typography>{' '}
                                increase
                              </Typography>
                            </>
                          ) : (
                            <>
                              <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
                              <Typography color="text.secondary" variant="body2">
                                <Typography color="error.main" component="span" variant="subtitle2">
                                  {Math.abs(Carbos - oldCarbos).toFixed(0)} g
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
                    {isCalculating ? (
                      <Box>
                        <CircularProgress size={40} />
                      </Box>
                    ) : (
                      <>
                        {Fibre ? (
                          <Typography variant="h3">{Fibre.toFixed(0)} g</Typography>
                        ) : (
                          <Typography variant="h3">---</Typography>
                        )}
                      </>
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
                                  {Math.abs(Fibre - oldFibre).toFixed(0)} g
                                </Typography>{' '}
                                increase
                              </Typography>
                            </>
                          ) : (
                            <>
                              <TrendDownIcon color="var(--mui-palette-error-main)" fontSize="var(--icon-fontSize-md)" />
                              <Typography color="text.secondary" variant="body2">
                                <Typography color="error.main" component="span" variant="subtitle2">
                                  {Math.abs(Fibre - oldFibre).toFixed(0)} g
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
          ) : trainingDayCalories && !weekendCalories ? (
            <>
              <Grid size={isMobile ? 12 : 6} mt={1}>
                <Typography variant="body2" mb={1}>
                  - Training Day Macros
                </Typography>
                <Card>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {trainingDayProtein ? (
                            <Typography variant="h3">{trainingDayProtein.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldTrainingDayProtein !== null && trainingDayProtein !== null ? (
                          <>
                            {trainingDayProtein - oldTrainingDayProtein >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayProtein - oldTrainingDayProtein).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayProtein - oldTrainingDayProtein).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {trainingDayFats ? (
                            <Typography variant="h3">{trainingDayFats.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldTrainingFats !== null && trainingDayFats !== null ? (
                          <>
                            {trainingDayFats - oldTrainingFats >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayFats - oldTrainingFats).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayFats - oldTrainingFats).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {trainingDayCarbos ? (
                            <Typography variant="h3">{trainingDayCarbos.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}

                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldTrainingDayCarbos !== null && trainingDayCarbos !== null ? (
                          <>
                            {trainingDayCarbos - oldTrainingDayCarbos >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayCarbos - oldTrainingDayCarbos).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayCarbos - oldTrainingDayCarbos).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {trainingDayFibre ? (
                            <Typography variant="h3">{trainingDayFibre.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldTrainingDayFibre !== null && trainingDayFibre !== null ? (
                          <>
                            {trainingDayFibre - oldTrainingDayFibre >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayFibre - oldTrainingDayFibre).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayFibre - oldTrainingDayFibre).toFixed(0)} g
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
              <Grid size={isMobile ? 12 : 6} mt={1}>
                <Typography variant="body2" mb={1}>
                  - Rest Day Macros
                </Typography>
                <Card>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {restDayProtein ? (
                            <Typography variant="h3">{restDayProtein.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldRestDayProtein !== null && restDayProtein !== null ? (
                          <>
                            {restDayProtein - oldRestDayProtein >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayProtein - oldRestDayProtein).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayProtein - oldRestDayProtein).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {restDayFats ? (
                            <Typography variant="h3">{restDayFats.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldRestDayFats !== null && restDayFats !== null ? (
                          <>
                            {restDayFats - oldRestDayFats >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayFats - oldRestDayFats).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayFats - oldRestDayFats).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {restDayCarbos ? (
                            <Typography variant="h3">{restDayCarbos.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}

                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldRestDayCarbos !== null && restDayCarbos !== null ? (
                          <>
                            {restDayCarbos - oldRestDayCarbos >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayCarbos - oldRestDayCarbos).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayCarbos - oldRestDayCarbos).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {restDayFibre ? (
                            <Typography variant="h3">{restDayFibre.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldRestDayFibre !== null && restDayFibre !== null ? (
                          <>
                            {restDayFibre - oldRestDayFibre >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayFibre - oldRestDayFibre).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayFibre - oldRestDayFibre).toFixed(0)} g
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
            </>
          ) : !trainingDayCalories && weekdayCalories ? (
            <>
              <Grid size={isMobile ? 12 : 6} mt={1}>
                <Typography variant="body2" mb={1}>
                  - Weekday Macros
                </Typography>
                <Card>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekDayProtein ? (
                            <Typography variant="h3">{weekDayProtein.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekDayProtein !== null && weekDayProtein !== null ? (
                          <>
                            {weekDayProtein - oldWeekDayProtein >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayProtein - oldWeekDayProtein).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayProtein - oldWeekDayProtein).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekDayFats ? (
                            <Typography variant="h3">{weekDayFats.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekDayFats !== null && weekDayFats !== null ? (
                          <>
                            {weekDayFats - oldWeekDayFats >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayFats - oldWeekDayFats).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayFats - oldWeekDayFats).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekDayCarbos ? (
                            <Typography variant="h3">{weekDayCarbos.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}

                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekDayCarbos !== null && weekDayCarbos !== null ? (
                          <>
                            {weekDayCarbos - oldWeekDayCarbos >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayCarbos - oldWeekDayCarbos).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayCarbos - oldWeekDayCarbos).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekDayFibre ? (
                            <Typography variant="h3">{weekDayFibre.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekDayFibre !== null && weekDayFibre !== null ? (
                          <>
                            {weekDayFibre - oldWeekDayFibre >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayFibre - oldWeekDayFibre).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayFibre - oldWeekDayFibre).toFixed(0)} g
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
              <Grid size={isMobile ? 12 : 6} mt={1}>
                <Typography variant="body2" mb={1}>
                  - Weekend Macros
                </Typography>
                <Card>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekendProtein ? (
                            <Typography variant="h3">{weekendProtein.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekendProtein !== null && weekendProtein !== null ? (
                          <>
                            {weekendProtein - oldWeekendProtein >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendProtein - oldWeekendProtein).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendProtein - oldWeekendProtein).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekendFats ? (
                            <Typography variant="h3">{weekendFats.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekendFats !== null && weekendFats !== null ? (
                          <>
                            {weekendFats - oldWeekendFats >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendFats - oldWeekendFats).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendFats - oldWeekendFats).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekendCarbos ? (
                            <Typography variant="h3">{weekendCarbos.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}

                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekendCarbos !== null && weekendCarbos !== null ? (
                          <>
                            {weekendCarbos - oldWeekendCarbos >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendCarbos - oldWeekendCarbos).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendCarbos - oldWeekendCarbos).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekendFibre ? (
                            <Typography variant="h3">{weekendFibre.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekendFibre !== null && weekendFibre !== null ? (
                          <>
                            {weekendFibre - oldWeekendFibre >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendFibre - oldWeekendFibre).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendFibre - oldWeekendFibre).toFixed(0)} g
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
            </>
          ) : trainingDayCalories && weekdayCalories ? (
            <>
              <Grid size={isMobile ? 12 : 6} mt={1}>
                <Typography variant="body2" mb={1}>
                  - Training Day Macros
                </Typography>
                <Card>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {trainingDayProtein ? (
                            <Typography variant="h3">{trainingDayProtein.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldTrainingDayProtein !== null && trainingDayProtein !== null ? (
                          <>
                            {trainingDayProtein - oldTrainingDayProtein >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayProtein - oldTrainingDayProtein).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayProtein - oldTrainingDayProtein).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {trainingDayFats ? (
                            <Typography variant="h3">{trainingDayFats.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldTrainingFats !== null && trainingDayFats !== null ? (
                          <>
                            {trainingDayFats - oldTrainingFats >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayFats - oldTrainingFats).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayFats - oldTrainingFats).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {trainingDayCarbos ? (
                            <Typography variant="h3">{trainingDayCarbos.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}

                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldTrainingDayCarbos !== null && trainingDayCarbos !== null ? (
                          <>
                            {trainingDayCarbos - oldTrainingDayCarbos >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayCarbos - oldTrainingDayCarbos).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayCarbos - oldTrainingDayCarbos).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {trainingDayFibre ? (
                            <Typography variant="h3">{trainingDayFibre.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldTrainingDayFibre !== null && trainingDayFibre !== null ? (
                          <>
                            {trainingDayFibre - oldTrainingDayFibre >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayFibre - oldTrainingDayFibre).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(trainingDayFibre - oldTrainingDayFibre).toFixed(0)} g
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
              <Grid size={isMobile ? 12 : 6} mt={1}>
                <Typography variant="body2" mb={1}>
                  - Rest Day Macros
                </Typography>
                <Card>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {restDayProtein ? (
                            <Typography variant="h3">{restDayProtein.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldRestDayProtein !== null && restDayProtein !== null ? (
                          <>
                            {restDayProtein - oldRestDayProtein >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayProtein - oldRestDayProtein).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayProtein - oldRestDayProtein).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {restDayFats ? (
                            <Typography variant="h3">{restDayFats.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldRestDayFats !== null && restDayFats !== null ? (
                          <>
                            {restDayFats - oldRestDayFats >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayFats - oldRestDayFats).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayFats - oldRestDayFats).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {restDayCarbos ? (
                            <Typography variant="h3">{restDayCarbos.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}

                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldRestDayCarbos !== null && restDayCarbos !== null ? (
                          <>
                            {restDayCarbos - oldRestDayCarbos >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayCarbos - oldRestDayCarbos).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayCarbos - oldRestDayCarbos).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {restDayFibre ? (
                            <Typography variant="h3">{restDayFibre.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldRestDayFibre !== null && restDayFibre !== null ? (
                          <>
                            {restDayFibre - oldRestDayFibre >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayFibre - oldRestDayFibre).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(restDayFibre - oldRestDayFibre).toFixed(0)} g
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

              <Grid size={isMobile ? 12 : 6} mt={1}>
                <Typography variant="body2" mb={1}>
                  - Weekday Macros
                </Typography>
                <Card>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekDayProtein ? (
                            <Typography variant="h3">{weekDayProtein.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekDayProtein !== null && weekDayProtein !== null ? (
                          <>
                            {weekDayProtein - oldWeekDayProtein >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayProtein - oldWeekDayProtein).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayProtein - oldWeekDayProtein).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekDayFats ? (
                            <Typography variant="h3">{weekDayFats.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekDayFats !== null && weekDayFats !== null ? (
                          <>
                            {weekDayFats - oldWeekDayFats >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayFats - oldWeekDayFats).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayFats - oldWeekDayFats).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekDayCarbos ? (
                            <Typography variant="h3">{weekDayCarbos.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}

                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekDayCarbos !== null && weekDayCarbos !== null ? (
                          <>
                            {weekDayCarbos - oldWeekDayCarbos >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayCarbos - oldWeekDayCarbos).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayCarbos - oldWeekDayCarbos).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekDayFibre ? (
                            <Typography variant="h3">{weekDayFibre.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekDayFibre !== null && weekDayFibre !== null ? (
                          <>
                            {weekDayFibre - oldWeekDayFibre >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayFibre - oldWeekDayFibre).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekDayFibre - oldWeekDayFibre).toFixed(0)} g
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
              <Grid size={isMobile ? 12 : 6} mt={1}>
                <Typography variant="body2" mb={1}>
                  - Weekend Macros
                </Typography>
                <Card>
                  <Box
                    sx={{
                      display: 'grid',
                      gap: 2,
                      gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekendProtein ? (
                            <Typography variant="h3">{weekendProtein.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekDayProtein !== null && weekendProtein !== null ? (
                          <>
                            {weekendProtein - oldWeekDayProtein >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendProtein - oldWeekDayProtein).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendProtein - oldWeekDayProtein).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekendFats ? (
                            <Typography variant="h3">{weekendFats.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekendFats !== null && weekendFats !== null ? (
                          <>
                            {weekendFats - oldWeekendFats >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendFats - oldWeekendFats).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendFats - oldWeekendFats).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekendCarbos ? (
                            <Typography variant="h3">{weekendCarbos.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}

                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekendCarbos !== null && weekendCarbos !== null ? (
                          <>
                            {weekendCarbos - oldWeekendCarbos >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendCarbos - oldWeekendCarbos).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendCarbos - oldWeekendCarbos).toFixed(0)} g
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
                      {isCalculating ? (
                        <Box>
                          <CircularProgress size={40} />
                        </Box>
                      ) : (
                        <>
                          {weekendFibre ? (
                            <Typography variant="h3">{weekendFibre.toFixed(0)} g</Typography>
                          ) : (
                            <Typography variant="h3">---</Typography>
                          )}
                        </>
                      )}
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        {oldWeekendFibre !== null && weekendFibre !== null ? (
                          <>
                            {weekendFibre - oldWeekendFibre >= 0 ? (
                              <>
                                {' '}
                                <TrendUpIcon
                                  color="var(--mui-palette-success-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="success.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendFibre - oldWeekendFibre).toFixed(0)} g
                                  </Typography>{' '}
                                  increase
                                </Typography>
                              </>
                            ) : (
                              <>
                                <TrendDownIcon
                                  color="var(--mui-palette-error-main)"
                                  fontSize="var(--icon-fontSize-md)"
                                />
                                <Typography color="text.secondary" variant="body2">
                                  <Typography color="error.main" component="span" variant="subtitle2">
                                    {Math.abs(weekendFibre - oldWeekendFibre).toFixed(0)} g
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
            </>
          ) : null}
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
