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
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('tasks/{task}', [TaskController::class, 'updateTask']);
    Route::middleware('custom.cors')->group(function () {
    Route::post('/api/tasks', [TaskController::class, 'store']);
    });
