import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/digitrac_short_logo.png";
import companyName from "../images/digitrac_full_logo.png";
import "./SideBar.css";
import {
  FaHome,
  FaDatabase,
  FaChevronDown,
  FaChevronRight,
  FaQuestionCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const [isMastersExpanded, setIsMastersExpanded] = useState(false);

  const handleMastersClick = () => {
    setIsMastersExpanded(!isMastersExpanded);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img className="short-logo" src={logo} alt="logo" />
        <img className="full-logo" src={companyName} alt="companyname" />
      </div>
      <ul>
        <li>
          <Link to="/">
            <FaHome /> Home
          </Link>
        </li>
        <li
          onClick={handleMastersClick}
          className={`masters-item ${isMastersExpanded ? "active" : ""}`}
        >
          <div className="master-link">
            <FaDatabase />
            <span>Masters</span>
            {isMastersExpanded ? (
              <FaChevronDown className="chevron-icon" />
            ) : (
              <FaChevronRight className="chevron-icon" />
            )}
          </div>
          {isMastersExpanded && (
            <ul className="sub-menu">
              <li className="sub-menu-item">
                <Link to="/masters/branch">Branch</Link>
              </li>
              {/* Add more sub-menu items here */}
            </ul>
          )}
        </li>

        <li>
          <Link to="/help">
            <FaQuestionCircle /> Help
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
