<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Listing all tasks
    public function index()
    {
        $tasks = Task::all();
        return response()->json(['status' => 'success', 'data' => $tasks], 200);
    }

    // Creating new tasks
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        // Create the task in the database
        $task = Task::create($validatedData);

        // Return the created task as a JSON response
        return response()->json($task, 201);
    }

    // Update a task
    public function update(Request $request, Task $task)
    {
        return $this->updateTask($request, $task);
    }

    // Delete a task
    public function destroy(Task $task)
    {
        return $this->destroyTask($task);
    }
}
