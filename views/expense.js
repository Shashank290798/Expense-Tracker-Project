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
             axios.post("http://localhost:4000/details",obj)
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
            axios.get("http://localhost:4000/userinfo")
            .then((response)=>{
                console.log(response)
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

        axios.delete(`http://localhost:4000/delete/${userid}`)

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