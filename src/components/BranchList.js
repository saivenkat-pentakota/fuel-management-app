import React from 'react';

import './BranchList.css';

const BranchList = ({ branchData }) => {
  return (
    <div className="branch-list-container">
      <h2>Branch List</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Branch Name</th>
            <th>Branch Code</th>
            <th>Locality</th>
            <th>City</th>
            <th>State</th>
            {/* ... other columns */}
          </tr>
        </thead>
        <tbody>
          {branchData.map((branch, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{branch.branchName}</td>
              <td>{branch.branchCode}</td>
              <td>{branch.locality}</td>
              <td>{branch.city}</td>
              <td>{branch.state}</td>
              {/* ... other columns */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchList;