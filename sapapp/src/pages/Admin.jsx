import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useState, useEffect } from 'react'
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);



  useEffect(() => {
    axios.get('https://sap-project-api.herokuapp.com/api/admin/students ')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!currentUser || currentUser.role !== "admin") {
    return <div className='error'>You are not authorised to access this page </div>
  }

  const handleEdit = (id) => {
    const newName = prompt('Enter new name:');
    const newEmail = prompt('Enter new email:');
    const newSubject = prompt('Enter new subject:');
    const newYear = prompt('Enter new year:');
    
    axios.put(`https://sap-project-api.herokuapp.com/api/admin/students/${id}`, { username: newName, email: newEmail, subject: newSubject, year: newYear })
      .then(response => {
        setUsers(users.map(user => {
          if (user.id === id) {
            return { ...user, username: newName, email: newEmail, subject: newSubject, year: newYear };
          } else {
            return user;
          }
        }));
        alert('User updated successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('Error updating user!');
      });
  }

  const handleDelete = (id) => {
    axios.delete(`https://sap-project-api.herokuapp.com/api/admin/students/${id}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== id));
        alert('User Deleted successfully!');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (

    <div className="admin">
      <div className="container">
        <h1>Welcome to the Admin Dashboard !</h1>
        <p>Below you can find a list of all students in the database</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Year</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.subject}</td>
                <td>{user.year}</td>
                <td><button className="btn" onClick={() => handleEdit(user.id)}>Edit</button></td>
                <td><button className="btn" onClick={() => handleDelete(user.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default Admin