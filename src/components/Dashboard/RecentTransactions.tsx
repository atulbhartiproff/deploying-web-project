
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Utensils,
  Home,
  Car,
  Smartphone,
  Coffee,
  CreditCard,
  Gift
} from 'lucide-react';
import './RecentTransactions.css';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'shopping':
      return ShoppingBag;
    case 'food':
      return Utensils;
    case 'housing':
      return Home;
    case 'transportation':
      return Car;
    case 'utilities':
      return Smartphone;
    case 'entertainment':
      return Coffee;
    case 'salary':
      return CreditCard;
    default:
      return Gift;
  }
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
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
      day: 'numeric',
      month: 'short',
    }).format(date);
  };

  return (
    <Card className="recent-transactions">
      <CardHeader className="transactions-header">
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="transactions-content">
        <div className="transaction-list">
          {transactions.length === 0 ? (
            <div className="no-transactions">No recent transactions</div>
          ) : (
            transactions.map((transaction) => {
              const Icon = getCategoryIcon(transaction.category);
              return (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon-wrapper">
                    <div className={`transaction-icon ${transaction.type}`}>
                      <Icon size={16} />
                    </div>
                  </div>
                  <div className="transaction-details">
                    <div className="transaction-title">{transaction.title}</div>
                    <div className="transaction-category">{transaction.category}</div>
                  </div>
                  <div className="transaction-meta">
                    <div className={`transaction-amount ${transaction.type}`}>
                      {transaction.type === 'expense' ? '- ' : '+ '}
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="transaction-date">{formatDate(transaction.date)}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
