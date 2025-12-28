import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface MiniChartProps {
  data: ChartDataPoint[];
  color: string;
  width?: number;
  height?: number;
}

export const MiniChart: React.FC<MiniChartProps> = ({
  data,
  color,
  width = 80,
  height = 40
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
