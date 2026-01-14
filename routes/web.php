<?php

use App\Http\Controllers\FormController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use Inertia\Inertia;

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
     
    //Role Route
    Route::get('admin/role',[RoleController::class,'index'])->name('role.index');
    Route::get('admin/role/create',[RoleController::class,'create'])->name('role.create');
    Route::post('admin/role',[RoleController::class,'store'])->name('role.store');
    Route::get('admin/role/{id}',[RoleController::class,'show'])->name('role.show');
    Route::get('admin/role/{id}/edit',[RoleController::class,'edit'])->name('role.edit');
    Route::put('admin/role/{id}',[RoleController::class,'update'])->name('role.update');
    Route::delete('admin/role/{id}',[RoleController::class,'destroy'])->name('role.destroy');

    //Permission Route
    Route::get('admin/permission/',[PermissionController::class,'index'])->name('permission.index');
    Route::get('admin/permission/create',[PermissionController::class,'create'])->name('permission.create');
    Route::post('admin/permission',[PermissionController::class,'store'])->name('permission.store');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy'); 
});

// Route::get('/home', [HomeController::class, 'index']);

require __DIR__.'/auth.php';
require __DIR__.'/hotel.php';
require __DIR__.'/staff.php';