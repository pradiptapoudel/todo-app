// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  
  // Function to add a task
  function addTask() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
  
    // Validate name field
    if (name === "") {
      alert("Please enter your name.");
      return;
    }
  
    // Validate email field
    if (email === "") {
      alert("Please enter your email.");
      return;
    } else if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Validate task field
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }
  
    const taskList = document.getElementById("taskList");
  
    // Create a new task element with name, email, and task
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="task-details">
        <div>
          <strong>Name:</strong> ${name}
        </div>
        <div>
          <strong>Email:</strong> ${email}
        </div>
        <div>
          <strong>Task:</strong> <input type="text" value="${taskText}" readonly />
        </div>
      </div>
      <div class="task-actions">
        <button class="edit" onclick="editTask(this)">Edit</button>
        <button class="delete" onclick="deleteTask(this)">Delete</button>
      </div>
    `;
  
    taskList.appendChild(li);
  
    // Clear the input fields after adding the task
    nameInput.value = "";
    emailInput.value = "";
    taskInput.value = "";
  }
  
  // Function to delete a task
  function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
  }
  
  // Function to edit a task
  function editTask(button) {
    const li = button.parentElement.parentElement;
    const inputField = li.querySelector("input[type='text']");
  
    // If the task is read-only, change to editable
    if (inputField.readOnly) {
      inputField.readOnly = false;
      button.textContent = "Save";
    } else {
      inputField.readOnly = true;
      button.textContent = "Edit";
    }
  }
  
  // Function to toggle dark/dark mode
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
  