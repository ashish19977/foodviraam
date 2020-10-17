import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ErrorCompo = props => {
  return(
    <Container className='container'>
      <span className='details'>Page not found ! 404</span>
      <Link to='/'>Sign in</Link>
    </Container>
  )
}

export { ErrorCompo }