const logincheckservice = async () => {
    try{
        const existingToken = localStorage.getItem('viraamtoken')
        if(!existingToken)
            return ({ status: 500 })
        const result = await fetch('http://localhost:5000/checklogin',{
            method: 'POST',
            headers:{
                Authorization: 'Bearer ' + existingToken
            }
        })
        return result.json()
    }catch(e){
        throw e
    }
}


export { logincheckservice }