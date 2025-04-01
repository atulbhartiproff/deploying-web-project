
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './BalanceCard.css';

interface BalanceCardProps {
  balance: number;
  income: number;
  expenses: number;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, income, expenses }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="balance-card">
      <CardHeader className="balance-card-header">
        <CardTitle className="balance-card-title">Current Balance</CardTitle>
      </CardHeader>
      <CardContent className="balance-card-content">
        <div className="balance-amount">{formatCurrency(balance)}</div>
        <div className="balance-stats">
          <div className="stat income">
            <div className="stat-icon">
              <ArrowUpRight size={18} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Income</div>
              <div className="stat-value">{formatCurrency(income)}</div>
            </div>
          </div>
          <div className="stat expenses">
            <div className="stat-icon">
              <ArrowDownRight size={18} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Expenses</div>
              <div className="stat-value">{formatCurrency(expenses)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
