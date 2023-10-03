module.exports ={ validateRegisterInput : ( username , email , password, confirmedPassword ) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if(email.trim() === ''){
        errors.email = 'Email must not be empty';
    } else {
        const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password === '') {
        errors.password = 'Password must not be empty';
    }else if(password !== confirmPassword){
        errors.confirmPassword = 'Password must not be empty';
    }
    return {
        errors,
        valid : Object.keys(errors).length <1
    }
},
validateLoginInput : (email , password) => {
    const errors = {};
    if(email.trim() === ''){
        errors.email = 'Email must not be empty';
    } else {
        const regEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address';
        }
    }
    if(password === '') {
        errors.password = 'Password must not be empty';
    }
    return {
        errors,
        valid : Object.keys(errors).length <1
    }
}
}