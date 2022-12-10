function getErrors(error: any) {
    let errorArray = [];
    if (error) {
        if (error.errors['name']) {
            console.log(error.errors['name'].message)
            errorArray.push('name');
        }
        if (error.errors['email']) {
            console.log(error.errors['email'].message)
            errorArray.push('email');
        }
        if (error.errors['password']) {
            console.log(error.errors['password'].message)
            errorArray.push('password');
        }
        if (error.errors['confirmPassword']) {
            console.log(error.errors['confirmPassword'].message)
            errorArray.push('confirmPassword');
        }
        if (error.errors['city']) {
            console.log(error.errors['city'].message)
            errorArray.push('city');
        }
        if (error.errors['state']) {
            console.log(error.errors['state'].message)
            errorArray.push('state');
        }
    } else {
        console.log('No Errors Product Saved Succefully')
    }
    return errorArray;
};


export default getErrors;