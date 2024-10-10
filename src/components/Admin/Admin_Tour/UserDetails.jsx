import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    profileimage: '',
    active: true // default value
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/get')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUpdateClick = (user) => {
    setSelectedUserId(user._id);
    setUserData({
      name: user.name,
      email: user.email,
      password: '', // clear password for security
      phone: user.phone,
      profileimage: user.profileimage,
      active: user.active
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: name === 'active' ? value === 'true' : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`http://localhost:8000/api/user/update/${selectedUserId}`, userData)
      .then(response => {
        console.log('User updated successfully:', response.data);
        setShowModal(false);
        return axios.get('http://localhost:8000/api/user/get');
      })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div>
      <div className="row user-list">
        {users.slice(0, visibleCount).map(user => (
          <div key={user._id} className="col-md-3">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <p className="card-text">{user.phone}</p>
                <p className="card-text">Active: {user.active.toString()}</p>
                <button 
                  className="btn btn-warning text-white" 
                  style={{ background: 'rgb(250,169,53)' }} 
                  onClick={() => handleUpdateClick(user)}>
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < users.length && (
        <Button variant="link" onClick={handleShowMore}>More Users</Button>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input className="form-control input-focus" type="text" name="name" value={userData.name} onChange={handleInputChange} />
            </div>
            <div>
              <label>Email:</label>
              <input className="form-control input-focus" type="email" name="email" value={userData.email} onChange={handleInputChange} />
            </div>
            <div>
              <label>Phone Number:</label>
              <input className="form-control input-focus" type="text" name="phone" value={userData.phone} onChange={handleInputChange} />
            </div>
            <div>
              <label>Active:</label>
              <select name="active" value={String(userData.active)} onChange={handleInputChange}>
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

export default UserDetails;
