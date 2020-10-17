import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { signInService } from '../service'
import { logincheckservice } from '../service'
import { BSAlert } from './alert'

const SignIn = props => {
  const [inputData,setInputData] = useState({})
  const [loading,setLoading] = useState(true)
  const [error, setError] = useState({ message: ''})
  const [,setToken] = useState(false)

  useEffect(()=>{
    checkLogin()
  },[])

  const checkLogin = async() => {
    try{
      const result = await logincheckservice()
      if(result.status === 200){
        props.history.replace({
          pathname: '/homepage',
          state: { data: result.data }
        })
        return
      }
      setLoading(false)
    }catch(e){
      setToken(false)
    }
  }

  const handleSubmit = async e => {  
    setError({ message: '' })  
    e.preventDefault()
    try{
      setLoading(true)
      const { data, status } = await signInService(inputData)
      if(status !== 200){
        setLoading(false)
        setError({ occured: true, message: data })
        return
      }
      setError({ occured: false})
      setLoading(false)
      localStorage.setItem('viraamtoken',data.token)
      props.history.replace({
        pathname: '/homepage',
        state: { data }
      })
    }catch(e){
      setLoading(false)
      setError({occured: true , message: 'Something Went Wrong'})
    }
  }
  if(loading){
    return (<div className='container'> Loading App ... </div>)
  }
  return(
    <Container className='container'>
      <h1 className='h1'>Sign in</h1>
      <Form style={{minWidth:'60%',marginBottom:'10%'}} onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' placeholder="Enter email" required onChange={e=>setInputData({...inputData,email:e.target.value})}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' placeholder="Password" required onChange={e=>setInputData({...inputData,password:e.target.value})}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled = {loading}>
          {loading ? 'Signin in ...' : 'Sign In'}
        </Button>
      </Form>
      { error.occured &&  <BSAlert time={3000} text={error.message} type='danger'/>}
      <Link to ='/signup'> Sign up </Link>
    </Container>
  )
}

export { SignIn }