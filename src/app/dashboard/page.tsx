'use client';

import * as React from 'react';
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Slider,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Use AdapterDayjs
import dayjs from 'dayjs'; // Import dayjs
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { RadialBar, RadialBarChart } from 'recharts';

import { UserContext } from '@/contexts/auth/user-context';
import { toast } from '@/components/core/toaster';

type TrainingGoalKey =
  | 'fat_loss'
  | 'muscle_gain'
  | 'recomposition'
  | 'strength_gain'
  | 'athletic_performance'
  | 'fitness_model';

// Define the training goals array with explicit typing
const trainingGoals = [
  { key: 'fat_loss' as TrainingGoalKey, label: 'Fat Loss', description: '15% deficit, 0.85x TDEE', emoji: '🔥' },
  {
    key: 'muscle_gain' as TrainingGoalKey,
    label: 'Muscle Building',
    description: '5% surplus, 1.05x TDEE',
    emoji: '💪',
  },
  {
    key: 'recomposition' as TrainingGoalKey,
    label: 'Body Recomposition',
    description: '10% deficit, 0.90x TDEE',
    emoji: '🔄',
  },
  {
    key: 'strength_gain' as TrainingGoalKey,
    label: 'Strength Gain',
    description: 'Maintenance, 1.00x TDEE',
    emoji: '🏋️',
  },
  {
    key: 'athletic_performance' as TrainingGoalKey,
    label: 'Athletic Performance',
    description: 'Maintenance, 1.00x TDEE',
    emoji: '🏃',
  },
  {
    key: 'fitness_model' as TrainingGoalKey,
    label: 'Fitness Model',
    description: '10% deficit, 0.90x TDEE',
    emoji: '📸',
  },
];

const nutritionStyles = [
  {
    name: 'Balanced',
    description: 'Default - Used for Calorie Cycling & Banking',
    protein: '2g/kg BW',
    fats: '25% of total calories',
    carbs: 'Remaining calories',
    key: 'balanced',
  },
  {
    name: 'Low Carb',
    description: 'Lower carbs, higher protein & fats',
    protein: '2.2g/kg BW',
    fats: '35% of total calories',
    carbs: '15-20% of total intake',
    key: 'low_carb',
  },
  {
    name: 'Keto',
    description: 'Very low carbs, high fats',
    protein: '1.6g/kg BW',
    fats: '70% of total calories',
    carbs: '< 50g/day',
    key: 'keto',
  },
  {
    name: 'Low Fat',
    description: 'Higher carbs to compensate for lower fat intake',
    protein: '2.2g/kg BW',
    fats: '15% of total calories',
    carbs: 'Higher to compensate',
    key: 'low_fat',
  },
];

const options = {
  fat_loss: [
    { label: 'Slow', kcal: '250g per week', value: 'slow', color: '#FDFD53' },
    { label: 'Moderate Fat Loss', kcal: '500g per week', value: 'moderate', color: '#FDFD53' },
    { label: 'Aggressive Cut', kcal: '750g per week', value: 'aggressive', color: '#FDFD53' },
    { label: 'Rapid Fat Loss', kcal: '1kg per week', value: 'rapid', color: '#FDFD53' },
  ],
  muscle_gain: [
    { label: 'Lean Gain', kcal: '100g per week', value: 'lean', color: '#D51331' },
    { label: 'Moderate Gain', kcal: '250g per week', value: 'moderate', color: '#D51331' },
    { label: 'Aggressive Gain', kcal: '500g per week', value: 'aggressive', color: '#D51331' },
    { label: 'Bulk Phase', kcal: '750g per week', value: 'bulk', color: '#D51331' },
  ],
};

const data = [{ name: 'Empty', value: 100 }] satisfies { name: string; value: number }[];

const macronutrients = [
  { id: 1, label: 'Protein', value: '46g', icon: '/icons/protein.svg' },
  { id: 2, label: 'Carbs', value: '298g', icon: '/icons/carbs.svg' },
  { id: 3, label: 'Fat', value: '112g', icon: '/icons/fat.svg' },
  { id: 4, label: 'Fibre', value: '189g', icon: '/icons/fibre.svg' },
];

export default function Page(): React.JSX.Element {
  const userContext = React.useContext(UserContext);
  const [dateOfBirth, setDateOfBirth] = React.useState<dayjs.Dayjs | null>(null);
  const [isDateOfBirthValid, setIsDateOfBirthValid] = React.useState(false);
  const [age, setAge] = React.useState<number | null>(null);
  const [gender, setGender] = React.useState('woman');
  const [activityLevel, setActivityLevel] = React.useState('active');
  const [height, setHeight] = React.useState(170);
  const [weight, setWeight] = React.useState(70);
  const [trainingHistory, setTrainingHistory] = React.useState('beginner');
  const [workoutsPerWeek, setWorkoutsPerWeek] = React.useState(3);
  const [trainingGoal, setTrainingGoal] = React.useState<
    'fat_loss' | 'muscle_gain' | 'recomposition' | 'strength_gain' | 'athletic_performance' | 'fitness_model'
  >('fat_loss');
  const [selectedStyle, setSelectedStyle] = React.useState('balanced');
  const [calorieCycling, setCalorieCycling] = React.useState(false);
  const [calorieBanking, setCalorieBanking] = React.useState(false);
  const [mode, setMode] = React.useState<'fat_loss' | 'muscle_gain' | null>(null);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [isHeightEditing, setIsHeightEditing] = React.useState(false); // State to manage edit mode
  const [isWeightEditing, setIsWeightEditing] = React.useState(false); // State to manage edit mode
  const [tempHeight, setTempHeight] = React.useState(height); // Temporary height value during editing
  const [tempWeight, setTempWeight] = React.useState(weight); // Temporary height value during editing
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [bmr, setBmr] = React.useState<number | null>(null);
  const [totalCalorie, setTotalCalorie] = React.useState<number | null>(null);
  const [targetCalorie, setTargetCalorie] = React.useState<number | null>(null);
  const [trainingDayCalories, setTrainingDayCalories] = React.useState<number | null>(null);
  const [restDayCalories, setRestDayCalories] = React.useState<number | null>(null);
  const [weekdayCalories, setWeekdayCalories] = React.useState<number | null>(null);
  const [weekendCalories, setWeekendCalories] = React.useState<number | null>(null);
  const [protein, setProtein] = React.useState<number | null>(null);
  const [fats, setFats] = React.useState<number | null>(null);
  const [carbos, setCarbos] = React.useState<number | null>(null);
  const [fibre, setFibre] = React.useState<number | null>(null);

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

  const calculateAge = (dob: dayjs.Dayjs | null) => {
    if (!dob) return;
    const today = dayjs();
    const userAge = today.diff(dob, 'year'); // Calculate age using dayjs
    setAge(userAge);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setDateOfBirth(date);
    calculateAge(date);

    // Validate the date
    if (!date) {
      setIsDateOfBirthValid(false);
    } else {
      setIsDateOfBirthValid(true);
    }
  };

  // Logic for Calorie Cycling and Banking
  const handleCalorieCyclingChange = (checked: boolean) => {
    setCalorieCycling(checked);
    if (checked) {
      setSelectedStyle('balanced'); // Force Balanced Nutrition Method
    }
  };

  const handleCalorieBankingChange = (checked: boolean) => {
    setCalorieBanking(checked);
    if (checked) {
      setSelectedStyle('balanced'); // Force Balanced Nutrition Method
    }
  };

  const handleSelectedStyle = (e: React.MouseEvent<HTMLDivElement>, key: string) => {
    e.preventDefault(); // Prevent default behavior

    // Set the selected style to the clicked key immediately
    setSelectedStyle(key);

    // If calorieCycling or calorieBanking is enabled, set it to 'balanced' after 1 second
    if (calorieCycling || calorieBanking) {
      if (calorieCycling && calorieBanking) {
        toast.info(
          <div style={{ textAlign: 'center', fontWeight: '500', lineHeight: '1.5' }}>
            Both Calorie Cycling mode and Calorie Banking modeactivated. <br />
            <span style={{ color: '#D51331' }}>Balanced</span> Nutrition method will be applied.
          </div>,
          {
            icon: '⚡', // Custom icon for a modern touch
            duration: 4000, // Display duration in milliseconds
            style: {
              borderRadius: '8px',
              borderColor: 'rgba(0, 0, 0, 0.8)',
              background: '#F9FAFB', // Light modern background
              color: '#333', // Dark text for better readability
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              padding: '12px 16px',
              fontSize: '14px',
            },
          }
        );
      } else {
        if (calorieCycling) {
          toast.info(
            <div style={{ textAlign: 'center', fontWeight: '500', lineHeight: '1.5' }}>
              Calorie Cycling mode activated. <br />
              <span style={{ color: '#D51331' }}>Balanced</span> Nutrition method will be applied.
            </div>,
            {
              icon: '⚡', // Custom icon for a modern touch
              duration: 4000, // Display duration in milliseconds
              style: {
                borderRadius: '8px',
                borderColor: 'rgba(0, 0, 0, 0.8)',
                background: '#F9FAFB', // Light modern background
                color: '#333', // Dark text for better readability
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                padding: '12px 16px',
                fontSize: '14px',
              },
            }
          );
        }
        if (calorieBanking) {
          toast.info(
            <div style={{ textAlign: 'center', fontWeight: '500', lineHeight: '1.5' }}>
              Calorie Banking mode activated. <br />
              <span style={{ color: '#D51331' }}>Balanced</span> Nutrition method will be applied.
            </div>,
            {
              icon: '⚡', // Custom icon for a modern touch
              duration: 4000, // Display duration in milliseconds
              style: {
                borderRadius: '8px',
                borderColor: 'rgba(0, 0, 0, 0.8)',
                background: '#F9FAFB', // Light modern background
                color: '#333', // Dark text for better readability
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                padding: '12px 16px',
                fontSize: '14px',
              },
            }
          );
        }
      }
      setTimeout(() => {
        setSelectedStyle('balanced');
      }, 1000); // 1000 milliseconds = 1 second
    }
  };

  const handleHeightDoubleClick = () => {
    setIsHeightEditing(true); // Enable edit mode on double click
    setTempHeight(height); // Set the temporary height value
  };

  const handleHeightBlur = () => {
    setIsHeightEditing(false); // Disable edit mode when input loses focus
    setHeight(tempHeight); // Update the height value
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(event.target.value, 10);
    if (!isNaN(newHeight) && newHeight >= 100 && newHeight <= 220) {
      setTempHeight(newHeight); // Update the temporary height value
    }
  };

  const handleWeightDoubleClick = () => {
    setIsWeightEditing(true); // Enable edit mode on double click
    setTempWeight(weight); // Set the temporary height value
  };

  const handleWeightBlur = () => {
    setIsWeightEditing(false); // Disable edit mode when input loses focus
    setWeight(tempWeight); // Update the height value
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWeight = parseInt(event.target.value, 10);
    if (!isNaN(newWeight) && newWeight >= 30 && newWeight <= 220) {
      setTempWeight(newWeight); // Update the temporary height value
    }
  };

  const handleCalculate = async () => {
    if (!isDateOfBirthValid) {
      console.log('Date of Birth is required.');
      return;
    }

    setIsCalculating(true); // Set loading state to true

    const userProfileData = {
      id: user?.id,
      mail: user?.email,
      dateOfBirth: dateOfBirth?.format('DD-MM-YYYY'), // Format date to string
      age,
      gender,
      activityLevel,
      height,
      weight,
      trainingHistory,
      workoutsPerWeek,
      trainingGoal,
      selectedStyle,
      calorieCycling,
      calorieBanking,
      mode,
      selected,
    };

    try {
      const response = await fetch(`https://backend.macroflow.io/profiles/createProfile`, {
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

      window.location.reload();
    } catch (error) {
      console.error('Error creating user profile:', error);
      // Handle error in the UI
    } finally {
      setIsCalculating(false); // Reset loading state
    }
  };

  // Fetch data when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend.macroflow.io/profiles/${user?.id}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log(result, 'result');

        const profileData = result.Profile;
        const summaryData = result.CalculationData.json_data.summary;

        console.log(profileData, 'profileData');

        setDateOfBirth(dayjs(profileData.date_of_birth));
        setIsDateOfBirthValid(true);
        setGender(profileData.gender);
        setHeight(profileData.height);
        setWeight(profileData.weight);
        setSelectedStyle(profileData.nutrition_style);
        setTrainingGoal(profileData.training_goal);
        setTrainingHistory(profileData.training_history);
        setWorkoutsPerWeek(profileData.workouts_per_week);
        setCalorieCycling(profileData.calorieCycling);
        setCalorieBanking(profileData.calorieBanking);
        setBmr(summaryData.BMR);
        setTargetCalorie(summaryData.Target_Calories);
        setTotalCalorie(summaryData.Total_Maintenance_Calories);
        setProtein(summaryData.Protein);
        setFats(summaryData.Fats);
        setCarbos(summaryData.Carbohydrates);
        setFibre(summaryData.Fibre);
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user?.id]);

  console.log(user, isLoading, error, 'UserContext, UserProvider');

  return (
    <Stack spacing={4}>
      <Grid container spacing={4}>
        <Grid
          size={{
            md: 6,
            xs: 12,
          }}
          sx={{
            maxWidth: 'var(--Content-maxWidth)',
            m: 'var(--Content-margin)',
            p: 'var(--Content-padding)',
            width: 'var(--Content-width)',
            backgroundColor: '#FFFFFF',
            mt: -3,
          }}
        >
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Macro & Calorie Calculator</Typography>
          </Box>

          <Box>
            {/* Date of Birth and Age in a single line */}
            <Typography fontWeight="bold" mt={2} color="#000000" py="10px">
              Date of Birth
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <DatePicker
                  value={dateOfBirth}
                  onChange={handleDateChange}
                  format="DD-MM-YYYY"
                  required
                  sx={{
                    backgroundColor: 'rgba(227, 227, 227, 0.5)',
                    borderRadius: '10px',
                    '& .MuiInputBase-root': {
                      height: '40px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                />
                {age !== null && (
                  <Typography fontWeight="bold" color="#000000" py="10px">
                    Age: {age}
                  </Typography>
                )}
              </Box>
              {/* {!isDateOfBirthValid && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  Date of Birth is required.
                </Typography>
              )} */}
            </LocalizationProvider>
          </Box>

          {/* Gender Selection */}
          <Box>
            <Typography fontWeight="bold" mt={2} color="#000000" py="10px">
              Gender
            </Typography>
            <ToggleButtonGroup
              value={gender}
              exclusive
              onChange={(_, val: string | null) => {
                if (val !== null) setGender(val);
              }}
              fullWidth
              sx={{
                backgroundColor: 'rgba(227, 227, 227, 0.5)', // Light gray with transparency
                borderRadius: '10px',
                padding: '5px',
              }}
            >
              {['man', 'woman'].map((value) => (
                <ToggleButton
                  key={value}
                  value={value}
                  component={motion.div}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  disableRipple
                  sx={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: gender === value ? '#000000' : '#333',
                    borderRadius: '8px',
                    backgroundColor: gender === value ? '#FDFD53' : 'transparent',
                    '&.Mui-selected': {
                      backgroundColor: '#FDFD53',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(253, 253, 83, 0.5)',
                    },
                    transition: 'background-color 0.3s ease-in-out',
                  }}
                >
                  {value === 'man' ? 'Man' : 'Woman'}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Height Slider */}
          <Box>
            <Typography mt={2} color="#000000" onDoubleClick={handleHeightDoubleClick}>
              <Box display="flex" alignItems="center">
                My Height:{' '}
                {isHeightEditing ? (
                  <>
                    <TextField
                      type="number"
                      value={tempHeight}
                      onChange={handleHeightChange}
                      onBlur={handleHeightBlur}
                      inputProps={{ min: 100, max: 220 }}
                    />
                    <strong> cm</strong>
                  </>
                ) : (
                  <Box component="strong" sx={{ cursor: 'pointer' }}>
                    {height} cm
                  </Box>
                )}
              </Box>
            </Typography>
            <motion.div whileTap={{ scale: 1.1 }}>
              <Slider
                value={height}
                onChange={(_: Event, val: number | number[]) => {
                  if (typeof val === 'number') setHeight(val);
                }}
                min={100}
                max={220}
                sx={{
                  color: '#FDFD53', // Yellow slider
                }}
              />
            </motion.div>
          </Box>

          {/* Weight Slider */}
          <Box>
            <Typography mt={2} color="#000000" onDoubleClick={handleWeightDoubleClick}>
              <Box display="flex" alignItems="center">
                My Weight:{' '}
                {isWeightEditing ? (
                  <>
                    <TextField
                      type="number"
                      value={tempWeight}
                      onChange={handleWeightChange}
                      onBlur={handleWeightBlur}
                      inputProps={{ min: 30, max: 220 }}
                    />
                    <strong> kg</strong>
                  </>
                ) : (
                  <Box component="strong" sx={{ cursor: 'pointer' }}>
                    {weight} kg
                  </Box>
                )}
              </Box>
            </Typography>
            <motion.div whileTap={{ scale: 1.1 }}>
              <Slider
                value={weight}
                onChange={(_: Event, val: number | number[]) => {
                  if (typeof val === 'number') setWeight(val);
                }}
                min={30}
                max={200}
                sx={{
                  color: '#FDFD53', // Yellow slider
                }}
              />
            </motion.div>
          </Box>

          {/* Activity Level Selection */}
          <Box>
            <Typography fontWeight="bold" mt={2} color="#000000" py="10px">
              Activity Level
            </Typography>
            <ToggleButtonGroup
              value={activityLevel}
              exclusive
              onChange={(_, val: string | null) => {
                if (val !== null) setActivityLevel(val);
              }}
              fullWidth
              sx={{
                backgroundColor: 'rgba(227, 227, 227, 0.5)',
                borderRadius: '10px',
                padding: '5px',
              }}
            >
              {['sedentary', 'active', 'very_active'].map((value) => (
                <ToggleButton
                  key={value}
                  value={value}
                  component={motion.div}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  disableRipple
                  sx={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: activityLevel === value ? '#000000' : '#333',
                    borderRadius: '8px',
                    backgroundColor: activityLevel === value ? '#FDFD53' : 'transparent',
                    '&.Mui-selected': {
                      backgroundColor: '#FDFD53',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(253, 253, 83, 0.5)',
                    },
                    transition: 'background-color 0.3s ease-in-out',
                  }}
                >
                  {value === 'sedentary' ? '🪑 Sedentary' : value === 'active' ? '🚶 Active' : '🏃 Very Active'}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Training History Selection */}
          <Box>
            <Typography fontWeight="bold" mt={2} color="#000000" py="10px">
              Training History
            </Typography>
            <ToggleButtonGroup
              value={trainingHistory}
              exclusive
              onChange={(_, val: string | null) => {
                if (val !== null) setTrainingHistory(val);
              }}
              fullWidth
              sx={{
                backgroundColor: 'rgba(227, 227, 227, 0.5)',
                borderRadius: '10px',
                padding: '5px',
              }}
            >
              {['beginner', 'intermediate', 'advanced'].map((value) => (
                <ToggleButton
                  key={value}
                  value={value}
                  component={motion.div}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  disableRipple
                  sx={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: trainingHistory === value ? '#000000' : '#333',
                    borderRadius: '8px',
                    backgroundColor: trainingHistory === value ? '#FDFD53' : 'transparent',
                    '&.Mui-selected': {
                      backgroundColor: '#FDFD53',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(253, 253, 83, 0.5)',
                    },
                    transition: 'background-color 0.3s ease-in-out',
                  }}
                >
                  {value === 'beginner' ? '🌱 Beginner' : value === 'intermediate' ? '🌿 Intermediate' : '🌳 Advanced'}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          {/* Workouts Per Week Selection */}
          <Box>
            <Typography fontWeight="bold" mt={2} color="#000000" py="10px">
              Workouts Per Week
            </Typography>
            <ToggleButtonGroup
              value={workoutsPerWeek}
              exclusive
              onChange={(_, val: number | null) => {
                if (val !== null) setWorkoutsPerWeek(val);
              }}
              fullWidth
              sx={{
                backgroundColor: 'rgba(227, 227, 227, 0.5)',
                borderRadius: '10px',
                padding: '5px',
              }}
            >
              {[3, 4, 5].map((value) => (
                <ToggleButton
                  key={value}
                  value={value}
                  component={motion.div}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  disableRipple
                  sx={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: workoutsPerWeek === value ? '#000000' : '#333',
                    borderRadius: '8px',
                    backgroundColor: workoutsPerWeek === value ? '#FDFD53' : 'transparent',
                    '&.Mui-selected': {
                      backgroundColor: '#FDFD53',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(253, 253, 83, 0.5)',
                    },
                    transition: 'background-color 0.3s ease-in-out',
                  }}
                >
                  {value} 🏋️
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          <Box>
            <Typography fontWeight="bold" mt={2} color="#000000" py="10px">
              Training Goal Selection
            </Typography>
            <Typography variant="body2" color="#000000" mb={2}>
              Sets Default Weight Change Rate (Not Extra Deficit/Surplus)
            </Typography>
            <Grid container spacing={2}>
              {trainingGoals.map((goal) => (
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                  key={goal.key}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card
                      onClick={() => {
                        setTrainingGoal(goal.key); // No more error
                      }}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        backgroundColor: trainingGoal === goal.key ? 'rgba(253, 253, 83, 0.2)' : '#FFFFFF',
                        border: trainingGoal === goal.key ? '2px solid #FDFD53' : '1px solid #E3E3E3',
                        transition: 'all 0.3s ease',
                        boxShadow: trainingGoal === goal.key ? '0px 4px 15px rgba(253, 253, 83, 0.5)' : 'none',
                      }}
                    >
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box>
                          <Typography variant="h6" fontWeight="bold" color="#000000">
                            {goal.label}
                          </Typography>
                        </Box>
                        {trainingGoal === goal.key && <FaCheckCircle />}
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Nutrition Style Selection */}
          <Box>
            <Typography fontWeight="bold" mt={2} color="#000000" py="10px">
              Nutrition Style Selection
            </Typography>
            <Grid container spacing={2}>
              {nutritionStyles.map((style) => (
                <Grid
                  size={{
                    md: 6,
                    xs: 12,
                  }}
                  key={style.key}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      onClick={(e) => {
                        handleSelectedStyle(e, style.key); // Pass the event and key directly
                      }}
                      sx={{
                        border: selectedStyle === style.key ? '3px solid #FDFD53' : '1px solid #E3E3E3',
                        boxShadow: selectedStyle === style.key ? '0px 4px 15px rgba(0,0,0,0.2)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        height: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight="bold" color="#000000">
                          {style.name}
                        </Typography>
                        {/* <Typography variant="body2" color="#000000">
                            {style.description}
                          </Typography> */}
                        <Box mt={1}>
                          <Typography variant="body2" color="#000000">
                            <b>Protein:</b> {style.protein}
                          </Typography>
                          <Typography variant="body2" color="#000000">
                            <b>Fats:</b> {style.fats}
                          </Typography>
                          <Typography variant="body2" color="#000000">
                            <b>Carbs:</b> {style.carbs}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Additional Options */}
          <Box mt={3}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card sx={{ p: 2, backgroundColor: 'rgba(227, 227, 227, 0.5)' }}>
                <Typography variant="h6" fontWeight="bold" color="#000000">
                  Additional Options
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                  <Typography color="#000000">Training Day & Rest Day Calorie Cycling</Typography>
                  <Switch
                    checked={calorieCycling}
                    onChange={(e) => {
                      handleCalorieCyclingChange(e.target.checked);
                    }}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#FDFD53',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#FDFD53',
                      },
                    }}
                  />
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                  <Typography color="#000000">Calorie Banking (Mon-Fri Lower, Sat-Sun Higher)</Typography>
                  <Switch
                    checked={calorieBanking}
                    onChange={(e) => {
                      handleCalorieBankingChange(e.target.checked);
                    }}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#FDFD53',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#FDFD53',
                      },
                    }}
                  />
                </Box>
              </Card>
            </motion.div>
          </Box>

          {/* Weight Loss/Gain Rate Selection */}
          <Box>
            <Typography fontWeight="bold" mt={2} color="#000000" py="10px">
              Weight Loss/Gain Rate Selection (Controls Deficit/Surplus)
            </Typography>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(_, val: 'fat_loss' | 'muscle_gain' | null) => {
                if (val) {
                  setMode(val);
                  setSelected(null);
                }
              }}
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: 'rgba(227, 227, 227, 0.5)',
                borderRadius: '10px',
                padding: '5px',
              }}
            >
              <ToggleButton
                value="fat_loss"
                sx={{
                  width: '50%',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  transition: 'background-color 0.3s ease-in-out',
                  '&.Mui-selected': {
                    backgroundColor: '#FDFD53',
                    color: '#000000',
                    '&:hover': {
                      backgroundColor: 'rgba(253, 253, 83, 0.8)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(253, 253, 83, 0.5)',
                  },
                }}
              >
                🔥 Fat Loss
              </ToggleButton>
              <ToggleButton
                value="muscle_gain"
                sx={{
                  width: '50%',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  transition: 'background-color 0.3s ease-in-out',
                  '&.Mui-selected': {
                    backgroundColor: '#FDFD53',
                    color: '#000000',
                    '&:hover': {
                      backgroundColor: 'rgba(253, 253, 83, 0.8)',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(253, 253, 83, 0.5)',
                  },
                }}
              >
                💪 Muscle Gain
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Selection Cards */}
            {mode ? (
              <Grid container spacing={2}>
                {options[mode].map(({ label, kcal, value, color }) => (
                  <Grid
                    size={{
                      md: 6,
                      xs: 12,
                    }}
                    key={value}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Card
                        onClick={() => {
                          setSelected(kcal);
                        }}
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          textAlign: 'center',
                          backgroundColor: '#FFFFFF',
                          border: selected === kcal ? `3px solid ${color}` : '1px solid #E3E3E3',
                          transition: 'all 0.3s ease',
                          boxShadow: selected === kcal ? `0px 4px 15px ${color}` : 'none',
                        }}
                      >
                        <Typography variant="h6" fontWeight="bold" color="#000000">
                          {label}
                        </Typography>
                        <Typography variant="body2" color="#000000">
                          {kcal}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : null}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                sx={{
                  backgroundColor: '#FDFD53', // Yellow background
                  color: '#000000', // Black text
                  fontWeight: 'bold',
                  fontSize: '16px',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 15px rgba(253, 253, 83, 0.5)', // Subtle shadow
                  border: '2px solid #000000', // Black border
                  '&:hover': {
                    backgroundColor: '#FFEB3B', // Slightly lighter yellow on hover
                    border: '2px solid #000000', // Ensure border stays on hover
                  },
                }}
                onClick={handleCalculate}
              >
                Calculate
              </Button>
            </motion.div>
          </Box>
        </Grid>
        <Grid
          size={{
            md: 6,
            xs: 12,
          }}
          sx={{
            backgroundColor: 'rgba(227, 227, 227, 0.3)',
            height: '100%', // Ensure the Grid takes full height
            display: 'flex', // Make the Grid a flex container
            flexDirection: 'column',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            maxWidth: 'var(--Content-maxWidth)',
            m: 'var(--Content-margin)',
            p: 'var(--Content-padding)',
            width: 'var(--Content-width)',
            mt: -3,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4">My Macro & Calorie</Typography>
          </Box>
          {/* Placeholder for additional content */}
          <Grid container spacing={4}>
            <Grid
              size={{
                md: 12,
                xs: 12,
              }}
            >
              <Box>
                <RadialBarChart
                  barSize={24}
                  data={data}
                  endAngle={360} // Full circle
                  height={150} // Reduce height
                  innerRadius={100} // Reduce inner radius
                  startAngle={0} // Full circle
                  width={150} // Reduce width
                >
                  <defs>
                    <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(253, 250, 83, 1)" /> {/* Start color */}
                      <stop offset="100%" stopColor="#D51331" /> {/* End color */}
                    </linearGradient>
                  </defs>
                  <RadialBar
                    animationDuration={300}
                    background
                    cornerRadius={10}
                    dataKey="value"
                    endAngle={360} // Full circle
                    fill="url(#gradientFill)"
                    startAngle={0} // Full circle
                  />
                </RadialBarChart>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ textAlign: 'center', mt: '-175px' }}>
                    <Typography mt={2} color="#000000">
                      BMR
                    </Typography>
                    {isCalculating ? (
                      <Box sx={{ textAlign: 'center', mt: '10px' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <>
                        <Typography fontWeight="bold" variant="h5" color="#000000">
                          {bmr === null ? '-' : bmr?.toFixed(0)}
                        </Typography>
                        <Typography mt={-1} color="#000000">
                          kcal
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <Box>
                <RadialBarChart
                  barSize={24}
                  data={data}
                  endAngle={360} // Full circle
                  height={150} // Reduce height
                  innerRadius={100} // Reduce inner radius
                  startAngle={0} // Full circle
                  width={150} // Reduce width
                >
                  <defs>
                    <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(253, 250, 83, 1)" /> {/* Start color */}
                      <stop offset="100%" stopColor="#D51331" /> {/* End color */}
                    </linearGradient>
                  </defs>
                  <RadialBar
                    animationDuration={300}
                    background
                    cornerRadius={10}
                    dataKey="value"
                    endAngle={360} // Full circle
                    fill="url(#gradientFill)"
                    startAngle={0} // Full circle
                  />
                </RadialBarChart>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ textAlign: 'center', mt: '-175px' }}>
                    <Typography mt={2} color="#000000">
                      Total
                    </Typography>
                    {isCalculating ? (
                      <Box sx={{ textAlign: 'center', mt: '10px' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <>
                        <Typography fontWeight="bold" variant="h5" color="#000000">
                          {totalCalorie === null ? '-' : totalCalorie?.toFixed(0)}
                        </Typography>
                        <Typography mt={-1} color="#000000">
                          kcal
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <Box>
                <RadialBarChart
                  barSize={24}
                  data={data}
                  endAngle={360} // Full circle
                  height={150} // Reduce height
                  innerRadius={100} // Reduce inner radius
                  startAngle={0} // Full circle
                  width={150} // Reduce width
                >
                  <defs>
                    <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(253, 250, 83, 1)" /> {/* Start color */}
                      <stop offset="100%" stopColor="#D51331" /> {/* End color */}
                    </linearGradient>
                  </defs>
                  <RadialBar
                    animationDuration={300}
                    background
                    cornerRadius={10}
                    dataKey="value"
                    endAngle={360} // Full circle
                    fill="url(#gradientFill)"
                    startAngle={0} // Full circle
                  />
                </RadialBarChart>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ textAlign: 'center', mt: '-175px' }}>
                    <Typography mt={2} color="#000000">
                      Target
                    </Typography>
                    {isCalculating ? (
                      <Box sx={{ textAlign: 'center', mt: '10px' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <>
                        <Typography fontWeight="bold" variant="h5" color="#000000">
                          {targetCalorie === null ? '-' : targetCalorie?.toFixed(0)}
                        </Typography>
                        <Typography mt={-1} color="#000000">
                          kcal
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          {trainingDayCalories && restDayCalories ? (
            <Grid container spacing={8}>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Box>
                  <RadialBarChart
                    barSize={24}
                    data={data}
                    endAngle={360} // Full circle
                    height={150} // Reduce height
                    innerRadius={100} // Reduce inner radius
                    startAngle={0} // Full circle
                    width={150} // Reduce width
                  >
                    <defs>
                      <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(253, 250, 83, 1)" /> {/* Start color */}
                        <stop offset="100%" stopColor="#D51331" /> {/* End color */}
                      </linearGradient>
                    </defs>
                    <RadialBar
                      animationDuration={300}
                      background
                      cornerRadius={10}
                      dataKey="value"
                      endAngle={360} // Full circle
                      fill="url(#gradientFill)"
                      startAngle={0} // Full circle
                    />
                  </RadialBarChart>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ textAlign: 'center', mt: '-175px' }}>
                      <Typography mt={2} color="#000000">
                        Train
                      </Typography>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center', mt: '10px' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <>
                          <Typography fontWeight="bold" variant="h5" color="#000000">
                            {trainingDayCalories === null ? '-' : trainingDayCalories?.toFixed(0)}
                          </Typography>
                          <Typography mt={-1} color="#000000">
                            kcal
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Box>
                  <RadialBarChart
                    barSize={24}
                    data={data}
                    endAngle={360} // Full circle
                    height={150} // Reduce height
                    innerRadius={100} // Reduce inner radius
                    startAngle={0} // Full circle
                    width={150} // Reduce width
                  >
                    <defs>
                      <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(253, 250, 83, 1)" /> {/* Start color */}
                        <stop offset="100%" stopColor="#D51331" /> {/* End color */}
                      </linearGradient>
                    </defs>
                    <RadialBar
                      animationDuration={300}
                      background
                      cornerRadius={10}
                      dataKey="value"
                      endAngle={360} // Full circle
                      fill="url(#gradientFill)"
                      startAngle={0} // Full circle
                    />
                  </RadialBarChart>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ textAlign: 'center', mt: '-175px' }}>
                      <Typography mt={2} color="#000000">
                        Rest
                      </Typography>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center', mt: '10px' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <>
                          <Typography fontWeight="bold" variant="h5" color="#000000">
                            {restDayCalories === null ? '-' : restDayCalories?.toFixed(0)}
                          </Typography>
                          <Typography mt={-1} color="#000000">
                            kcal
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : null}
          {weekdayCalories && weekendCalories ? (
            <Grid container spacing={8}>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Box>
                  <RadialBarChart
                    barSize={24}
                    data={data}
                    endAngle={360} // Full circle
                    height={150} // Reduce height
                    innerRadius={100} // Reduce inner radius
                    startAngle={0} // Full circle
                    width={150} // Reduce width
                  >
                    <defs>
                      <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(253, 250, 83, 1)" /> {/* Start color */}
                        <stop offset="100%" stopColor="#D51331" /> {/* End color */}
                      </linearGradient>
                    </defs>
                    <RadialBar
                      animationDuration={300}
                      background
                      cornerRadius={10}
                      dataKey="value"
                      endAngle={360} // Full circle
                      fill="url(#gradientFill)"
                      startAngle={0} // Full circle
                    />
                  </RadialBarChart>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ textAlign: 'center', mt: '-175px' }}>
                      <Typography variant="body2" mt={2} color="#000000">
                        Weekday
                      </Typography>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center', mt: '10px' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <>
                          <Typography fontWeight="bold" variant="h5" color="#000000">
                            {weekdayCalories === null ? '-' : weekdayCalories?.toFixed(0)}
                          </Typography>
                          <Typography mt={-1} color="#000000">
                            kcal
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Box>
                  <RadialBarChart
                    barSize={24}
                    data={data}
                    endAngle={360} // Full circle
                    height={150} // Reduce height
                    innerRadius={100} // Reduce inner radius
                    startAngle={0} // Full circle
                    width={150} // Reduce width
                  >
                    <defs>
                      <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(253, 250, 83, 1)" /> {/* Start color */}
                        <stop offset="100%" stopColor="#D51331" /> {/* End color */}
                      </linearGradient>
                    </defs>
                    <RadialBar
                      animationDuration={300}
                      background
                      cornerRadius={10}
                      dataKey="value"
                      endAngle={360} // Full circle
                      fill="url(#gradientFill)"
                      startAngle={0} // Full circle
                    />
                  </RadialBarChart>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ textAlign: 'center', mt: '-175px' }}>
                      <Typography variant="body2" mt={2} color="#000000">
                        Weekend
                      </Typography>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center', mt: '10px' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <>
                          <Typography fontWeight="bold" variant="h5" color="#000000">
                            {weekendCalories === null ? '-' : weekendCalories?.toFixed(0)}
                          </Typography>
                          <Typography mt={-1} color="#000000">
                            kcal
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : null}
          {!trainingDayCalories && !weekdayCalories ? (
            <Grid container spacing={3} justifyContent="center" py="30px">
              <Grid
                size={{
                  md: 3,
                  xs: 12,
                }}
              >
                <Card
                  sx={{
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: 2,
                    maxWidth: 120,
                    height: 120,
                  }}
                >
                  <CardContent>
                    {isCalculating ? (
                      <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <Typography variant="h6" fontWeight="bold">
                        {protein === null ? '---' : `${protein?.toFixed(0)}g`}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      Protein
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                size={{
                  md: 3,
                  xs: 12,
                }}
              >
                <Card
                  sx={{
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: 2,
                    maxWidth: 120,
                    height: 120,
                  }}
                >
                  <CardContent>
                    {isCalculating ? (
                      <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <Typography variant="h6" fontWeight="bold">
                        {fats === null ? '---' : `${fats?.toFixed(0)}g`}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      Fats
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                size={{
                  md: 3,
                  xs: 12,
                }}
              >
                <Card
                  sx={{
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: 2,
                    maxWidth: 120,
                    height: 120,
                  }}
                >
                  <CardContent>
                    {isCalculating ? (
                      <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <Typography variant="h6" fontWeight="bold">
                        {carbos === null ? '---' : `${carbos?.toFixed(0)}g`}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      Carbohy
                      <br />
                      drates
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                size={{
                  md: 3,
                  xs: 12,
                }}
              >
                <Card
                  sx={{
                    textAlign: 'center',
                    borderRadius: 3,
                    boxShadow: 2,
                    maxWidth: 120,
                    height: 120,
                  }}
                >
                  <CardContent>
                    {isCalculating ? (
                      <Box sx={{ textAlign: 'center' }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <Typography variant="h6" fontWeight="bold">
                        {fibre === null ? '---' : `${fibre?.toFixed(0)}g`}
                      </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                      Fibre
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : trainingDayCalories && !weekdayCalories ? (
            <>
              <Typography fontWeight="bold" variant="h5" color="#000000" mt={5}>
                - TrainingDay Macros
              </Typography>
              <Grid container spacing={3} justifyContent="center" py="30px">
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {trainingDayProtein === null ? '---' : `${trainingDayProtein?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Protein
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {trainingDayFats === null ? '---' : `${trainingDayFats?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fats
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {trainingDayCarbos === null ? '---' : `${trainingDayCarbos?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Carbohy
                        <br />
                        drates
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {trainingDayFibre === null ? '---' : `${trainingDayFibre?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fibre
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Typography fontWeight="bold" variant="h5" color="#000000">
                - RestDay Macros
              </Typography>
              <Grid container spacing={3} justifyContent="center" py="30px">
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {restDayProtein === null ? '---' : `${restDayProtein?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Protein
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {restDayFats === null ? '---' : `${restDayFats?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fats
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {restDayCarbos === null ? '---' : `${restDayCarbos?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Carbohy
                        <br />
                        drates
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {restDayFibre === null ? '---' : `${restDayFibre?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fibre
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          ) : weekdayCalories && !trainingDayCalories ? (
            <>
              <Typography fontWeight="bold" variant="h5" color="#000000" mt={5}>
                - Weekday Macros
              </Typography>
              <Grid container spacing={3} justifyContent="center" py="30px">
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekDayProtein === null ? '---' : `${weekDayProtein?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Protein
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekDayFats === null ? '---' : `${weekDayFats?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fats
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekDayCarbos === null ? '---' : `${weekDayCarbos?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Carbohy
                        <br />
                        drates
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekDayFibre === null ? '---' : `${weekDayFibre?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fibre
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Typography fontWeight="bold" variant="h5" color="#000000">
                - Weekend Macros
              </Typography>
              <Grid container spacing={3} justifyContent="center" py="30px">
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekendProtein === null ? '---' : `${weekendProtein?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Protein
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekendFats === null ? '---' : `${weekendFats?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fats
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekendCarbos === null ? '---' : `${weekendCarbos?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Carbohy
                        <br />
                        drates
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekendFibre === null ? '---' : `${weekendFibre?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fibre
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          ) : weekdayCalories && trainingDayCalories ? (
            <>
              <Typography fontWeight="bold" variant="h5" color="#000000" mt={5}>
                - TrainingDay Macros
              </Typography>
              <Grid container spacing={3} justifyContent="center" py="30px">
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {trainingDayProtein === null ? '---' : `${trainingDayProtein?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Protein
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {trainingDayFats === null ? '---' : `${trainingDayFats?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fats
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {trainingDayCarbos === null ? '---' : `${trainingDayCarbos?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Carbohy
                        <br />
                        drates
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {trainingDayFibre === null ? '---' : `${trainingDayFibre?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fibre
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Typography fontWeight="bold" variant="h5" color="#000000">
                - RestDay Macros
              </Typography>
              <Grid container spacing={3} justifyContent="center" py="30px">
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {restDayProtein === null ? '---' : `${restDayProtein?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Protein
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {restDayFats === null ? '---' : `${restDayFats?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fats
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {restDayCarbos === null ? '---' : `${restDayCarbos?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Carbohy
                        <br />
                        drates
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {restDayFibre === null ? '---' : `${restDayFibre?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fibre
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography fontWeight="bold" variant="h5" color="#000000">
                - Weekday Macros
              </Typography>
              <Grid container spacing={3} justifyContent="center" py="30px">
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekDayProtein === null ? '---' : `${weekDayProtein?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Protein
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekDayFats === null ? '---' : `${weekDayFats?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fats
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekDayCarbos === null ? '---' : `${weekDayCarbos?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Carbohy
                        <br />
                        drates
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekDayFibre === null ? '---' : `${weekDayFibre?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fibre
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Typography fontWeight="bold" variant="h5" color="#000000">
                - Weekend Macros
              </Typography>
              <Grid container spacing={3} justifyContent="center" py="30px">
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekendProtein === null ? '---' : `${weekendProtein?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Protein
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekendFats === null ? '---' : `${weekendFats?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fats
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekendCarbos === null ? '---' : `${weekendCarbos?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Carbohy
                        <br />
                        drates
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  size={{
                    md: 3,
                    xs: 12,
                  }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      borderRadius: 3,
                      boxShadow: 2,
                      maxWidth: 120,
                      height: 120,
                    }}
                  >
                    <CardContent>
                      {isCalculating ? (
                        <Box sx={{ textAlign: 'center' }}>
                          <CircularProgress size={20} />
                        </Box>
                      ) : (
                        <Typography variant="h6" fontWeight="bold">
                          {weekendFibre === null ? '---' : `${weekendFibre?.toFixed(0)}g`}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Fibre
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Grid>
    </Stack>
  );
}
