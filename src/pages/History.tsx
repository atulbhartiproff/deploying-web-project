
// This file uses shadcn/ui components and lucide-react icons
// It provides a transaction history with filtering and sorting capabilities

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Transaction } from '@/components/Dashboard/RecentTransactions';
import './History.css';

// Mock data for transactions history
const MOCK_TRANSACTIONS: Transaction[] = [
  // January
  {
    id: '1',
    title: 'Monthly Salary',
    amount: 65000,
    type: 'income',
    category: 'salary',
    date: new Date(2023, 0, 1).toISOString(),
  },
  {
    id: '2',
    title: 'Rent Payment',
    amount: 15000,
    type: 'expense',
    category: 'housing',
    date: new Date(2023, 0, 5).toISOString(),
  },
  // February
  {
    id: '3',
    title: 'Grocery Shopping',
    amount: 3500,
    type: 'expense',
    category: 'food',
    date: new Date(2023, 1, 8).toISOString(),
  },
  {
    id: '4',
    title: 'Mobile Bill',
    amount: 999,
    type: 'expense',
    category: 'utilities',
    date: new Date(2023, 1, 10).toISOString(),
  },
  // March
  {
    id: '5',
    title: 'Freelance Work',
    amount: 10000,
    type: 'income',
    category: 'salary',
    date: new Date(2023, 2, 15).toISOString(),
  },
  {
    id: '6',
    title: 'Restaurant Dinner',
    amount: 2500,
    type: 'expense',
    category: 'food',
    date: new Date(2023, 2, 18).toISOString(),
  },
  // April
  {
    id: '7',
    title: 'Monthly Salary',
    amount: 65000,
    type: 'income',
    category: 'salary',
    date: new Date(2023, 3, 1).toISOString(),
  },
  {
    id: '8',
    title: 'New Laptop',
    amount: 70000,
    type: 'expense',
    category: 'shopping',
    date: new Date(2023, 3, 12).toISOString(),
  },
  // May
  {
    id: '9',
    title: 'Electricity Bill',
    amount: 1500,
    type: 'expense',
    category: 'utilities',
    date: new Date(2023, 4, 5).toISOString(),
  },
  {
    id: '10',
    title: 'Monthly Salary',
    amount: 65000,
    type: 'income',
    category: 'salary',
    date: new Date(2023, 4, 1).toISOString(),
  },
  // Add more transactions as needed
];

const History: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  // Get unique categories from transactions
  const categories = useMemo(() => {
    const categorySet = new Set(MOCK_TRANSACTIONS.map(t => t.category));
    return ['all', ...Array.from(categorySet)];
  }, []);
  
  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(transaction => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
        
      // Type filter
      const matchesType = filterType === 'all' || transaction.type === filterType;
      
      // Category filter
      const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount-asc':
          return a.amount - b.amount;
        case 'amount-desc':
          return b.amount - a.amount;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [searchQuery, filterType, filterCategory, sortBy]);
  
  return (
    <div className="history-page">
      <h1 className="history-title">Transaction History</h1>
      
      <Card className="filter-card">
        <CardContent className="filter-content">
          <div className="filter-row">
            <div className="search-box">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="search-input-wrapper">
                <Search className="search-icon" size={16} />
                <Input
                  id="search"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            
            <div className="filter-actions">
              <div className="filter-select">
                <Label htmlFor="type-filter" className="sr-only">Filter by Type</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger id="type-filter" className="filter-trigger">
                    <Filter className="filter-icon" size={16} />
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="filter-select">
                <Label htmlFor="category-filter" className="sr-only">Filter by Category</Label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger id="category-filter" className="filter-trigger">
                    <Filter className="filter-icon" size={16} />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="filter-select">
                <Label htmlFor="sort-by" className="sr-only">Sort by</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" className="filter-trigger">
                    <ArrowUpDown className="filter-icon" size={16} />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="amount-desc">Highest Amount</SelectItem>
                    <SelectItem value="amount-asc">Lowest Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transactions-card">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="transactions-table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="no-results">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{formatDate(transaction.date)}</td>
                      <td>{transaction.title}</td>
                      <td>
                        <span className="category-badge">
                          {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                        </span>
                      </td>
                      <td>
                        <span className={`type-badge ${transaction.type}`}>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </span>
                      </td>
                      <td className={`amount ${transaction.type}`}>
                        {transaction.type === 'expense' ? '- ' : '+ '}
                        {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
