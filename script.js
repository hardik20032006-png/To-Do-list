let body=document.getElementById("body");
let container=document.getElementById("container");
let creatbtn=document.getElementById("add-task");
let filterbtn=document.querySelector(".apply-filter");
let resetbtn=document.querySelector(".reset");
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];



let taskarr = JSON.parse(localStorage.getItem("tasks")) || [];
//form box logic 

//close form logic
function closeform(){
    inputbox.remove();
    container.style.filter="blur(0px)";
}
creatbtn.addEventListener("click",function(){
    if(document.getElementById("inputbox")){   //remove duplicate form
        return;
    }
    
    container.style.filter="blur(10px)"
    let inputbox=document.createElement("div");
    inputbox.id="inputbox";            //body blur and form-box creates
    body.appendChild(inputbox);

   function chreateform(){
    let heading=document.createElement("h1");
    heading.id="form-heading";       //form-heading
    heading.innerHTML="Add New Task";
    inputbox.appendChild(heading);

    let tasktext=document.createElement("input");
    tasktext.type="text";
    tasktext.id="tasktext";      //task-name
    tasktext.placeholder="Enter Task Name";
    tasktext.maxLength = 50;
    inputbox.appendChild(tasktext);
    //word-limit counter
    let counter = document.createElement("p");
    counter.id="counter"
    counter.innerText = "0/50";
    inputbox.appendChild(counter);
    tasktext.addEventListener("input", function () {
    counter.innerText = tasktext.value.length + "/50";
    if(tasktext.value.length == 50){
        counter.style.color="red";  
    }
    else{
    counter.style.color = "black";
}
});

    let taskdiscription=document.createElement("textarea");
    taskdiscription.type="text";
    taskdiscription.id="taskdiscription";       //task-discription
    taskdiscription.placeholder="Enter Task Discription";
    inputbox.appendChild(taskdiscription);

    // Category Select

    let category=document.createElement("select");
    category.id="category";
// default option
    let defaultoption=document.createElement("option");
    defaultoption.textContent="Category"; 
    defaultoption.disabled=true;
    defaultoption.selected=true;
    category.appendChild(defaultoption);
// Study option
    let study=document.createElement("option");
    study.textContent="Study";
    category.appendChild(study);
// Travel option
    let travel=document.createElement("option");
    travel.textContent="Travel";
    category.appendChild(travel);
// Work option
    let work=document.createElement("option");
    work.textContent="Work";
    category.appendChild(work);
// Family/Friends option
    let family=document.createElement("option");
    family.textContent="Family/Friends";
    category.appendChild(family);
// Other option
    let other=document.createElement("option");
    other.textContent="Other";
    category.appendChild(other);
    inputbox.appendChild(category);

    //prieority section

    let priority=document.createElement("select");
    priority.id="priority";
    //default options
    let defaultpriority=document.createElement("option");
    defaultpriority.textContent="priority";
    defaultpriority.disabled=true;
    defaultpriority.selected=true;
    priority.appendChild(defaultpriority);
    //low option
    let low=document.createElement("option");
    low.textContent="low";
    priority.appendChild(low);
    //medium option
    let medium=document.createElement("option");
    medium.textContent="medium";
    priority.appendChild(medium);
    //high option
    let high=document.createElement("option");
    high.textContent="high";
    priority.appendChild(high);
    //very high option
    let veryhigh=document.createElement("option");
    veryhigh.textContent="very high";
    priority.appendChild(veryhigh);
    inputbox.appendChild(priority);

    let submit=document.createElement("button");
    submit.id="submit";
    submit.innerHTML="Create Task";   //create-task button
    inputbox.appendChild(submit);

    //create-task button logic
    submit.addEventListener("click",function(){
         if(tasktext.value.trim() == ""){
        alert("Task name is required");  //task is requried
        return;
    }
    if(category.selectedIndex === 0){
        alert("Please select a category");  //catogary is required
        return;
    }
    if(priority.selectedIndex === 0){ 
        alert("Please select a priority");   //priority is required
        return;
    }
        //creating actual task-cards
        let taskcard=document.createElement("div");
        taskcard.classList.add("taskcard");             //task-card box
        
        const task={
            title: tasktext.value,
            discription: taskdiscription.value,  //task-object
            category: category.value,
            priority: priority.value,
            status: "pending",
            taskcard: taskcard
        };
        taskarr.push(task);
        //for local storage
        localStorage.setItem(
    "tasks",
    JSON.stringify(
        taskarr.map(task => ({
            title: task.title,
            discription: task.discription,
            category: task.category,
            priority: task.priority,
            status: task.status
        }))
    )
);

        let completcheck=document.createElement("input");
        completcheck.type="checkbox";
        completcheck.classList.add("completcheck");     //checkbox for task
        taskcard.appendChild(completcheck);
        taskcards.appendChild(taskcard);

        //check-complet logic code
       completcheck.addEventListener("click",function(){
             if(completcheck.checked){
                let conformans=confirm("Do you want to mark as complete this task? press ok to conform");
                   if(conformans==true){
                      taskcard.style.backgroundColor="#00fa2150";
                      task.status="complete";
                      localStorage.setItem(
                      "tasks",
                      JSON.stringify(
                      taskarr.map(task => ({
                      title: task.title,
                      discription: task.discription,
                      category: task.category,
                      priority: task.priority,
                       status: task.status
        }))
    )
);
                      completcheck.remove();

                      //creating deleat buttion
                      let deleatimg=document.createElement("img");
                      deleatimg.src="delete.png";
                      deleatimg.id="deleatimg";
                      taskcard.appendChild(deleatimg);

                      deleatimg.addEventListener("click",function(){
                        let conformdel=confirm("Do you want to Delete this task task? press ok to conform");
                        if(conformdel==true){

                      taskcard.remove();

                      taskarr = taskarr.filter(
                      t => t !== task
    );

                      localStorage.setItem(
                        "tasks",
                        JSON.stringify(
                        taskarr.map(task => ({
                        title: task.title,
                        discription: task.discription,
                        category: task.category,
                        priority: task.priority,
                        status: task.status
            }))
        )
    );
}
                      });
                   }
             }  
       });

        //task-box text

       let tasknameLabel = document.createElement("h3");
       tasknameLabel.textContent = "Task name:";
       tasknameLabel.style.fontSize = "25px";
       tasknameLabel.style.fontWeight = "800";
       tasknameLabel.classList.add("tasktext"); 
       let taskname = document.createElement("p");
       taskname.textContent = task.title;     //task-name
       taskname.style.fontSize = "20px";
       taskname.style.fontWeight = "500";
       taskname.classList.add("tasktext");
       taskcard.appendChild(tasknameLabel);
       taskcard.appendChild(taskname);

       let descriptionLabel = document.createElement("h3");
       descriptionLabel.textContent = "Task Description:";
       descriptionLabel.style.fontSize = "25px";
       descriptionLabel.style.fontWeight = "800";
       descriptionLabel.classList.add("tasktext");
       let descriptionText = document.createElement("p");
       descriptionText.textContent = task.discription;     //task-discription
       descriptionText.style.fontSize = "20px";
       descriptionText.style.fontWeight = "500";
       descriptionText.classList.add("tasktext");
       taskcard.appendChild(descriptionLabel);
       taskcard.appendChild(descriptionText);
        
       let categoryLabel = document.createElement("h3");
       categoryLabel.textContent = "Category:";
       categoryLabel.style.fontSize = "25px";
       categoryLabel.style.fontWeight = "800";
       categoryLabel.classList.add("tasktext");
       let categoryText = document.createElement("p");  // task-Category
       categoryText.textContent = task.category;
       categoryText.style.fontSize = "20px";
       categoryText.style.fontWeight = "500";
       categoryText.classList.add("tasktext");
       taskcard.appendChild(categoryLabel);
       taskcard.appendChild(categoryText);

       let priorityLabel = document.createElement("h3");
       priorityLabel.textContent = "Priority:";
       priorityLabel.style.fontSize = "25px";
       priorityLabel.style.fontWeight = "800"; 
       priorityLabel.classList.add("tasktext");        // task-Priority
       let priorityText = document.createElement("p");
       priorityText.textContent = task.priority;
       priorityText.style.fontSize = "20px";
       priorityText.style.fontWeight = "500";
       priorityText.classList.add("tasktext");
       taskcard.appendChild(priorityLabel);
       taskcard.appendChild(priorityText);
        

        closeform();
        alert("Task added");
    })

    let cancelbtn=document.createElement("button");
    cancelbtn.id="cancelbtn";
    cancelbtn.innerHTML="Cancel";   //cancel button
    inputbox.appendChild(cancelbtn);

    //cancel button working logic
    cancelbtn.addEventListener("click",function(){
        closeform();
    })
    }
    chreateform()
})

//filter logic
filterbtn.addEventListener("click", function () {

    let selectedCategory =
        document.getElementById("catogary").value;

    let selectedStatus =
        document.getElementById("status").value;

    let selectedPriority =
        document.getElementById("prieroty").value;

    for(let task of taskarr){

        let show = true;

        if(
            selectedCategory !== "all" &&
            task.category !== selectedCategory
        ){
            show = false;
        }

        if(
            selectedStatus !== "all" &&
            task.status !== selectedStatus
        ){
            show = false;
        }

        if(
            selectedPriority !== "all" &&
            task.priority !== selectedPriority
        ){
            show = false;
        }

        task.taskcard.style.display =
            show ? "block" : "none";
    }
});

//reset button
resetbtn.addEventListener("click", function(){

    document.getElementById("catogary").value = "all";
    document.getElementById("status").value = "all";
    document.getElementById("prieroty").value = "all";

    for(let task of taskarr){
        task.taskcard.style.display = "block";
    }
});


// LOAD TASKS FROM LOCAL STORAGE AFTER REFRESH

for(let task of taskarr){

    let taskcard = document.createElement("div");
    taskcard.classList.add("taskcard");

    task.taskcard = taskcard;

    taskcards.appendChild(taskcard);

    // pending task
  // pending task
if(task.status === "pending"){

    let completcheck=document.createElement("input");
    completcheck.type="checkbox";
    completcheck.classList.add("completcheck");
    taskcard.appendChild(completcheck);

    completcheck.addEventListener("click",function(){

        if(completcheck.checked){

            let conformans=confirm("Do you want to mark as complete this task?");

            if(conformans){

                task.status="complete";
                taskcard.style.backgroundColor="#00fa2150";

                localStorage.setItem(
                    "tasks",
                    JSON.stringify(
                        taskarr.map(task => ({
                            title: task.title,
                            discription: task.discription,
                            category: task.category,
                            priority: task.priority,
                            status: task.status
                        }))
                    )
                );

                completcheck.remove();

                let deleatimg=document.createElement("img");
                deleatimg.src="delete.png";
                deleatimg.id="deleatimg";
                taskcard.appendChild(deleatimg);

                deleatimg.addEventListener("click",function(){

                    let conformdel = confirm(
                        "Do you want to delete this task?"
                    );

                    if(conformdel){

                        taskcard.remove();

                        taskarr = taskarr.filter(
                            t => t !== task
                        );

                        localStorage.setItem(
                            "tasks",
                            JSON.stringify(
                                taskarr.map(task => ({
                                    title: task.title,
                                    discription: task.discription,
                                    category: task.category,
                                    priority: task.priority,
                                    status: task.status
                                }))
                            )
                        );

                    }

                });

            }

        }

    });

}

    // completed task
    if(task.status === "complete"){

        taskcard.style.backgroundColor="#00fa2150";

        let deleatimg=document.createElement("img");
        deleatimg.src="delete.png";
        deleatimg.id="deleatimg";
        taskcard.appendChild(deleatimg);

        deleatimg.addEventListener("click",function(){

            taskcard.remove();

            taskarr = taskarr.filter(
                t => t !== task
            );

            localStorage.setItem(
                "tasks",
                JSON.stringify(
                    taskarr.map(task => ({
                        title: task.title,
                        discription: task.discription,
                        category: task.category,
                        priority: task.priority,
                        status: task.status
                    }))
                )
            );

        });

    }
let tasknameLabel = document.createElement("h3");
tasknameLabel.textContent = "Task name:";
tasknameLabel.style.fontSize = "25px";
tasknameLabel.style.fontWeight = "800";
tasknameLabel.classList.add("tasktext");

let taskname = document.createElement("p");
taskname.textContent = task.title;
taskname.style.fontSize = "20px";
taskname.style.fontWeight = "500";
taskname.classList.add("tasktext");

taskcard.appendChild(tasknameLabel);
taskcard.appendChild(taskname);

let descriptionLabel = document.createElement("h3");
descriptionLabel.textContent = "Task Description:";
descriptionLabel.style.fontSize = "25px";
descriptionLabel.style.fontWeight = "800";
descriptionLabel.classList.add("tasktext");

let descriptionText = document.createElement("p");
descriptionText.textContent = task.discription;
descriptionText.style.fontSize = "20px";
descriptionText.style.fontWeight = "500";
descriptionText.classList.add("tasktext");

taskcard.appendChild(descriptionLabel);
taskcard.appendChild(descriptionText);

let categoryLabel = document.createElement("h3");
categoryLabel.textContent = "Category:";
categoryLabel.style.fontSize = "25px";
categoryLabel.style.fontWeight = "800";
categoryLabel.classList.add("tasktext");

let categoryText = document.createElement("p");
categoryText.textContent = task.category;
categoryText.style.fontSize = "20px";
categoryText.style.fontWeight = "500";
categoryText.classList.add("tasktext");

taskcard.appendChild(categoryLabel);
taskcard.appendChild(categoryText);

let priorityLabel = document.createElement("h3");
priorityLabel.textContent = "Priority:";
priorityLabel.style.fontSize = "25px";
priorityLabel.style.fontWeight = "800";
priorityLabel.classList.add("tasktext");

let priorityText = document.createElement("p");
priorityText.textContent = task.priority;
priorityText.style.fontSize = "20px";
priorityText.style.fontWeight = "500";
priorityText.classList.add("tasktext");

taskcard.appendChild(priorityLabel);
taskcard.appendChild(priorityText);

}