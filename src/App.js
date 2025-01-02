import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageBranch from './components/ManageBranch';
import AddBranchModal from './components/AddBranchModal';
import './App.css';
import Sidebar from './components/SideBar';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to manage modal visibility
  const [submittedData, setSubmittedData] = useState([]);  // State to store the branch data

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Function to add a new branch (passed to AddBranchModal)
  const addBranch = (newBranch) => {
    setSubmittedData((prevData) => [...prevData, newBranch]);
  };

  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="main-content">
          <button onClick={openModal}>Add Branch</button> {/* Button to open modal */}

          {/* Conditionally render the AddBranchModal */}
          {isModalOpen && <AddBranchModal onClose={closeModal} addBranch={addBranch} />} {/* Pass close function and addBranch function to modal */}

          <Routes>
            <Route path="/masters/branch" element={<ManageBranch submittedData={submittedData} />} />
            {/* Other routes can be added here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
