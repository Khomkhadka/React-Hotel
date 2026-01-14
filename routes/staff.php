<?php

use App\Http\Controllers\FormController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Middleware\EnsureHotelAuth;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/hotel/staff/dashboard', function () {
    return Inertia::render('Staff/Dashboard');
})->middleware(['auth:staffs'])->name('staff_dashboard');

Route::middleware('auth')->group(function () {
     
});

// Route::get('/home', [HomeController::class, 'index']);

