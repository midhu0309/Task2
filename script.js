const API="http://localhost:3000";



function register(){


fetch(API+"/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name:name.value,
email:email.value,
password:password.value

})

})
.then(res=>res.json())
.then(data=>alert(data.message));


}





function login(){


fetch(API+"/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:JSON.stringify({

email:email.value,
password:password.value

})

})
.then(res=>res.json())
.then(data=>{


alert(data.message);


if(data.token){

window.location="dashboard.html";

}


});


}




function addTask(){


fetch(API+"/tasks",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

title:task.value,
status:"Pending"

})


})
.then(()=>loadTasks());


}




function loadTasks(){


fetch(API+"/tasks")

.then(res=>res.json())

.then(data=>{


let html="";


data.forEach(t=>{


html+=`

<div>

<h3>${t.title}</h3>

<p>${t.status}</p>


</div>


`;


});


document.getElementById("tasks").innerHTML=html;


});


}



if(location.pathname.includes("dashboard")){

loadTasks();

}
