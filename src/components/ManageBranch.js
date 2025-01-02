import React, { useState, useEffect } from "react";
import BranchList from "./BranchList";
import AddBranchModal from "./AddBranchModal";
import { useFullScreenHandle } from "react-full-screen";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import {
  AiOutlinePlusCircle,
  AiOutlineDownload,
  AiOutlineUpload,
  AiOutlineFullscreenExit,
  AiOutlineFullscreen,
  AiOutlineSearch,
  AiOutlineFileExcel,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "./ManageBranch.css";

const ManageBranch = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const fullscreenHandle = useFullScreenHandle();

  const navigate = useNavigate();

  useEffect(() => {
    const sampleData = [
      {
        branchCode: "001",
        branchName: "Sample Branch 1",
        branchShortName: "SB1",
        locality: "Downtown",
        city: "New York",
        state: "NY",
        contactPerson: "John Doe",
        contactPersonPhone: "123-456-7890",
        panNo: "ABCDE1234F",
        gstIn: "27ABCDE1234F1Z5",
        status: "Active",
      },
      {
        branchCode: "002",
        branchName: "Sample Branch 2",
        branchShortName: "SB2",
        locality: "Uptown",
        city: "Los Angeles",
        state: "CA",
        contactPerson: "Jane Smith",
        contactPersonPhone: "234-567-8901",
        panNo: "FGHIJ5678K",
        gstIn: "29FGHIJ5678K1Z5",
        status: "Inactive",
      },
      {
        branchCode: "003",
        branchName: "Sample Branch 3",
        branchShortName: "SB3",
        locality: "Midtown",
        city: "Chicago",
        state: "IL",
        contactPerson: "Bob Johnson",
        contactPersonPhone: "345-678-9012",
        panNo: "KLMNO9876P",
        gstIn: "30KLMNO9876P1Z6",
        status: "Active",
      },
    ];

    // Load data from localStorage
    const storedData = localStorage.getItem("submittedData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log("Stored Data from LocalStorage:", parsedData);
      setSubmittedData(parsedData);
    } else {
      console.log("Using Sample Data:", sampleData);
      setSubmittedData(sampleData);
    }
  }, []);

  useEffect(() => {
    console.log("Submitted Data:", submittedData);
  }, [submittedData]);

  // Handle file download
  const handleDownload = () => {
    const csvData = submittedData.map((branch) => Object.values(branch));
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "branch_data.csv");
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const abuf = e.target.result;
        const wb = XLSX.read(abuf, { type: "array" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        setSubmittedData(data);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Handle editing a branch
  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

  // Handle viewing a branch
  const handleView = (branch) => {
    alert(`Viewing branch: ${JSON.stringify(branch)}`);
    navigate(`/branch/${branch.branchCode}`);
  };

  // Handle deleting a branch
  const handleDeleteBranch = (branchCode) => {
    const updatedData = submittedData.filter(
      (branch) => branch.branchCode !== branchCode
    );
    setSubmittedData(updatedData);
  };

  // Handle add branch click
  const handleAddClick = () => {
    setIsModalOpen(true);
    setSelectedBranch(null);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Filter data based on search term
  const filteredData = submittedData.filter((branch) =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    console.log("Filtered Data:", filteredData);
  }, [filteredData]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="manage-branch-container">
      <div className="main-content">
        <h2>Branch</h2>
        <div className="actions">
          <div className="left-actions">
            <button className="add-button" onClick={handleAddClick}>
              <AiOutlinePlusCircle />
            </button>
            <div className="search-container">
              <AiOutlineSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="right-actions">
            <button onClick={handleDownload}>
              <AiOutlineDownload />
            </button>
            <label className="upload-label">
              <AiOutlineUpload />
              <input type="file" hidden onChange={handleFileUpload} />
            </label>
            <label className="upload-excel">
              <AiOutlineFileExcel />
              <input type="file" hidden onChange={handleFileUpload} />
            </label>
            <button
              onClick={
                fullscreenHandle.active
                  ? fullscreenHandle.exit
                  : fullscreenHandle.enter
              }
            >
              {fullscreenHandle.active ? (
                <AiOutlineFullscreenExit />
              ) : (
                <AiOutlineFullscreen />
              )}
            </button>
          </div>
        </div>

        <AddBranchModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={(newBranch) => {
            if (selectedBranch) {
              const updatedData = submittedData.map((branch) =>
                branch.branchCode === selectedBranch.branchCode
                  ? { ...branch, ...newBranch } 
                  : branch
              );
              setSubmittedData(updatedData);
            } else {
              setSubmittedData((prevData) => [...prevData, newBranch]);
            }
            setIsModalOpen(false);
            setSelectedBranch(null);
          }}
          selectedBranch={selectedBranch}
        />

        <BranchList
          branchData={currentItems}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDeleteBranch}
        />

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={index + 1 === currentPage ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageBranch;
