import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const {login} = useContext(AuthContext);


  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    }
    catch (err) {
      if (err.response) {
        setError(err.response.data)
      } else {
        setError(err.message)
      }
    }
  };
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder='Username' name='username' onChange={handleChange} />
        <input required type="password" placeholder='Password' name='password' onChange={handleChange} />
        {err && <p>{err}</p>}
        <button onClick={handleSubmit}>Login</button>
        <span>Don't you have an account ? <Link to="/register">Register Here</Link>
        </span>
      </form>
    </div>
  )
}

export default Login