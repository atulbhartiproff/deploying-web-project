
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Transaction } from './RecentTransactions';
import './AddTransaction.css';

interface AddTransactionProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const categories = [
  { value: 'shopping', label: 'Shopping' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'housing', label: 'Housing' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'salary', label: 'Salary' },
  { value: 'other', label: 'Other' },
];

const AddTransaction: React.FC<AddTransactionProps> = ({ onAddTransaction }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !amount || !category || !date) {
      return;
    }
    
    const newTransaction = {
      title,
      amount: parseFloat(amount),
      type,
      category,
      date: date.toISOString(),
    };
    
    onAddTransaction(newTransaction);
    resetForm();
    setOpen(false);
  };
  
  const resetForm = () => {
    setTitle('');
    setAmount('');
    setType('expense');
    setCategory('');
    setDate(new Date());
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="add-transaction-button">
          <Plus className="mr-2" size={16} />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="add-transaction-dialog">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>
          
          <div className="form-group">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              required
              min="0"
              step="0.01"
            />
          </div>
          
          <div className="form-group">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as 'income' | 'expense')}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="form-group">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="form-group">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("date-picker-button", !date && "text-muted-foreground")}
                >
                  {date ? format(date, "PPP") : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="form-actions">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransaction;
