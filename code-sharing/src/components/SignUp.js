import React, { useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { signUpService } from '../service'
import { BSAlert } from './alert'

const SignUp = props => {
  const [inputData,setInputData] = useState({sex:1})
  const [loading,setLoading] = useState(false)
  const [error, setError] = useState({ message: ''})

  const handleSubmit = async e => {  
    setError({ message: '' })  
    e.preventDefault()
    try{
      setLoading(true)
      const { data, status } = await signUpService(inputData)
      if(status !== 200){
        setLoading(false)
        setError({ occured: true, message: data })
        return
      }
      setError({ occured: false, message: 'Congo ! Account Created' })
      setTimeout(()=> { 
        setLoading(false)
        props.history.replace('/')  
      } ,3500)
    }catch(e){
      setLoading(false)
      setError({occured: true , message: 'Something Went Wrong'})
    }
  }
  return(
    <Container className='container'>
      <h1 className='h1'>Sign up</h1>
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
        <Form.Group controlId="formCheckbox">
          <Form.Label style={{marginRight:'20px'}}>Sex </Form.Label>
          <Form.Check defaultChecked name='sex' type="radio" inline label="Male" value={1} onChange={e=>setInputData({...inputData,sex:1})}/>
          <Form.Check name='sex' type="radio" inline label="Female" value={2} onChange={e=>setInputData({...inputData,sex:2})}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled = {loading}>
          {loading ? 'Signin up ...' : 'Sign Up'}
        </Button>
      </Form>
      { error.occured === false &&  <BSAlert time={3000} text={error.message} type='success'/>}
      { error.occured &&  <BSAlert time={3000} text={error.message} type='danger'/>}
      <Link to ='/'> Sign in </Link>
    </Container>
  )
}

export { SignUp }