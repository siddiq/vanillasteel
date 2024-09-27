import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '@material/web/all'
import './Sidebar.css'

export const Sidebar: React.FC = () => {
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: 'dashboard' },
    { path: '/search', label: 'Search', icon: 'search' },
    { path: '/about', label: 'About', icon: 'person' }
  ]

  return (
    <div className="sidebar">
      <md-list>
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <md-list-item active={location.pathname === item.path}>
              <md-icon class="material-icons" slot="start">
                {item.icon}
              </md-icon>

              <div slot="headline">{item.label}</div>
            </md-list-item>
          </Link>
        ))}
      </md-list>
    </div>
  )
}
