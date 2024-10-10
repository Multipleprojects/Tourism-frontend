import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const CompanyDetails = () => {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [companyData, setCompanyData] = useState({
    name: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    companyAddress: '',
    description: '',
    active: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/company/get')
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  const handleUpdateClick = (company) => {
    setSelectedCompanyId(company._id); // Store the selected company ID
    setCompanyData({
      name: company.name,
      companyName: company.companyName,
      email: company.email,
      phoneNumber: company.phoneNumber,
      companyAddress: company.companyAddress,
      description: company.description,
      active: company.active // Set active to the company's active status
    });
    setShowModal(true); // Open modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle active state correctly
    const newValue = name === 'active' ? value === 'true' : value;

    setCompanyData({
      ...companyData,
      [name]: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    axios.put(`http://localhost:8000/api/company/update/${selectedCompanyId}`, companyData, 
)
    .then(response => {
        console.log('Company updated successfully:', response.data);
        setShowModal(false); // Close the modal after update
        return axios.get('http://localhost:8000/api/company/get', {
         
        });
    })
    .then(response => {
        setCompanies(response.data);
    })
    .catch(error => {
        if (error.response) {
            console.error('Error updating company:', error.response.data); // Detailed error message
        } else {
            console.error('Error updating company:', error.message); // General error message
        }
    });
};

  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div>
      <div className="row company-list">
        {companies.slice(0, visibleCount).map(company => (
          <div key={company._id} className="col-md-3">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{company.companyName}</h5>
                <p className="card-text">{company.name}</p>
                <p className="card-text">{company.phoneNumber}</p>
                <p className="card-text">{company.companyAddress}</p>
                <p className="card-text">{company.email}</p>
                <p className="card-text">Active: {company.active.toString()}</p>
                <button 
                  className="btn btn-warning text-white" 
                  style={{ background: 'rgb(250,169,53)' }} 
                  onClick={() => handleUpdateClick(company)}>
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < companies.length && (
        <Button variant="link" onClick={handleShowMore}>More Companies</Button>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input className="form-control input-focus" type="text" name="name"  value={companyData.name} onChange={handleInputChange} />
            </div>
            <div>
              <label>Company Name:</label>
              <input className="form-control input-focus" type="text" name="companyName" value={companyData.companyName} onChange={handleInputChange} />
            </div>
            <div>
              <label>Email:</label>
              <input className="form-control input-focus" type="email" name="email" value={companyData.email} onChange={handleInputChange} />
            </div>
            <div>
              <label>Phone Number:</label>
              <input className="form-control input-focus" type="text" name="phoneNumber" value={companyData.phoneNumber} onChange={handleInputChange} />
            </div>
            <div>
              <label>Company Address:</label>
              <input className="form-control input-focus" type="text" name="companyAddress" value={companyData.companyAddress} onChange={handleInputChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" value={companyData.description} className="form-control input-focus" onChange={handleInputChange}></textarea>
            </div>
            <div>
              <label>Active:</label>
              <select name="active" value={String(companyData.active)} onChange={handleInputChange}>
                <option value="false">False</option>
                <option value="true">True</option>
              </select>
            </div>
            <Button className="btn btn-warning text-white mt-3" style={{background:'rgb(250,169,53)'}} type="submit">Save Changes</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CompanyDetails;
