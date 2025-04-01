// This file uses shadcn/ui components and sonner for toast notifications
// It provides user settings for profile, preferences, and budget goals

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import './Settings.css';

const Settings: React.FC = () => {
  const [name, setName] = useState('Atul Bharti');
  const [email, setEmail] = useState('whatsyourname@gmail.com');
  const [currency, setCurrency] = useState('INR');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weeklyReportEnabled, setWeeklyReportEnabled] = useState(true);
  const [monthlyBudget, setMonthlyBudget] = useState('50000');
  
  const handleSaveProfile = () => {
    toast.success('Profile settings saved successfully');
  };
  
  const handleSavePreferences = () => {
    toast.success('Preferences saved successfully');
  };
  
  const handleSaveBudgetGoals = () => {
    toast.success('Budget goals saved successfully');
  };
  
  const handleResetData = () => {
    toast('This action will reset all your data. Are you sure?', {
      action: {
        label: 'Reset',
        onClick: () => toast.error('All data has been reset'),
      },
      cancel: {
        label: 'Cancel',
        onClick: () => console.log('Reset cancelled'),
      },
    });
  };
  
  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>
      
      <div className="settings-grid">
        {/* Profile Settings Card */}
        <Card className="settings-card">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="settings-form">
              <div className="form-group">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="button" onClick={handleSaveProfile}>
                Save Profile
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Preferences Card */}
        <Card className="settings-card">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="settings-form">
              <div className="form-group">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="form-group switch-group">
                <div className="switch-label">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              <div className="form-group switch-group">
                <div className="switch-label">
                  <Label htmlFor="weekly-report">Weekly Report Email</Label>
                </div>
                <Switch
                  id="weekly-report"
                  checked={weeklyReportEnabled}
                  onCheckedChange={setWeeklyReportEnabled}
                />
              </div>
              <Button type="button" onClick={handleSavePreferences}>
                Save Preferences
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Budget Goals Card */}
        <Card className="settings-card">
          <CardHeader>
            <CardTitle>Budget Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="settings-form">
              <div className="form-group">
                <Label htmlFor="monthly-budget">Monthly Budget Limit (₹)</Label>
                <Input
                  id="monthly-budget"
                  type="number"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                />
              </div>
              <Button type="button" onClick={handleSaveBudgetGoals}>
                Save Budget Goals
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Danger Zone Card */}
        <Card className="settings-card danger-zone">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="danger-actions">
              <div className="danger-info">
                <h3>Reset All Data</h3>
                <p>This will delete all your transactions, budgets, and settings.</p>
              </div>
              <Button variant="destructive" onClick={handleResetData}>
                Reset Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
