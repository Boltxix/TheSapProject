import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'


const Student = () => {

  const [isFormVisible, setIsFormVisible] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      id: currentUser.id,
      role: currentUser.role,
      username: newUsername,
      email: newEmail,
      subject: currentUser.subject,
      year: currentUser.year
    };
    axios.put(`https://sap-project-api.herokuapp.com/api/student/student/${currentUser.id}`, updatedUser)
      .then(response => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Profile updated successfully!');
        window.location.href = '/';
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (!currentUser) {
    return <div className='Error'>Please log in to view this page</div>;
  }

  return (
    <div className="student">
      <div className="container">
        <h1>Welcome, {currentUser.username}!</h1>
        <p>Below you can find your information</p>
        <div className="display">
          <h4>Name</h4>
          <span>{currentUser?.username}</span>
          <h4>Email</h4>
          <span>{currentUser?.email}</span>
          <h4>Subject</h4>
          <span>{currentUser?.subject}</span>
          <h4>Year</h4>
          <span>{currentUser?.year}</span>
        </div>
        <p>Edit your information using the form below</p>
        <div>
          <button className='toggleForm' onClick={() => setIsFormVisible(!isFormVisible)}>Toggle form</button>
          {isFormVisible && (
            <form className='form' onSubmit={handleSubmit}>
              <label htmlFor='username'>New username:</label>
              <input type='text' id='username' value={newUsername} onChange={handleUsernameChange} />
              <br />
              <label htmlFor='email'>New email:</label>
              <input type='email' id='email' value={newEmail} onChange={handleEmailChange} />
              <br />
              <button type='submit'>Save changes</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Student