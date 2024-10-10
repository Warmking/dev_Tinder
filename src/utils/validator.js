
const signUpValidation = (data) =>{
    const { firstName,lastName,emailId,password} = data
    if(!firstName||!lastName||!emailId||!password)
        {
        throw new Error('Mandatory fields are missing')
    }
}
const validateProfileEdit = (data)=>{
    const allowedEditFields = ['gender','about','skills','age','photoUrl']
    const isDataValid = Object.keys(data).every(field=>allowedEditFields.includes(field))
    return isDataValid
}

module.exports = {
    signUpValidation,validateProfileEdit
}