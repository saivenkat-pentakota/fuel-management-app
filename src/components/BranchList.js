import React from 'react';
import './BranchList.css';

const BranchList = ({ branchData, onEdit, onView }) => {

  if (typeof onEdit !== 'function' || typeof onView !== 'function') {
    console.error("onEdit or onView is not a function");
  }
  return (
    <div className="branch-list-container">
      <h2>Branch List</h2>
      <table>
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
          {branchData.map((branch, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{branch.branchName}</td>
              <td>{branch.branchCode}</td>
              <td>{branch.branchShortName}</td>
              <td>{branch.locality}</td>
              <td>{branch.city}</td>
              <td>{branch.state}</td>
              <td>{branch.contactPerson}</td>
              <td>{branch.contactPersonPhone}</td>
              <td>{branch.panNo}</td>
              <td>{branch.gstIn}</td>
              <td>{branch.status}</td>
              <td>
              <button onClick={() => onEdit && onEdit(branch)}>Edit</button>
              <button onClick={() => onView && onView(branch)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchList;
