var notImportantIcon = "fa-regular fa-bookmark";
var importantIcon = "fa-solid fa-bookmark";
var isImportant = false;


function toggleImportant(){
    if(isImportant){
        //change to not important
        isImportant = false;
        $("#formIcon")
            .removeClass(importantIcon)
            .addClass(notImportantIcon);

    }
    else{
        //change it to important
        isImportant = true;
        $("#formIcon")
        .removeClass(notImportantIcon)
        .addClass(importantIcon);
    }
    }

function toggleView() {
    if(isVisible) {
        isVisible = false;
        $("#form").hide();
    }
    else {
        isVisible = true;
        $("#form").show();
    }
}


function saveTask(){
    let title = $("#txtTitle").val();
    let desc = $("#txtDesc").val(); 
    let dueDate = $("#dueDate").val();
    let category = $("#selCategory").val();
    let priority = $("#selPriority").val();
    let color= $("#selColor").val();

    console.log(isImportant, title, desc, dueDate, category, priority, color);

    let task = new Task(isImportant, title, desc, dueDate, category, priority, color);
    console.log(task);

    //ajax logic
    //try to POST the response to the server
    //the server name is "http://fsdiapi.azurewebsites.net/api/task/",

    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        data: JSON.stringify(task),
        contentType: "application/json",
           
        success: function(res) {
            console.log(res);
            displayTask(task);
        
        },
        error: function (error) {
            console.log(error);

            alert("Unexpected error");
            
        }

        })
    };


    


function displayTask(task){

    let icon = "";
    if(task.isImportant) {
        icon = `<i class='${importantIcon}'></i>`;
    }
    else {
        icon = `<i class='${notImportantIcon}'></i>`;
    }
    

    let syntax = `<div class='task' style="border: 2px solid ${task.color}">

        ${icon}

        <div class='info'>
            <h5>${task.title}</h5>
            <p>${task.description}</p>
    </div>

    <label class='dueDate'>${task.dueDate}</label>

    <div class='details'>
             <label>${task.category}</label>
            <label>${task.priority}</label>
        </div>  
    </div>`;

   
    $("#pending-tasks").append(syntax);
}

// fetch
function testRequest(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/",
        success: function (response){
            console.log(response);

        },
        error: function (error){
            console.log(error);

        }
    });
}

function loadTasks(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",

        success: function(res) {
            let data = JSON.parse(res);
            console.log(res);
            console.log(data);

            
        
        },
        error: function (error) {
            console.log(error);
            alert("Unexpected error");
            
        }

    })
};





function init(){
    console.log("Task Manager");



    //hook events
    $("#formIcon").click(toggleImportant);
    $("#toggleView").click(toggleView);
    $("#btnSave").click(saveTask);

    //load data
    loadTasks();
}


window.onload = init;