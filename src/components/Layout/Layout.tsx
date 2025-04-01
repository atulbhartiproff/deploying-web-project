
// This file combines the Layout and Sidebar components
// It uses react-router-dom for navigation and lucide-react for icons

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PieChart, Clock, MessageSquare, Settings } from 'lucide-react';
import './Layout.css';
import './Sidebar.css';

// Navigation items used in the sidebar
const navItems = [
  { icon: LayoutDashboard, text: 'Dashboard', link: '/' },
  { icon: PieChart, text: 'Analytics', link: '/analytics' },
  { icon: Clock, text: 'History', link: '/history' },
  { icon: MessageSquare, text: 'Chat', link: '/chat' },
  { icon: Settings, text: 'Settings', link: '/settings' },
];

// Sidebar component integrated into Layout file
const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Budget Tracker</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const isActive = location.pathname === item.link;
            return (
              <li key={item.text}>
                <Link to={item.link} className={`nav-item ${isActive ? 'active' : ''}`}>
                  <item.icon className="nav-icon" />
                  <span>{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p><strong>Web Programming Project</strong><br></br>Atul Bharti:23BCE1536<br></br>Rishabh Vineet:23BAI1560<br></br>Sanjay Prakash</p>
      </div>
    </aside>
  );
};

// Main Layout component
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
