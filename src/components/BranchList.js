import React from "react";
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import "./BranchList.css";

const BranchList = ({
  branchData,
  onEdit,
  onView,
  onDelete,
  contactPersonDetails,
}) => {
  const handleDelete = (branchCode) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      onDelete(branchCode);
    }
  };

  return (
    <div className="branch-list-container">
      <table className="branch-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Branch Name</th>
            <th>Branch Code</th>
            <th>Branch Short Name</th>
            <th>Locality</th>
            <th>City</th>
            <th>State</th>
            <th>Contact Person</th>
            <th>Contact Person Phone</th>
            <th>Pan No</th>
            <th>GSTIN</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {branchData.length > 0 ? (
            branchData.map((branch, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{branch.branchName}</td>
                <td>{branch.branchCode}</td>
                <td>{branch.branchShortName}</td>
                <td>{branch.locality}</td>
                <td>{branch.city}</td>
                <td>{branch.state}</td>
                <td>{branch.contactPersonName || "N/A"}</td>
                <td>{branch.contactNo || "N/A"}</td>
                <td>{branch.panNo}</td>
                <td>{branch.gstIn}</td>
                <td>{branch.status}</td>
                <td>
                  <button
                    onClick={() => onEdit && onEdit(branch)}
                    className="edit-btn"
                  >
                    <AiOutlineEdit className="icon" /> {/* Edit Icon */}
                  </button>
                  <button
                    onClick={() => onView && onView(branch)}
                    className="view-btn"
                  >
                    <AiOutlineEye className="icon" /> {/* View Icon */}
                  </button>
                  <button
                    onClick={() => handleDelete(branch.branchCode)}
                    className="delete-btn"
                  >
                    <AiOutlineDelete className="icon" /> {/* Delete Icon */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13" style={{ textAlign: "center" }}>
                No branches found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BranchList;
