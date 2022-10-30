
function login(event)
{
    event.preventDefault();
    const loginDetails ={
        email: event.target.email.value,
        password:event.target.password.value


    }
    console.log(loginDetails) ;

    axios.post("http://localhost:3000/login",loginDetails)
    .then(result =>{
      console.log(result)
      alert('successfully logged in')
  
    })
    .catch(err =>{
        console.log(err)
    })

    event.target.email.value="";
    event.target.password.value=""

}