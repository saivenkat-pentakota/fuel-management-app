import React, { useState, useEffect } from 'react';
import BranchList from './BranchList';
import AddBranchModal from './AddBranchModal';
import { useFullScreenHandle } from 'react-full-screen';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Keep this import for file handling

import './ManageBranch.css';

const ManageBranch = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Handles the change in the search input field
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  // Opens the modal to add a new branch
  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  // Closes the modal to add a new branch
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Downloads the branch data as a CSV file
  const handleDownload = () => {
    const csvData = submittedData.map((branch) =>
      Object.values(branch) // Extract values for each branch object
    );

    const csvContent =
      'data:text/csv;charset=utf-8,' + csvData.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'branch_data.csv');
  };

  // Handles file upload (reads the file and processes it)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const abuf = e.target.result;
        const wb = XLSX.read(abuf, { type: 'array' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        setSubmittedData(data); // Assuming the data will match your branch data structure
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Filters the data based on the search term
  const filteredData = submittedData.filter((branch) =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            setSubmittedData([...submittedData, newBranch]);
            setIsModalOpen(false);
          }}
        />
        <BranchList branchData={filteredData} />
      </div>
    </div>
  );
};

export default ManageBranch;
