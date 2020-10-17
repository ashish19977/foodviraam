const changePasswordService = async (passwords) => {
    try{
        const token = localStorage.getItem('viraamtoken')
        if(!token)
            throw Error('No token in request')
        const result = await fetch(
            'http://localhost:5000/changepassword',
            {
                method: 'POST',
                headers: {
                    authorization : 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passwords)
            }   
        )
        const { data, status } = await result.json()
        if(status !== 200 )
            throw Error(data)
    }catch(e){
        throw e
    }
}

export { changePasswordService }