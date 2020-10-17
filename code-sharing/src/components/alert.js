import React, { useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react';

const BSAlert = ({ time, type, text }) => {
    const [show,setShow] = useState(true)
    useEffect(()=>{
        setTimeout(()=>setShow(false),time)
    },[])
    return (<Alert style={{display: show ? 'block': 'none' }} variant={type}>{text}</Alert>)
}

export { BSAlert }