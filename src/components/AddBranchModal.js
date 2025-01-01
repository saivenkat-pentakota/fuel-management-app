import React, { useState } from 'react';
import './AddBranchModal.css';

const AddBranchModal = ({ isOpen, onClose, onSubmit }) => {
  const [branchDetails, setBranchDetails] = useState({
    branchCode: '',
    branchName: '',
    branchShortName: '',
    houseNo: '',
    street: '',
    pincode: '',
    locality: '',
    state: '',
    city: '',
    panNo: '',
    gstIn: '',
    branch: '',
    vehicleType: '',
  });

  const [contactDetails, setContactDetails] = useState({
    contactNo: '',
    alternateContactNo: '',
    whatsappNumber: '',
    emailId: '',
  });

  const [inchargeDetails, setInchargeDetails] = useState({
    branchInchargeName: '',
    contactNo: '',
    alternateContactNo: '',
    whatsappNumber: '',
    emailId: '',
  });

  const [contactPersonDetails, setContactPersonDetails] = useState({
    contactPersonName: '',
    contactNo: '',
    alternateContactNo: '',
    whatsappNumber: '',
    emailId: '',
  });

  const [openingDetails, setOpeningDetails] = useState({
    openingBalance: '',
    openingDate: '',
  });

  const [advanceRequestDetails, setAdvanceRequestDetails] = useState({
    minimumAmount: '',
    maximumAmount: '',
    monthlyMaximumAmount: '',
    maximumUnsettledAmount: '',
    effectiveDate: '',
  });

  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    accountHolderName: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name in branchDetails) {
      setBranchDetails({ ...branchDetails, [name]: value });
    } else if (name in contactDetails) {
      setContactDetails({ ...contactDetails, [name]: value });
    } else if (name in inchargeDetails) {
      setInchargeDetails({ ...inchargeDetails, [name]: value });
    } else if (name in contactPersonDetails) {
      setContactPersonDetails({ ...contactPersonDetails, [name]: value });
    } else if (name in openingDetails) {
      setOpeningDetails({ ...openingDetails, [name]: value });
    } else if (name in advanceRequestDetails) {
      setAdvanceRequestDetails({ ...advanceRequestDetails, [name]: value });
    } else if (name in bankDetails) {
      setBankDetails({ ...bankDetails, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBranch = {
      branchName: branchDetails.branchName,
      branchCode: branchDetails.branchCode,
      street: branchDetails.street,
      city: branchDetails.city,
      pincode: branchDetails.pincode,
      state: branchDetails.state,
      panNo: branchDetails.panNo,
      vehicleType: branchDetails.vehicleType,
    };
    onSubmit(newBranch);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Add Branch</h2>
        <form onSubmit={handleSubmit}>
          <div className="section">
            <h3>Branch Details</h3>
            <div className="input-group">
              <input
                type="text"
                id="branchCode"
                name="branchCode"
                value={branchDetails.branchCode}
                onChange={handleInputChange}
                placeholder="Branch Code"
              />
              <input
                type="text"
                id="branchName"
                name="branchName"
                value={branchDetails.branchName}
                onChange={handleInputChange}
                placeholder="Branch Name"
              />
              <input
                type="text"
                id="branchShortName"
                name="branchShortName"
                value={branchDetails.branchShortName}
                onChange={handleInputChange}
                placeholder="Branch Short Name"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="houseNo"
                name="houseNo"
                value={branchDetails.houseNo}
                onChange={handleInputChange}
                placeholder="House No"
              />
              <input
                type="text"
                id="street"
                name="street"
                value={branchDetails.street}
                onChange={handleInputChange}
                placeholder="Street"
              />
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={branchDetails.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="locality"
                name="locality"
                value={branchDetails.locality}
                onChange={handleInputChange}
                placeholder="Locality"
              />
              <input
                type="text"
                id="state"
                name="state"
                value={branchDetails.state}
                onChange={handleInputChange}
                placeholder="State"
              />
              <input
                type="text"
                id="city"
                name="city"
                value={branchDetails.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="panNo"
                name="panNo"
                value={branchDetails.panNo}
                onChange={handleInputChange}
                placeholder="PAN No"
              />
              <input
                type="text"
                id="gstIn"
                name="gstIn"
                value={branchDetails.gstIn}
                onChange={handleInputChange}
                placeholder="GST In"
              />
              <input
                type="text"
                id="branch"
                name="branch"
                value={branchDetails.branch}
                onChange={handleInputChange}
                placeholder="Branch"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="vehicleType"
                name="vehicleType"
                value={branchDetails.vehicleType}
                onChange={handleInputChange}
                placeholder="Vehicle Type"
              />
            </div>
          </div>

          <div className="section">
            <h3>Contact Details</h3>
            <div className="input-group">
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={contactDetails.contactNo}
                onChange={handleInputChange}
                placeholder="Contact No"
              />
              <input
                type="text"
                id="alternateContactNo"
                name="alternateContactNo"
                value={contactDetails.alternateContactNo}
                onChange={handleInputChange}
                placeholder="Alternate Contact No"
              />
              <input
                type="text"
                id="whatsappNumber"
                name="whatsappNumber"
                value={contactDetails.whatsappNumber}
                onChange={handleInputChange}
                placeholder="Whatsapp Number"
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={contactDetails.emailId}
                onChange={handleInputChange}
                placeholder="Email ID"
              />
            </div>
          </div>

          <div className="section">
            <h3>Incharge Details</h3>
            <div className="input-group">
              <input
                type="text"
                id="branchInchargeName"
                name="branchInchargeName"
                value={inchargeDetails.branchInchargeName}
                onChange={handleInputChange}
                placeholder="Incharge Name"
              />
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={inchargeDetails.contactNo}
                onChange={handleInputChange}
                placeholder="Incharge Contact No"
              />
              <input
                type="text"
                id="whatsappNumber"
                name="whatsappNumber"
                value={inchargeDetails.whatsappNumber}
                onChange={handleInputChange}
                placeholder="Incharge Whatsapp Number"
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={inchargeDetails.emailId}
                onChange={handleInputChange}
                placeholder="Incharge Email"
              />
            </div>
          </div>

          <div className="section">
            <h3>Contact Person Details</h3>
            <div className="input-group">
              <input
                type="text"
                id="contactPersonName"
                name="contactPersonName"
                value={contactPersonDetails.contactPersonName}
                onChange={handleInputChange}
                placeholder="Contact Person Name"
              />
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={contactPersonDetails.contactNo}
                onChange={handleInputChange}
                placeholder="Contact Person No"
              />
              <input
                type="text"
                id="whatsappNumber"
                name="whatsappNumber"
                value={contactPersonDetails.whatsappNumber}
                onChange={handleInputChange}
                placeholder="Whatsapp Number"
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={contactPersonDetails.emailId}
                onChange={handleInputChange}
                placeholder="Email ID"
              />
            </div>
          </div>

          <div className="section">
            <h3>Opening Balance Details</h3>
            <div className="input-group">
              <input
                type="text"
                id="openingBalance"
                name="openingBalance"
                value={openingDetails.openingBalance}
                onChange={handleInputChange}
                placeholder="Opening Balance"
              />
              <input
                type="date"
                id="openingDate"
                name="openingDate"
                value={openingDetails.openingDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="section">
            <h3>Advance Request Details</h3>
            <div className="input-group">
              <input
                type="number"
                id="minimumAmount"
                name="minimumAmount"
                value={advanceRequestDetails.minimumAmount}
                onChange={handleInputChange}
                placeholder="Minimum Amount"
              />
              <input
                type="number"
                id="maximumAmount"
                name="maximumAmount"
                value={advanceRequestDetails.maximumAmount}
                onChange={handleInputChange}
                placeholder="Maximum Amount"
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                id="monthlyMaximumAmount"
                name="monthlyMaximumAmount"
                value={advanceRequestDetails.monthlyMaximumAmount}
                onChange={handleInputChange}
                placeholder="Monthly Maximum Amount"
              />
              <input
                type="number"
                id="maximumUnsettledAmount"
                name="maximumUnsettledAmount"
                value={advanceRequestDetails.maximumUnsettledAmount}
                onChange={handleInputChange}
                placeholder="Maximum Unsettled Amount"
              />
            </div>
            <div className="input-group">
              <input
                type="date"
                id="effectiveDate"
                name="effectiveDate"
                value={advanceRequestDetails.effectiveDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="section">
            <h3>Bank Details</h3>
            <div className="input-group">
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleInputChange}
                placeholder="Account Number"
              />
              <input
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                value={bankDetails.accountHolderName}
                onChange={handleInputChange}
                placeholder="Account Holder Name"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={bankDetails.ifscCode}
                onChange={handleInputChange}
                placeholder="IFSC Code"
              />
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={bankDetails.bankName}
                onChange={handleInputChange}
                placeholder="Bank Name"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="branchName"
                name="branchName"
                value={bankDetails.branchName}
                onChange={handleInputChange}
                placeholder="Branch Name"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit">Add Branch</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBranchModal;
