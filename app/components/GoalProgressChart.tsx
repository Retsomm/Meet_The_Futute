'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { calculateGoalProgress } from '../../lib/types';
import type { Goal } from '../../lib/types';
import { useState, useEffect } from 'react';

interface GoalProgressChartProps {
  goals: Goal[];
}

interface BarData {
  name: string;
  progress: number;
  gap: number;
  fullName: string;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: BarData }>;
}

const COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#F97316',
];

export default function GoalProgressChart({ goals }: GoalProgressChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!goals || goals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">暫無目標數據</div>
    );
  }

  const barData: BarData[] = goals.map((goal) => ({
    name:
      goal.title.length > 10 ? goal.title.substring(0, 10) + '...' : goal.title,
    progress: calculateGoalProgress(goal),
    gap: 100 - calculateGoalProgress(goal),
    fullName: goal.title,
  }));

  const pieData: PieData[] = [
    {
      name: '已完成',
      value: goals.filter((g) => calculateGoalProgress(g) === 100).length,
      color: '#10B981',
    },
    {
      name: '進行中',
      value: goals.filter((g) => {
        const p = calculateGoalProgress(g);
        return p > 0 && p < 100;
      }).length,
      color: '#F59E0B',
    },
    {
      name: '未開始',
      value: goals.filter((g) => calculateGoalProgress(g) === 0).length,
      color: '#EF4444',
    },
  ].filter((item) => item.value > 0);

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.fullName}</p>
          <p className="text-blue-600">進度: {data.progress}%</p>
          <p className="text-red-500">差距: {data.gap}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          各目標進度對比
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                label={{
                  value: '完成度 (%)',
                  angle: -90,
                  position: 'insideLeft',
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="progress" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {pieData.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            目標狀態分布
          </h3>
          <div className="h-80 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={
                    isMobile
                      ? false
                      : ({
                          name,
                          value,
                          percent,
                        }: {
                          name?: string;
                          value?: number;
                          percent?: number;
                        }) =>
                          `${name ?? ''}: ${value ?? 0} (${((percent ?? 0) * 100).toFixed(0)}%)`
                  }
                  outerRadius={isMobile ? '35%' : '45%'}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    value,
                    name === 'value' ? '目標數' : name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4 md:hidden">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
