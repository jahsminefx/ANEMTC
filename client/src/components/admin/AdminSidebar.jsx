import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Handshake, 
  Sparkles, 
  Layers, 
  FileText, 
  Mail, 
  Settings, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Partners', path: '/admin/partners', icon: Handshake },
    { name: 'Services', path: '/admin/services', icon: Sparkles },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Blog Articles', path: '/admin/blog', icon: FileText },
    { name: 'Subscribers', path: '/admin/subscribers', icon: Mail },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-brand-dark-green text-white flex flex-col justify-between h-screen sticky top-0 border-r border-emerald-900/60 shadow-xl shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-earth flex items-center justify-center text-brand-dark-green font-bold">
              A
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-tight text-white leading-tight">
                ANINTA CMS
              </h2>
              <span className="text-[10px] uppercase tracking-wider text-brand-earth font-semibold">
                Staff Management
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-earth text-brand-dark-green font-bold shadow-md'
                      : 'text-emerald-100/80 hover:bg-emerald-900/60 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Admin User Footer & Logout */}
      <div className="p-4 border-t border-emerald-900/60 space-y-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-xs text-emerald-200 transition"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="flex items-center justify-between px-2 pt-2 text-xs">
          <div className="truncate">
            <p className="font-semibold text-white truncate">{admin?.name || 'Admin User'}</p>
            <p className="text-emerald-300/60 text-[10px] uppercase font-mono">{admin?.role || 'SUPERADMIN'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900 transition"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
