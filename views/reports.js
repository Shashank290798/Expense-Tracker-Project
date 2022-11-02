const token = localStorage.getItem('token')

window.addEventListener('DOMContentLoaded',()=>{
    axios.get("http://localhost:4000/getReport", {headers:{"Authorization":token}})
    .then(result=>{

        const dailyExpense = document.getElementById('dailyExpense')
        let container = "";
        for(let i =0;i<result.data.length;i++)
        {
            let category = result.data[i].category;
            let description = result.data[i].description;
            let expense = result.data[i].expense;

            container +=`<div> cateogory--${category}---description${description}---category${expense}--- </div>`


        }
        dailyExpense.innerHTML = container;
    })

        axios.get("http://localhost:4000/getWeeklyReport", {headers:{"Authorization":token}})
        .then(result=>{
            console.log(result)
            const WeeklyExpense = document.getElementById('weeklyExpense')
            let container = "";
            for(let i =0;i<result.data.length;i++)
            {
                let category = result.data[i].category;
                let description = result.data[i].description;
                let expense = result.data[i].expense;

                container +=`<div> cateogory--${category}---description${description}---category${expense}--- </div>`


            }
            WeeklyExpense.innerHTML = container;
    })
    .catch(err =>{
        console.log(err)
    })

})

function download(){
    axios.get('http://localhost:4000/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
    });
}