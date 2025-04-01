// This file uses recharts for data visualization and shadcn/ui for UI components
// It displays various financial analytics charts and summary

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import './Analytics.css';

const monthlyData = [
  { name: 'Jan', income: 55000, expenses: 45000 },
  { name: 'Feb', income: 57000, expenses: 44000 },
  { name: 'Mar', income: 52000, expenses: 47000 },
  { name: 'Apr', income: 58000, expenses: 42000 },
  { name: 'May', income: 59000, expenses: 43000 },
  { name: 'Jun', income: 54000, expenses: 48000 },
  { name: 'Jul', income: 65000, expenses: 51000 },
  { name: 'Aug', income: 68000, expenses: 52000 },
  { name: 'Sep', income: 62000, expenses: 49000 },
  { name: 'Oct', income: 75000, expenses: 53000 },
  { name: 'Nov', income: 79000, expenses: 55000 },
  { name: 'Dec', income: 80000, expenses: 58000 },
];

const categoryData = [
  { name: 'Housing', amount: 180000 },
  { name: 'Food', amount: 96000 },
  { name: 'Transport', amount: 60000 },
  { name: 'Utilities', amount: 36000 },
  { name: 'Entertainment', amount: 24000 },
  { name: 'Shopping', amount: 48000 },
];

const savingsData = [
  { name: 'Jan', savings: 10000 },
  { name: 'Feb', savings: 13000 },
  { name: 'Mar', savings: 5000 },
  { name: 'Apr', savings: 16000 },
  { name: 'May', savings: 16000 },
  { name: 'Jun', savings: 6000 },
  { name: 'Jul', savings: 14000 },
  { name: 'Aug', savings: 16000 },
  { name: 'Sep', savings: 13000 },
  { name: 'Oct', savings: 22000 },
  { name: 'Nov', savings: 24000 },
  { name: 'Dec', savings: 22000 },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const Analytics: React.FC = () => {
  return (
    <div className="analytics-page">
      <h1 className="analytics-title">Analytics</h1>
      
      <div className="analytics-grid">
        {/* Monthly Income vs Expenses Chart */}
        <Card className="analytics-card income-expenses-card">
          <CardHeader>
            <CardTitle>Monthly Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#4ade80" />
                <Bar dataKey="expenses" name="Expenses" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Yearly Expenses by Category Chart */}
        <Card className="analytics-card category-card">
          <CardHeader>
            <CardTitle>Yearly Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `₹${value/1000}k`} />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Legend />
                <Bar dataKey="amount" name="Amount" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Monthly Savings Trend Chart */}
        <Card className="analytics-card savings-card">
          <CardHeader>
            <CardTitle>Monthly Savings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  name="Savings" 
                  stroke="#4ade80" 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Financial Summary */}
        <Card className="analytics-card summary-card">
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="summary-stats">
              <div className="summary-stat">
                <div className="stat-label">Total Annual Income</div>
                <div className="stat-value income">
                  {formatCurrency(monthlyData.reduce((sum, month) => sum + month.income, 0))}
                </div>
              </div>
              <div className="summary-stat">
                <div className="stat-label">Total Annual Expenses</div>
                <div className="stat-value expense">
                  {formatCurrency(monthlyData.reduce((sum, month) => sum + month.expenses, 0))}
                </div>
              </div>
              <div className="summary-stat">
                <div className="stat-label">Total Annual Savings</div>
                <div className="stat-value savings">
                  {formatCurrency(savingsData.reduce((sum, month) => sum + month.savings, 0))}
                </div>
              </div>
              <div className="summary-stat">
                <div className="stat-label">Average Monthly Savings</div>
                <div className="stat-value">
                  {formatCurrency(savingsData.reduce((sum, month) => sum + month.savings, 0) / 12)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
