const apiUrl = 'http://localhost:KUNHAALNEHO/tasks';  // The API endpoint

// Function to fetch tasks from the server (GET method)
function fetchTasks() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = ''; // Clear the list before displaying
      tasks.forEach(task => {
        displayTask(task); // Display each task
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
}

// Function to display a single task on the page
function displayTask(task) {
  const taskList = document.getElementById("taskList");

  const li = document.createElement("li");
  li.id = task.id;  // Use task ID to associate with the backend task
  li.innerHTML = `
    <div class="task-details">
      <div>
        <strong>Name:</strong> ${task.name}
      </div>
      <div>
        <strong>Email:</strong> ${task.email}
      </div>
      <div>
        <strong>Task:</strong> <input type="text" value="${task.taskText}" readonly />
      </div>
    </div>
    <div class="task-actions">
      <button class="edit" onclick="editTask(${task.id}, this)">Edit</button>
      <button class="delete" onclick="deleteTask(${task.id}, this)">Delete</button>
    </div>
  `;

  taskList.appendChild(li);
}

// Function to add a task (POST method)
function addTask() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  // Email regex pattern for basic validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Validate input fields
  if (name === "" || email === "" || taskText === "") {
    alert("All fields are required.");
    return;
  }

  // Validate email format
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const taskData = { name, email, taskText }; //backend ko anusar change garnu parrxa

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  })
    .then(response => response.json())
    .then(task => {
      displayTask(task); // Display the new task
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      taskInput.value = "";
    })
    .catch(error => console.error('Error adding task:', error));
}

// Function to delete a task (DELETE method)
function deleteTask(taskId, button) {
  fetch(`${apiUrl}/${taskId}`, { method: 'DELETE' })
    .then(() => {
      const li = button.parentElement.parentElement;
      li.remove(); // Remove the task from the UI
    })
    .catch(error => console.error('Error deleting task:', error));
}

// Function to edit a task (PUT method)
function editTask(taskId, button) {
  const li = button.parentElement.parentElement;
  const inputField = li.querySelector("input[type='text']");

  // Toggle between read-only and editable state
  if (inputField.readOnly) {
    inputField.readOnly = false;
    button.textContent = "Save";
  } else {
    const updatedTaskText = inputField.value;

    fetch(`${apiUrl}/${taskId}`, {
      method: 'PUT', // or 'PATCH' depending on the backend
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskText: updatedTaskText })
    })
      .then(response => response.json())
      .then(updatedTask => {
        inputField.value = updatedTask.taskText; // Update the task text in UI
        inputField.readOnly = true;
        button.textContent = "Edit";
      })
      .catch(error => console.error('Error updating task:', error));
  }
}

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', fetchTasks);

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
