import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageBranch from './components/ManageBranch';

import './App.css';

import Sidebar from './components/SideBar';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar/>
        <Routes>
          <Route path="/masters/branch" element={<ManageBranch />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;