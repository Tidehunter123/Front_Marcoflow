'use client';

import * as React from 'react';
import { MenuItem, Select } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { ReceiptX as ReceiptXIcon } from '@phosphor-icons/react/dist/ssr/ReceiptX';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const lines = [
  { name: 'Weight Loss 0.5%', dataKey: 'v1', color: 'rgba(213, 19, 49, 1)' },
  { name: 'Weight Loss 1%', dataKey: 'v2', color: 'purple' },
  { name: 'Weight Gain 0.5%', dataKey: 'v3', color: 'orange' },
  { name: 'Weight Gain 0.75%', dataKey: 'v4', color: 'green' },
] satisfies { name: string; dataKey: string; color: string }[];

export interface StatsProps {
  data: { name: string; v1: number; v2: number; v3: number; v4: number }[];
  weight: number | null;
}

export function Stats({ data, weight }: StatsProps): React.JSX.Element {
  const [week, setWeek] = React.useState<number>(1); // Default week is 1

  const chartHeight = 320;

  console.log(data, 'data');

  const handleWeekChange = (event: SelectChangeEvent<number>) => {
    setWeek(Number(event.target.value));
  };

  return (
    <Card>
      <CardHeader
        title={
          <span>
            Current Weight: <span style={{ color: '#D51331' }}>{weight !== null ? `${weight} kg` : ''}</span>
          </span>
        }
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={1}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            divider={<Divider flexItem orientation="vertical" sx={{ borderBottomWidth: { xs: '1px', md: 0 } }} />}
            spacing={3}
            sx={{ justifyContent: 'space-between' }}
          >
            <Summary
              icon={ChartPieIcon}
              title="Weekly Loss 0.5%"
              data={data}
              dataKey="v1"
              week={week}
              handleWeekChange={handleWeekChange}
            />
            <Summary
              icon={CurrencyDollarIcon}
              title="Weekly Loss 1%"
              data={data}
              dataKey="v2"
              week={week}
              handleWeekChange={handleWeekChange}
            />
            <Summary
              icon={ReceiptIcon}
              title="Weekly Gain 0.5%"
              data={data}
              dataKey="v3"
              week={week}
              handleWeekChange={handleWeekChange}
            />
            <Summary
              icon={ReceiptXIcon}
              title="Weekly Gain 1%"
              data={data}
              dataKey="v4"
              week={week}
              handleWeekChange={handleWeekChange}
            />
          </Stack>
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight} width="100%">
              <LineChart data={data} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis axisLine={false} dataKey="name" interval={4} tickLine={false} type="category" />
                <YAxis axisLine={false} domain={[30, 200]} hide type="number" yAxisId={0} />
                <YAxis axisLine={false} domain={[30, 200]} hide type="number" yAxisId={1} />
                <YAxis axisLine={false} domain={[30, 200]} hide type="number" yAxisId={2} />
                <YAxis axisLine={false} domain={[30, 200]} hide type="number" yAxisId={3} />
                {lines.map(
                  (line, index): React.JSX.Element => (
                    <Line
                      animationDuration={300}
                      dataKey={line.dataKey}
                      dot={<Dot />}
                      key={line.name}
                      name={line.name}
                      stroke={line.color}
                      strokeDasharray={'10 10'}
                      strokeWidth={2}
                      type="bump"
                      yAxisId={index}
                    />
                  )
                )}
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </LineChart>
            </ResponsiveContainer>
          </NoSsr>
          <Legend />
        </Stack>
      </CardContent>
    </Card>
  );
}

interface SummaryProps {
  icon: Icon;
  title: string;
  data: { name: string; v1: number; v2: number; v3: number; v4: number }[];
  dataKey: 'v1' | 'v2' | 'v3' | 'v4';
  week: number;
  handleWeekChange: (event: SelectChangeEvent<number>) => void;
}

function Summary({ icon: Icon, title, data, dataKey, week, handleWeekChange }: SummaryProps): React.JSX.Element {
  return (
    <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
      <Avatar
        sx={{
          '--Avatar-size': '54px',
          '--Icon-fontSize': 'var(--icon-fontSize-lg)',
          bgcolor: 'var(--mui-palette-background-paper)',
          boxShadow: 'var(--mui-shadows-8)',
          color: 'var(--mui-palette-text-primary)',
        }}
      >
        <Icon fontSize="var(--Icon-fontSize)" />
      </Avatar>
      <div>
        <Typography color="text.secondary" variant="overline" fontSize={15}>
          {title}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">
            {data[week - 1]?.[dataKey] ? `${data[week - 1][dataKey]} kg` : '00.00 kg'}
          </Typography>
          <Select value={week} onChange={handleWeekChange} size="small" sx={{ marginLeft: '10px' }}>
            {Array.from({ length: 41 }, (_, i) => (
              <MenuItem key={i} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body2">Week</Typography>
        </Stack>
      </div>
    </Stack>
  );
}

interface DotProps {
  hover?: boolean;
  active?: string;
  cx?: number;
  cy?: number;
  payload?: { name: string };
  stroke?: string;
}

function Dot({ active, cx, cy, payload, stroke }: DotProps): React.JSX.Element | null {
  if (active && payload?.name === active) {
    return <circle cx={cx} cy={cy} fill={stroke} r={6} />;
  }

  return null;
}

function Legend(): React.JSX.Element {
  return (
    <Stack direction="row" spacing={2}>
      {lines.map((line) => (
        <Stack direction="row" key={line.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: line.color, borderRadius: '2px', height: '4px', width: '16px' }} />
          <Typography color="text.secondary" variant="body2">
            {line.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
interface TooltipContentProps {
  active?: boolean;
  payload?: { name: string; dataKey: string; value: number; stroke: string }[];
  label?: string;
}

function TooltipContent({ active, payload }: TooltipContentProps): React.JSX.Element | null {
  if (!active) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload?.map(
          (entry, index): React.JSX.Element => (
            <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Box sx={{ bgcolor: entry.stroke, borderRadius: '2px', height: '8px', width: '8px' }} />
                <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {entry.value.toFixed(0)} kg
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
