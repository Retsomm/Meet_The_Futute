'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { calculateGoalProgress } from '../../lib/types';
import { useState, useEffect } from 'react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];

export default function GoalProgressChart({ goals }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!goals || goals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        暫無目標數據
      </div>
    );
  }

  // 準備柱狀圖數據
  const barData = goals.map((goal, index) => ({
    name: goal.title.length > 10 ? goal.title.substring(0, 10) + '...' : goal.title,
    progress: calculateGoalProgress(goal),
    gap: 100 - calculateGoalProgress(goal),
    fullName: goal.title
  }));

  // 準備餅圖數據
  const pieData = [
    {
      name: '已完成',
      value: goals.filter(goal => calculateGoalProgress(goal) === 100).length,
      color: '#10B981'
    },
    {
      name: '進行中',
      value: goals.filter(goal => {
        const progress = calculateGoalProgress(goal);
        return progress > 0 && progress < 100;
      }).length,
      color: '#F59E0B'
    },
    {
      name: '未開始',
      value: goals.filter(goal => calculateGoalProgress(goal) === 0).length,
      color: '#EF4444'
    }
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload, label }) => {
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
      {/* 柱狀圖 - 顯示每個目標的進度 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">各目標進度對比</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                label={{ value: '完成度 (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="progress" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 餅圖 - 顯示目標狀態分布 */}
      {pieData.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">目標狀態分布</h3>
          <div className="h-80 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={isMobile ? false : ({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={isMobile ? "35%" : "45%"}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, name === 'value' ? '目標數' : name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* 手機模式下的圖例 */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:hidden">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
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