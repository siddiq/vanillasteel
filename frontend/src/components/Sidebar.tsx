import React from 'react'
import { Link } from 'react-router-dom'
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/divider/divider'
import '@material/web/button/filled-button'

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <md-list>
        <Link to="/" className="nav-link">
          <md-list-item>Dashboard</md-list-item>
        </Link>
        <Link to="/search" className="nav-link">
          <md-list-item>Search</md-list-item>
        </Link>
      </md-list>
    </div>
  )
}
