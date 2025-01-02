import React, { useState, useEffect } from 'react';
import './AddBranchModal.css';

const AddBranchModal = ({ isOpen, onClose, onSubmit, onEdit, onView, branchData, stateMap }) => {
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

  useEffect(() => {
    if (branchData) {
      setBranchDetails(branchData.branchDetails || {});
      setContactDetails(branchData.contactDetails || {});
      setInchargeDetails(branchData.inchargeDetails || {});
      setContactPersonDetails(branchData.contactPersonDetails || {});
      setOpeningDetails(branchData.openingDetails || {});
      setAdvanceRequestDetails(branchData.advanceRequestDetails || {});
      setBankDetails(branchData.bankDetails || {});
    }
  }, [branchData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name in branchDetails) {
      setBranchDetails((prev) => ({ ...prev, [name]: value }));
    } else if (name in contactDetails) {
      setContactDetails((prev) => ({ ...prev, [name]: value }));
    } else if (name in inchargeDetails) {
      setInchargeDetails((prev) => ({ ...prev, [name]: value }));
    } else if (name in contactPersonDetails) {
      setContactPersonDetails((prev) => ({ ...prev, [name]: value }));
    } else if (name in openingDetails) {
      setOpeningDetails((prev) => ({ ...prev, [name]: value }));
    } else if (name in advanceRequestDetails) {
      setAdvanceRequestDetails((prev) => ({ ...prev, [name]: value }));
    } else if (name in bankDetails) {
      setBankDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      console.warn(`Unexpected input name: ${name}`);
    }
  };

  const validateForm = () => {
    if (!branchDetails.branchName || !branchDetails.branchCode) {
      alert('Branch Name and Branch Code are required!');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const newBranch = {
        branchName: branchDetails.branchName,
        branchCode: branchDetails.branchCode,
        branchShortName: branchDetails.branchShortName,
        locality: branchDetails.locality,
        city: branchDetails.city,
        state: branchDetails.state,
        pincode: branchDetails.pincode,
        contactPerson: contactPersonDetails.contactPersonName,
        contactPersonPhone: contactPersonDetails.contactNo,
        panNo: branchDetails.panNo,
        gstIn: branchDetails.gstIn,
      };

      if (branchData) {
        await onEdit(newBranch);
      } else {
        await onSubmit(newBranch);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting branch data:', error);
    }
  };

  const handleView = () => {
    onView(branchData);
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
      <h2>{branchData ? 'Edit Branch' : 'Add Branch'}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="section">
            <h3>Branch Details</h3>
            <div className="input-group">
              <input
                type="text"
                id="branchCode"
                name="branchCode"
                value={branchDetails.branchCode}
                onChange={handleInputChange}
                placeholder="Branch Code *"
              />
              <input
                type="text"
                id="branchName"
                name="branchName"
                value={branchDetails.branchName}
                onChange={handleInputChange}
                placeholder="Branch Name *"
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
                id="contactPersonContactNo"
                name="contactPersonContactNo"
                value={contactPersonDetails.contactNo}
                onChange={handleInputChange}
                placeholder="Contact Person Contact No"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="whatsappNumber"
                name="whatsappNumber"
                value={contactPersonDetails.whatsappNumber}
                onChange={handleInputChange}
                placeholder="Contact Person Whatsapp Number"
              />
              <input
                type="email"
                id="emailId"
                name="emailId"
                value={contactPersonDetails.emailId}
                onChange={handleInputChange}
                placeholder="Contact Person Email"
              />
            </div>
          </div>

          <div className="section">
            <h3>Opening Details</h3>
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
                type="text"
                id="minimumAmount"
                name="minimumAmount"
                value={advanceRequestDetails.minimumAmount}
                onChange={handleInputChange}
                placeholder="Minimum Amount"
              />
              <input
                type="text"
                id="maximumAmount"
                name="maximumAmount"
                value={advanceRequestDetails.maximumAmount}
                onChange={handleInputChange}
                placeholder="Maximum Amount"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                id="monthlyMaximumAmount"
                name="monthlyMaximumAmount"
                value={advanceRequestDetails.monthlyMaximumAmount}
                onChange={handleInputChange}
                placeholder="Monthly Maximum Amount"
              />
              <input
                type="text"
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
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">{branchData ? 'Update' : 'Add'} Branch</button>
            {branchData && (
              <button type="button" onClick={handleView} className="view-btn">View Details</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBranchModal;
