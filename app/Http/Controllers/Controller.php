<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

abstract class Controller
{
    // Listing all tasks
    public function index()
    {
        $tasks = Task::all();
        return response()->json(['status' => 'success', 'data' => $tasks], 200);
    }

    // Creating new tasks
    public function storeTask(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = Task::create($validated);

        return response()->json(['status' => 'success', 'data' => $task], 201);
    }

    // Update a task
    public function updateTask(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'completed' => 'sometimes|boolean',
        ]);

        $task->update($validated);

        return response()->json(['status' => 'success', 'data' => $task], 200);
    }

    // Delete a task
    public function destroyTask(Task $task)
    {
        $task->delete();

        return response()->json(['status' => 'success', 'message' => 'Task deleted successfully'], 200);
    }
}
