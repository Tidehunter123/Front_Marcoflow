import * as React from 'react';
import { Avatar, Box, CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Course } from './types';

export interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps): React.JSX.Element {
  const [progress, setProgress] = React.useState(0);
  const [direction, setDirection] = React.useState(1); // 1 for increasing, -1 for decreasing

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Number(direction) * 1; // Increase or decrease by 1 per interval

        if (newProgress >= 100) {
          setDirection(-1);
          return 100;
        } else if (newProgress <= 0) {
          setDirection(1);
          return 0;
        }

        return newProgress;
      });
    }, 50); // Update every 50ms

    return () => {
      clearInterval(interval);
    };
  }, [direction]);

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: '#FFFFFF', // Sets border color to white
        borderWidth: '2px', // Optional: Increase border thickness
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Avatar
              src={course.media} // Replace with the actual path
              alt="Activity-Based Logo"
              sx={{ width: 48, height: 48 }}
            />
          </Box>
        }
        sx={{
          height: '80px',
          backgroundColor: '#FDFA53',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />

      <CardContent>
        <Stack spacing={1} display="flex" alignItems="center">
          <Link color="text.primary" underline="none" variant="subtitle1">
            {course.title}
          </Link>
          <Typography
            color="text.secondary"
            variant="body2"
            textAlign="center"
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {course.description}
          </Typography>
        </Stack>
      </CardContent>
      <LinearProgress value={progress} variant="determinate" />
    </Card>
  );
}
