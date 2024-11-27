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
        // Call storeTask from the base controller
        return $this->storeTask($request);
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
