const apiUrl = "http://127.0.0.1:8000/api"; // The API endpoint

async function fetchTasks() {
  try {
    console.log("Fetching tasks...");
    const response = await fetch(`${apiUrl}/tasks`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Tasks fetched:", data);

    if (data.status === "success") {
      renderTasks(data.data);
    } else {
      alert("Error fetching tasks: Invalid response structure.");
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    alert("Unable to fetch tasks. Please check the API and try again.");
  }
}

// Render tasks to the UI
function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear previous tasks

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
      <div class="task-details">
        <div><strong>Title:</strong> ${task.title}</div>
        <div><strong>Description:</strong> ${task.description}</div>
        <div><strong>Status:</strong> ${
          task.completed ? "Completed" : "Pending"
        }</div>
      </div>
      <div class="task-actions">
        <button class="edit" onclick="editTask(this)">Edit</button>
        <button class="delete" onclick="deleteTask(this)">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Function to add a task (POST method)
async function addTask() {
  const response = await fetch(`${apiUrl}/tasks`);
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  console.log(csrfToken);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  // Validate input fields
  if (title === "" || description === "") {
    alert("All fields are required.");
    return;
  }

  const taskData = { title, description }; // Only send necessary data
  console.log(taskData);
  // const a = fetch(`${apiUrl}/tasks`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(taskData),
  // });
  // console.log(a);
  fetch(`${apiUrl}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "hdkjfbcs", description: "dsfhbsdc" }),
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((task) => {
      displayTask(task); // Display the new task
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
    })
    .catch((error) => console.error("Error adding task:", error));
}

// Function to delete a task (DELETE method)
// function deleteTask(taskId, button) {
//   fetchTasks( ${apiUrl}/${taskId}, { method: 'DELETE' } )
//     .then(() => {
//       const li = button.parentElement.parentElement;
//       li.remove(); // Remove the task from the UI
//     })
//     .catch(error => console.error('Error deleting task:', error));
// }

// Function to edit a task (PUT method)
// function editTask(taskId, button) {
//   const li = button.parentElement.parentElement;
//   const inputField = li.querySelector("input[type='text']");

//   // Toggle between read-only and editable state
//   if (inputField.readOnly) {
//     inputField.readOnly = false;
//     button.textContent = "Save";
//   } else {
//     const updatedTaskText = inputField.value;

//     fetch(${apiUrl}/${taskId}, {
//       method: 'PUT', // or 'PATCH' depending on the backend
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ taskText: updatedTaskText })
//     })
//       .then(response => response.json())
//       .then(updatedTask => {
//         inputField.value = updatedTask.taskText; // Update the task text in UI
//         inputField.readOnly = true;
//         button.textContent = "Edit";
//       })
//       .catch(error => console.error('Error updating task:', error));
//   }
// }

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", fetchTasks);

// Function to toggle light/dark mode
function toggleTheme() {
  const body = document.body;
  const container = document.querySelector(".container");
  const buttons = document.querySelectorAll("button");
  const themeToggle = document.getElementById("themeToggle");

  // Toggle the "dark" class
  body.classList.toggle("dark");
  container.classList.toggle("dark");
  buttons.forEach((button) => button.classList.toggle("dark"));

  // Switch symbols for the theme button
  themeToggle.textContent = body.classList.contains("dark") ? "🌙" : "☀️";
}
