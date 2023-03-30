import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    subject: "",
    year: ""
  })

  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(inputs);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      await axios.post('https://sap-project-api.herokuapp.com/api/auth/register', inputs);
      navigate('/login');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  console.log(inputs)

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (!values.subject) {
      errors.subject = 'Subject is required';
    }
    if (!values.year) {
      errors.year = 'College start year is required';
    } else if (values.year < 2020 || values.year > 2030) {
      errors.year = 'College start year must be between 2020 and 2030';
    }
    return errors;
  };

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder='Username' name="username" onChange={handleChange} />
        {errors.username && <p>{errors.username}</p>}
        <input required type="email" placeholder='Email' name="email" onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
        <input required type="password" placeholder='Password' name="password" onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
        <select required name="subject" placeholder='Subject' onChange={handleChange}>
          <option value="">--Select a subject--</option>
          <option value="Computing">Computing</option>
          <option value="Business">Business</option>
          <option value="Art">Art</option>
          <option value="Human Resources">Human Resources</option>
        </select>
        {errors.subject && <p>{errors.subject}</p>}
        <input required type="number" placeholder='College start year' name="year" onChange={handleChange} max="2030" min="2020" />
        {errors.year && <p>{errors.year}</p>}
        <button onClick={handleSubmit}>Register</button>
        {errors.general && <p>{errors.general}</p>}
        <span>Already have an account ? <Link to="/login">Login Here</Link>
        </span>
      </form>
    </div>
  )
}

export default Register