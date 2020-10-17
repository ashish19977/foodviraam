const logoutService = async ( ) => {
    try{
        const token = localStorage.getItem('viraamtoken')
        if(!token){
            throw Error('No token found so not allowed')
        }   
        const result = await fetch('http://localhost:5000/logout',{
            method: 'POST',
            headers:{
                Authorization: 'Bearer ' + token
            }
        })
        localStorage.removeItem('viraamtoken')
        return result.json()
    }catch(e){
        throw e
    }
}

export { logoutService }