import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { changePasswordService, logincheckservice, logoutService } from '../service'
import { BSAlert } from './alert'

const authErrors = [ 'No taken found', 'invalid token', 'No token in request' ]

const HomePage = ({ location, history }) => {
  const [password,setPassword] = useState({})
  const [loading,setLoading] = useState(false)
  const [modal,setModal] = useState(false)
  const [error, setError] = useState({occured: false , message: ''})
  const [ passConfig, setPassConfig ] = useState({})
  let { data }  = location.state 
  
  useEffect(()=>{
    if(!data){
      fetchInitalData()
    }
  },[])

  const fetchInitalData = async() => {
    setLoading(true)
    try{
      const result = await logincheckservice()
      if(result.status === 200){
        data = result.data
        return
      }
      setLoading(false)
      setError({ occured: false , message: '' })
    }catch(e){
      setLoading(false)
      setError({ occured: true , message: 'Something Went Wrong' })
    }
  }

  const handleChangePassword = async () => {
    if(!password.oldPassword || !password.newPassword)
      return
    setPassConfig({ loading: true })
    try{
      await changePasswordService(password)
      setPassConfig({ loading: false, error: false })
    }catch(e){
      handleUnAuth(e.message)
      setPassConfig({ loading: false, error: true, message: e.message })
    }
  }
  const handleUnAuth =  error => {
    if(authErrors.some( ele => ele === error)){
      localStorage.removeItem('viraamtoken')
      history.replace('/')
    }
  }
  const logout = async () => {
    setError({ occured: false, message: '' })
    try{
      await logoutService()
      history.replace('/')
    }catch(e){
      handleUnAuth(e.message)
      setError({occured:true, message: e.message || 'Something went wrong'})
    }
  }
  if(loading && error.occured === false ){
    return ( <Container className='container'>Loading App ...</Container> )
  }
  if(!loading && error.occured === true ){
    return ( <Container className='container'>Something Went Wrong ...</Container> )
  }
  return(
    <Container className='container'>
      
      <Modal show={modal} onHide={()=>setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Password Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" placeholder="Enter old password" required autoFocus 
                onChange={e=>setPassword({ ...password, oldPassword: e.target.value })}
                style = {{ marginBottom: '10px' }}
              />
              <Form.Control type="password" placeholder="Enter new password" required
                onChange={e=>setPassword({ ...password, newPassword: e.target.value })}
                style = {{ marginBottom: '10px' }}
              />
              { (passConfig.error === true && !passConfig.loading) && <BSAlert type='danger' text={ passConfig.message || 'Error' } time={1500}/>}
              { (passConfig.error === false && !passConfig.loading) && <BSAlert type='success' text={ error.message || 'Success' } time={1500}/>}             
            </Form.Group>
          </Form>        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick = { handleChangePassword }>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>

      <span className='details'> { data.email } </span>
      <span className='details'>{ data.sex == 1 ? 'Male' : 'Female'  }</span>
      <Button variant='secondary' onClick={()=>setModal(true)}> Change password </Button>
      <Button variant='primary' onClick={logout} style={{margin: '20px 0px 20px 0px'}}> Logout </Button>
      { error.occured && <BSAlert type='danger' text={ error.message } time={1500}/> }
    </Container>
  )
}

export { HomePage }