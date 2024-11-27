<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

// Example API routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Task API routes
Route::apiResource('tasks', TaskController::class);
Route::put('tasks/{task}', [TaskController::class, 'updateTask']);
