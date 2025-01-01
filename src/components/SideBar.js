import React from 'react';
import { Link } from 'react-router-dom';

import './SideBar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/masters">Masters</Link>
          <ul>
            <li><Link to="/masters/branch">Branch</Link></li>
            {/* Add other masters options here */}
          </ul>
        </li>
        <li><Link to="/help">Help</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;