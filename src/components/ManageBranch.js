import React, { useState, useEffect } from 'react';
import BranchList from './BranchList';
import AddBranchModal from './AddBranchModal';
import { useFullScreenHandle } from 'react-full-screen';
import { saveAs } from 'file-saver';

import * as XLSX from 'xlsx';

import './ManageBranch.css';

const ManageBranch = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null); // To store the branch being edited/viewed
 

  const fullscreenHandle = useFullScreenHandle(); // Initialize fullscreen handle

  useEffect(() => {
    const storedData = localStorage.getItem('submittedData');
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('submittedData', JSON.stringify(submittedData));
  }, [submittedData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    const csvData = submittedData.map((branch) =>
      Object.values(branch) // Extract values for each branch object
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' + csvData.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'branch_data.csv');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const abuf = e.target.result;
        const wb = XLSX.read(abuf, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        setSubmittedData(data);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Filters the data based on the search term
  const filteredData = submittedData.filter((branch) =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // onEdit handler
  const handleEdit = (branch) => {
    setSelectedBranch(branch); // Set the branch to be edited
    setIsModalOpen(true); // Open the modal
  };

  // onView handler
  const handleView = (branch) => {
    alert(`Viewing branch: ${JSON.stringify(branch)}`); // For simplicity, showing an alert with the branch info
  };

  return (
    <div className="container">
      <div className="main-content">
        <h2>Manage Branch</h2>
        <div className="actions">
          <button className="add-button" onClick={handleAddClick}>
            +
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleDownload}>Download</button>
          {/* File upload button */}
          <input type="file" onChange={handleFileUpload} />
          <button onClick={fullscreenHandle.enterFullscreen}>
            {fullscreenHandle.active ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
        <AddBranchModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={(newBranch) => {
            if (selectedBranch) {
              // If there's a selected branch, update it
              const updatedData = submittedData.map((branch) =>
                branch.branchCode === selectedBranch.branchCode ? newBranch : branch
              );
              setSubmittedData(updatedData);
            } else {
              // Otherwise, add a new branch
              setSubmittedData([...submittedData, newBranch]);
            }
            setIsModalOpen(false);
            setSelectedBranch(null); // Reset selected branch after submit
          }}
          selectedBranch={selectedBranch} // Pass selected branch to the modal for editing
        />
        <BranchList branchData={filteredData} onEdit={handleEdit} onView={handleView} />
      </div>
    </div>
  );
};

export default ManageBranch;
