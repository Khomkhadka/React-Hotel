<?php

use App\Http\Controllers\FormController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware('auth')->group(function () {

    Route::get('/admin/dashboard', [UserController::class,'admindashboard'])->middleware(['auth', 'verified'])->name('dashboard');
    //Role Route
    Route::get('admin/role', [RoleController::class, 'index'])->name('role.index');
    Route::get('admin/role/create', [RoleController::class, 'create'])->name('role.create');
    Route::post('admin/role', [RoleController::class, 'store'])->name('role.store');
    Route::get('admin/role/{id}', [RoleController::class, 'show'])->name('role.show');
    Route::get('admin/role/{id}/edit', [RoleController::class, 'edit'])->name('role.edit');
    Route::put('admin/role/{id}', [RoleController::class, 'update'])->name('role.update');
    Route::delete('admin/role/{id}', [RoleController::class, 'destroy'])->name('role.destroy');

    //Permission Route
    Route::get('admin/permission/', [PermissionController::class, 'index'])->name('permission.index');
    Route::get('admin/permission/create', [PermissionController::class, 'create'])->name('permission.create');
    Route::post('admin/permission', [PermissionController::class, 'store'])->name('permission.store');
    Route::get('admin/permission/{id}/edit', [PermissionController::class, 'edit'])->name('permission.edit');
    Route::put('admin/permission/{id}', [PermissionController::class, 'update'])->name('permission.update');
    Route::delete('admin/permission/{id}', [PermissionController::class, 'destroy'])->name('permission.destroy');

    //user Routes
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users/create', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

    //hotel Routes
    Route::get('/hotels', [HotelController::class, 'index'])->name('hotels.index');
    Route::get('/hotels/create', [HotelController::class, 'create'])->name('hotels.create');
    Route::post('/hotels/create', [HotelController::class, 'store'])->name('hotels.store');
    Route::get('/hotels/{id}/edit', [HotelController::class, 'edit'])->name('hotels.edit');
    Route::put('/hotels/{id}', [HotelController::class, 'update'])->name('hotels.update');
    Route::delete('/hotels/{id}/delete', [HotelController::class, 'destroy'])->name('hotels.destroy');
    Route::get('/hotels/recycle', [HotelController::class, 'trashShow'])->name('hotels.trash');
    Route::get('/hotels/{id}', [HotelController::class, 'restore'])->name('hotels.restore');
    Route::delete('/hotels/{id}', [HotelController::class, 'forceDelete'])->name('hotels.forceDelete');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route::get('/home', [HomeController::class, 'index']);

require __DIR__ . '/auth.php';
require __DIR__ . '/hotel.php';
require __DIR__ . '/staff.php';
