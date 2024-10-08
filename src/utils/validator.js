
const signUpValidation = (data) =>{
    const { firstName,lastName,emailId,password} = data
    if(!firstName||!lastName||!emailId||!password)
        {
        throw new Error('Mandatory fields are missing')
    }
    
}
module.exports = {
    signUpValidation
}