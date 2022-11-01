window.addEventListener('DOMContentLoaded',() =>{
    const token = localStorage.getItem('token')
    axios.get("http://localhost:4000/AllUsers",{ headers: {"Authorization" : token} })
    .then(result =>{
        console.log(result.data.data)
        const leaderboard = document.getElementById('lb');
        for(let i=0;i<result.data.data.length;i++)
        {
            let email = result.data.data[i].email;
            let id = result.data.data[i].id;
            console.log(email);
           leaderboard.innerHTML+= `<div>${email} <button onclick="getExpenses(${id})">Details</button></div>`
        }
    })
    .catch(err =>console.log(err))
})


function getExpenses(id)
{

    axios.get(`http://localhost:4000/AllExpense/${id}`)
    .then(result=>{
        console.log(result)
        let details = document.getElementById('details')
        let container="";
        for(let i=0;i<result.data.data.length;i++)
        {
            let expense = result.data.data[i].expense;
            let description = result.data.data[i].description;
            let category = result.data.data[i].category;
            leaderboard.innerHTML+= `<div> ${email} <button onclick="getExpenses(${id})">Details</button></div>`

        }
        details.innerHTML = container
    })
    .catch(err =>{
        console.log(err)
    })
    console.log(id);
}
