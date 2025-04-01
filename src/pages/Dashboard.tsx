
// This file uses components from the project and uuid for generating unique IDs
// It displays the main dashboard with financial metrics

import React, { useState } from 'react';
import BalanceCard from '@/components/Dashboard/BalanceCard';
import RecentTransactions, { Transaction } from '@/components/Dashboard/RecentTransactions';
import ExpenseChart from '@/components/Dashboard/ExpenseChart';
import AddTransaction from '@/components/Dashboard/AddTransaction';
import { v4 as uuidv4 } from 'uuid';
import './Dashboard.css';

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Monthly Salary',
    amount: 65000,
    type: 'income',
    category: 'salary',
    date: new Date(2023, 10, 1).toISOString(),
  },
  {
    id: '2',
    title: 'Rent Payment',
    amount: 15000,
    type: 'expense',
    category: 'housing',
    date: new Date(2023, 10, 5).toISOString(),
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    amount: 3500,
    type: 'expense',
    category: 'food',
    date: new Date(2023, 10, 8).toISOString(),
  },
  {
    id: '4',
    title: 'Mobile Bill',
    amount: 999,
    type: 'expense',
    category: 'utilities',
    date: new Date(2023, 10, 10).toISOString(),
  },
  {
    id: '5',
    title: 'Freelance Work',
    amount: 10000,
    type: 'income',
    category: 'salary',
    date: new Date(2023, 10, 15).toISOString(),
  },
];

const EXPENSE_CATEGORIES = [
  { name: 'Housing', value: 15000, color: '#3b82f6' },
  { name: 'Food', value: 8000, color: '#f97316' },
  { name: 'Transportation', value: 5000, color: '#14b8a6' },
  { name: 'Utilities', value: 3000, color: '#a855f7' },
  { name: 'Entertainment', value: 2000, color: '#ec4899' },
  { name: 'Shopping', value: 4000, color: '#f43f5e' },
];

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: uuidv4(),
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-actions">
        <AddTransaction onAddTransaction={handleAddTransaction} />
      </div>
      <div className="dashboard-grid">
        <div className="balance-section">
          <BalanceCard
            balance={balance}
            income={totalIncome}
            expenses={totalExpenses}
          />
        </div>
        <div className="chart-section">
          <ExpenseChart data={EXPENSE_CATEGORIES} />
        </div>
        <div className="transactions-section">
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
