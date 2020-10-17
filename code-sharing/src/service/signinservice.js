const signInService = async data => {
    try{
        const result = await fetch(
            'http://localhost:5000/signin',
            {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        )
        return result.json()
    }catch(e){
        throw e
    }
}

export { signInService }