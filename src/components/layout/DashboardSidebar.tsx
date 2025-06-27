
import React from 'react';
import { Home, Building, Users, FileText, Calendar, Activity, MessageCircle, Settings, HelpCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed?: boolean;
}

const navigationItems = [
  { icon: Home, label: 'Dashboard', href: '/', active: true },
  { icon: Building, label: 'Properties', href: '/properties' },
  { icon: Users, label: 'Leads', href: '/leads' },
  { icon: FileText, label: 'Projects', href: '/projects' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: Activity, label: 'Activities', href: '/activities' },
  { icon: MessageCircle, label: 'Messages', href: '/messages' },
  { icon: Users, label: 'Contacts', href: '/contacts' },
];

const bottomItems = [
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
];

export const DashboardSidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-landify-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-lg text-gray-900">Landify</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "sidebar-nav-item",
              isActive && "active"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        {bottomItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className="sidebar-nav-item"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
};
