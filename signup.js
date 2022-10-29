function signup(event)
{
    event.preventDefault();
    const signupDetails ={
        email: event.target.email.value,
        password:event.target.password.value


    }
    console.log(signupDetails)

}