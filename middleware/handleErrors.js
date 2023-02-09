const handleErrors = (err) =>{
    //err messages, error code e.g 11000: duplicate message
    let errors = { email:"", password:""}
    if (err.code === 11000){
        errors.email = 'Email is already in use';
        return errors;
    } 
    if (err.message=== 'User not registerd yet'){
        errors.email='This email has not been registered';
        return errors;
    }
    if (err.message=== 'Invalid email or password'){
        errors.email='Invalid email or password';
        errors.password= 'Invalid email or password';
        return errors;
    }
    if (err.message.includes ('User validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path]= properties.message;
        });
    }
    return errors;
    }

    module.exports = handleErrors;