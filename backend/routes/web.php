<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\TaskController;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Controllers\Auth\AuthenticatedSessionController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/login', [AuthenticatedSessionController::class, 'create'])-> name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::get('/script.js', [ExampleController::class, 'index']);
});

Route::post('/register', [RegisterController::class, 'register'])->middleware('send.welcome.email');


Route::get('tasks', [TaskController::class, 'index']);
Route::post('tasks', [TaskController::class, 'store']);
Route::put('tasks/{id}', [TaskController::class, 'update']);
Route::delete('tasks/{id}', [TaskController::class, 'destroy']);
require __DIR__.'/auth.php';
