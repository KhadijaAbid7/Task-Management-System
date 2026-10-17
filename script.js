const employees = [
    { id: "E101", name: "Ali" },
    { id: "E102", name: "Ayesha" },
    { id: "E103", name: "Zeeshan" },
    { id: "E104", name: "Fatima" },
    { id: "E105", name: "Usman" }
];


const tasks = [
  { id: 1,
     title: "Create Navbar", 
     employee: "E101", 
     priority: "High", 
     deadline: "2026-10-15", 
     dependencies: [],
      status: "Completed" 
    },

  { id: 2,
     title: "Design Dashboard", 
     employee: "E102", 
     priority: "Critical", 
     deadline: "2026-10-20", 
     dependencies: [1], 
     status: "In-progress" 
    },

    {
        id: 3,
        title: "Build Task Form",
        employee: "E103",
        priority: "Medium",
        deadline: "2026-10-10",
        dependencies: [],
        status: "Pending"
    },
    {
        id: 4,
        title: "Create Sidebar",
        employee: "E104",
        priority: "High",
        deadline: "2026-10-18",
        dependencies: [1],
        status: "Pending"
    },
    {
        id: 5,
        title: "Add Employee List",
        employee: "E105",
        priority: "Low",
        deadline: "2026-10-25",
        dependencies: [],
        status: "Pending"
    },
    {
        id: 6,
        title: "Validate Task Data",
        employee: "E101",
        priority: "Critical",
        deadline: "2026-10-12",
        dependencies: [3],
        status: "Pending"
    },
    {
        id: 7,
        title: "Implement Sorting",
        employee: "E102",
        priority: "High",
        deadline: "2026-10-22",
        dependencies: [1],
        status: "In-progress"
    },
    {
        id: 8,
        title: "Check Dependencies",
        employee: "E103",
        priority: "Medium",
        deadline: "2026-10-24",
        dependencies: [6],
        status: "Pending"
    },
    {
        id: 9,
        title: "Workload Report",
        employee: "E104",
        priority: "Low",
        deadline: "2026-10-28",
        dependencies: [],
        status: "Completed"
    },
    {
        id: 10,
        title: "Simulate Execution",
        employee: "E105",
        priority: "Critical",
        deadline: "2026-10-30",
        dependencies: [2],
        status: "Pending"
    },
    {
        id: 11,
        title: "Event History",
        employee: "E101",
        priority: "Medium",
        deadline: "2026-10-26",
        dependencies: [],
        status: "Completed"
    },
    {
        id: 12,
        title: "Test Application",
        employee: "E102",
        priority: "High",
        deadline: "2026-10-31",
        dependencies: [7, 11],
        status: "Pending"
    }
];

// function validateTask(task){

//    if(!task.title){
//      return "Title is required";
//    }

//    if(!employees.some(emp => emp.id === task.employee)){
//         return "Employee does not exist";
//    }

//    if(!["Low","Medium","High","Critical"].includes(task.priority)){
//      return "Invalid Property";
//    }

//    return "Task data is Valid";
// }



function updateDashboard() {

    document.getElementById("total-tasks").textContent =
        tasks.length;

    document.getElementById("pending-tasks").textContent =
        tasks.filter(task => task.status === "Pending").length;

    document.getElementById("in-progress-tasks").textContent =
        tasks.filter(task => task.status === "In-progress").length;

    document.getElementById("completed-tasks").textContent =
        tasks.filter(task => task.status === "Completed").length;

    const today = new Date();

    const todayString =
        today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

    document.getElementById("overdue-tasks").textContent =
        tasks.filter(task =>
            task.status !== "Completed" &&
            task.deadline < todayString
        ).length;
}

updateDashboard();


// -------------------------------------side bar k buttons---------------------------------------------------------

function showPage(pageId) {

    
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    
    document.getElementById(pageId).classList.add("active");

}

//---------------------------------All tasks---------------------------------------------------------------



const tableBody = document.getElementById("tasks-table-body");



function sortTasks() {

    
    const priorityOrder = {
        Critical: 1,
        High: 2,
        Medium: 3,
        Low: 4
    };
    

    
    const now = new Date();

    const today =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    
    return [...tasks].sort((a, b) => {

        
        const priorityDifference =
            priorityOrder[a.priority] - priorityOrder[b.priority];

        if (priorityDifference !== 0) {
            return priorityDifference;
        }

        
        const aOverdue =
            a.status !== "Completed" && a.deadline < today;

        const bOverdue =
            b.status !== "Completed" && b.deadline < today;

        if (aOverdue !== bOverdue) {
            return aOverdue ? -1 : 1;
        }

        const deadlineDifference =
            a.deadline.localeCompare(b.deadline);

        if (deadlineDifference !== 0) {
            return deadlineDifference;
        }

        return String(a.id).localeCompare(
            String(b.id),
            undefined,
            { numeric: true }
        );
    });
}


function renderTasksTable() {

    if (!tableBody) {
        console.error("Tasks table body was not found.");
        return;
    }

    const sortedTasks = sortTasks();

    const now = new Date();

    const today =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    tableBody.innerHTML = sortedTasks.map(task => {

        // Check completed status
        const isCompleted =
            task.status.toLowerCase() === "completed";

        // Check overdue status
        const isOverdue =
            !isCompleted && task.deadline < today;

        // Check blocked status
        const isBlocked =
            !isCompleted &&
            (task.dependencies || []).some(dependencyId => {

                const dependencyTask = tasks.find(item =>
                    String(item.id) === String(dependencyId)
                );

                return !dependencyTask ||
                    dependencyTask.status.toLowerCase() !== "completed";
            });

        // Add CSS classes according to task condition
        const rowClasses = [
            isOverdue ? "overdue-task" : "",
            isBlocked ? "blocked-task" : "",
            isCompleted ? "completed-task" : ""
        ].filter(Boolean).join(" ");

        return `
            <tr class="${rowClasses}">
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td>${task.employee ?? task.employeeId ?? ""}</td>
                <td>${task.priority}</td>
                <td>${task.deadline}</td>
                <td>${task.status}</td>
                <td>
                    ${(task.dependencies || []).length > 0
                        ? task.dependencies.join(", ")
                        : "None"}
                </td>
            </tr>
        `;

    }).join("");
}


renderTasksTable();

// form 

// date validate 




// checking k user jo input kr ra h id aur title ,wo thk h





const createTaskForm = document.getElementById("create-task-form");

createTaskForm.addEventListener("submit", function(event) {
    event.preventDefault();


    // Geting Task ID
    const taskId = document.getElementById("task-id").value.trim();

    
    const isDuplicate = tasks.some(task =>
        String(task.id) === taskId
    );

    if (isDuplicate) {
        alert("This Task ID already exists!");
        return;
    }

    // Geting Task Title
    const taskTitle = document.getElementById("task-title").value.trim();

    //getting other info 
   const employeeId = document.getElementById("task-employee").value;
    const priority = document.getElementById("task-priority").value;
    const deadline = document.getElementById("task-deadline").value;
    const dependencyId = document.getElementById("task-dependencies").value;

    const dependencyIds = dependencyId ? [dependencyId] : [];
    


// jb user task create kry ga tu data yha aye ga

const newTask = {
    id: taskId,
    title: taskTitle,
    employee: employeeId,
    priority: priority,
    deadline: deadline,
    dependencies: dependencyIds,
    status: "Pending"
};
tasks.push(newTask);


renderTasksTable();

console.log("New Task:", newTask);
alert("Task created successfully!");

createTaskForm.reset();

updateDashboard();
}); 