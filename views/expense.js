const btn = document.getElementById('submit');
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('hello');
    const expense = document.getElementById('typeid')
    const description =document.getElementById('browserid');
    const category= document.getElementById('shashank');
    // console.log(expense.value);
    // console.log(description);
    // console.log(catogery);
    const obj={
                  expense : expense.value,
                  description:description.value,
                  category:category.value
           }
           console.log(obj);
           const token = localStorage.getItem('token')
             axios.post("http://localhost:4000/details",obj,{headers:{"Authorization":token}})
             .then((response)=>{
                showListofRegisteredUser(response.data.data)
                console.log(response.data);
             })
             .catch((err)=>{
                // document.body.innerHTML=document.body.innerHTML+ "<h4>something went wrong </h4>";
                console.log(err)
             })
           localStorage.setItem(obj.description,JSON.stringify(obj))

           //clear fields 
           expense.value='';
           description.value='';
           category.value='';
})
function showListofRegisteredUser(user){
        const parentNode = document.getElementById('userlist');
        const createNewUserHtml = `<li id='${user.id}'>${user.expense} - ${user.description} - ${user.category}
                                        <button onclick=deleteUser('${user.id}')>Delete</button>
                                        <button onclick=EditUser('${user.expense}','${user.description}','${user.category}','${user.id}')>Edit</button>
                                    </li>`
        console.log(createNewUserHtml)
        parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
        console.log(parentNode.innerHTML)
     }
     window.addEventListener('DOMContentLoaded', (e) => {
     

        e.preventDefault();
        const token = localStorage.getItem('token')
            axios.get("http://localhost:4000/userinfo",{headers:{"Authorization":token}})
            .then((response)=>{
                console.log(response)
                if(response.data.user.premiumuser == true)
                {
                    document.getElementById('body').classList.add('premium')
                 document.getElementById('logout').classList.add('premium')
                 document.getElementById('Addbtn').classList.add('premium')
                 document.getElementById('rzp-button1').classList.add('premium')
                 document.body.innerHTML+="<a href='leaderboard.html'>leaderboard</a>" 
                 document.getElementById('rzp-button1').remove()
                 const logout = document.getElementById('logout')
                logout.addEventListener('click',()=>{
                 if(confirm('ARE U SURE'))
                 {
                 window.location = 'login.html'
               }
     })
    
                }
                for(let i=0;i<response.data.response.length;i++){
                    let expense =response.data.response[i].expense
                    let description =response.data.response[i].description
                    let category =response.data.response[i].category
                    let id =response.data.response[i].id

                    const parentNode = document.getElementById('userlist');
        const createNewUserHtml = `<li id='${id}'>${expense} - ${description} - ${category}
                                        <btn1 onclick=deleteUser('${id}')>Delete</btn1>
                                        <btn onclick=EditUser('${expense}','${description}','${category }','${id}')>Edit</btn>
                                    </li>`
        console.log(createNewUserHtml)
        parentNode.innerHTML = parentNode.innerHTML + createNewUserHtml;
       console.log(parentNode.innerHTML)
                   console.log();
                }

                })
               .catch((err)=>{
                console.log(err);
               })
            })


    function deleteUser(userid)
    {
        const token = localStorage.getItem('token')
        axios.delete(`http://localhost:4000/delete/${userid}`,{headers:{"Authorization":token}})

        .then((response)=> 

        removeItemFromScreen(userid))
        //    console.log(response)
        .catch(err=>console.log(err))
    }

    function removeItemFromScreen(userid){
        const parentNode = document.getElementById('userlist');
        const elem = document.getElementById(userid)
        parentNode.removeChild(elem);
    }

    function EditUser(expense,description,category,id)
    {
 document.getElementById('typeid').value = expense
 document.getElementById('browserid').value= description
 document.getElementById('shashank').value= category

 deleteUser(id)
}


const logout = document.getElementById('logout')
 logout.addEventListener('click',()=>{
    if(confirm('ARE U SURE'))
    {
        window.location = 'login.html'
    }
 })
 const leaderboard = document.getElementById('leaderboard')
leaderboard.addEventListener('click',()=>{
    if(confirm('ARE U SURE'))
    {
        window.location = 'leaderboard.html'
    }
 })
 const Report = document.getElementById('Report')
Report.addEventListener('click',()=>{
     if(confirm('ARE U SURE'))
     {
         window.location = 'reports.html'
     }
  })
 

 document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response  = await axios.get('http://localhost:4000/purchase', { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       "email": "test.user@example.com",
       "contact": "9663332873"
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log(response);
         axios.post('http://localhost:4000/updatepurchase',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} }).then(() => {
             alert('You are a Premium User Now')
             console.log("premiummemeber")
             document.getElementById('body').classList.add('premium')
             document.getElementById('logout').classList.add('premium')
             document.getElementById('Addbtn').classList.add('premium')
             document.getElementById('rzp-button1').classList.add('premium')
             document.body.innerHTML+="<a href='leaderboard.html'>leaderboard</a>"
             document.body.innerHTML+="<a href='reports.html'>REPORT</a>"
             document.getElementById('rzp-button1').remove()
             const logout = document.getElementById('logout')
 logout.addEventListener('click',()=>{
    if(confirm('ARE U SURE'))
    {
        window.location = 'login.html'
    }
 })

         })
         .catch((err) => {
            console.log(err)
            //  alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}

