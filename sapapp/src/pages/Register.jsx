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

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {

      await axios.post("/auth/register", inputs)
      navigate("/login")
    }
    catch (err) {
      setError(err.response.data)
    }
  };

  console.log(inputs)
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder='Username' name="username" onChange={handleChange} />
        <input required type="email" placeholder='Email' name="email" onChange={handleChange} />
        <input required type="password" placeholder='Password' name="password" onChange={handleChange} />
        <select required name="subject" placeholder='Subject' onChange={handleChange}>
          <option value="">--Select a subject--</option>
          <option value="Computing">Computing</option>
          <option value="Business">Business</option>
          <option value="Art">Art</option>
          <option value="Human Resources">Human Resources</option>
        </select>
        <input required type="number" placeholder='College start year' name="year" onChange={handleChange} max="2030" min="2020" />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Already have an account ? <Link to="/login">Login Here</Link>
        </span>
      </form>
    </div>
  )
}

export default Register