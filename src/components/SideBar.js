import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const [isMastersExpanded, setIsMastersExpanded] = useState(true); // Default to open
  const location = useLocation(); // Detect current route

  const handleMastersClick = () => {
    setIsMastersExpanded(!isMastersExpanded);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img className="short-logo" src={logo} alt="logo" />
        <img className="full-logo" src={companyName} alt="company name" />
      </div>
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
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
              <li
                className={`sub-menu-item ${
                  location.pathname === "/masters/branch" ? "active" : ""
                }`}
              >
                <Link to="/masters/branch">Branch</Link>
              </li>
              {/* Add more submenu items here */}
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/help"
            className={location.pathname === "/help" ? "active" : ""}
          >
            <FaQuestionCircle /> Help
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
