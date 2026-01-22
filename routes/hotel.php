<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Hotel\HotelBookingController;
use App\Http\Controllers\Hotel\HotelCustomerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Hotel\HotelPackageController;
use App\Http\Controllers\Hotel\HotelRoleController;
use App\Http\Controllers\Hotel\HotelStaffController;
use App\Http\Controllers\Hotel\HotelPermissionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });



Route::middleware(['auth:hotels'])->group(function () {

    Route::get('/hotel/dashboard', [HotelStaffController::class, 'hoteldashboard'])->name('hotel_dashboard');

    // customers route
    Route::get('/customers', [HotelCustomerController::class, 'index'])->name('hotel_customers.index');
    Route::get('/customers/create', [HotelCustomerController::class, 'create'])->name('hotel_customers.create');
    Route::post('/customers', [HotelCustomerController::class, 'store'])->name('hotel_customers.store');
    Route::get('/customers/{id}/edit', [HotelCustomerController::class, 'edit'])->name('hotel_customers.edit');
    Route::put('/customers/{id}', [HotelCustomerController::class, 'update'])->name('hotel_customers.update');
    Route::delete('/customers/{id}/delete', [HotelCustomerController::class, 'destroy'])->name('hotel_customers.destroy');
    Route::get('/customers/recycle', [HotelCustomerController::class, 'trashShow'])->name('hotel_customers.trash');
    Route::get('/customers/{id}', [HotelCustomerController::class, 'restore'])->name('hotel_customers.restore');
    Route::delete('/customers/{id}', [HotelCustomerController::class, 'forceDelete'])->name('hotel_customers.forceDelete');

    //packages route
    Route::get('/packages', [HotelPackageController::class, 'index'])->name('hotel_packages.index');
    Route::get('/packages/create', [HotelPackageController::class, 'create'])->name('hotel_packages.create');
    Route::post('/packages', [HotelPackageController::class, 'store'])->name('hotel_packages.store');
    Route::get('/packages/{id}/edit', [HotelPackageController::class, 'edit'])->name('hotel_packages.edit');
    Route::put('/packages/{id}', [HotelPackageController::class, 'update'])->name('hotel_packages.update');
    Route::delete('/packages/{id}/delete', [HotelPackageController::class, 'destroy'])->name('hotel_packages.destroy');
    Route::get('/packages/recycle', [HotelPackageController::class, 'trashShow'])->name('hotel_packages.trash');
    Route::get('/packages/{id}', [HotelPackageController::class, 'restore'])->name('hotel_packages.restore');
    Route::delete('/packages/{id}', [HotelPackageController::class, 'forceDelete'])->name('hotel_packages.forceDelete');

    //booking route
    Route::get('/bookings', [HotelBookingController::class, 'index'])->name('hotel_bookings.index');
    Route::get('/bookings/create', [HotelBookingController::class, 'create'])->name('hotel_bookings.create');
    Route::post('/bookings', [HotelBookingController::class, 'store'])->name('hotel_bookings.store');
    Route::get('/bookings/{id}/edit', [HotelBookingController::class, 'edit'])->name('hotel_bookings.edit');
    Route::put('/bookings/{id}', [HotelBookingController::class, 'update'])->name('hotel_bookings.update');
    Route::delete('/bookings/{id}/delete', [HotelBookingController::class, 'destroy'])->name('hotel_bookings.destroy');
    Route::get('/bookings/recycle', [HotelBookingController::class, 'trashShow'])->name('hotel_bookings.trash');
    Route::get('/bookings/{id}', [HotelBookingController::class, 'restore'])->name('hotel_bookings.restore');
    Route::delete('/bookings/{id}', [HotelBookingController::class, 'forceDelete'])->name('hotel_bookings.forceDelete');

    //staffs route
    Route::get('/staffs', [HotelStaffController::class, 'index'])->name('hotel_staffs.index');
    Route::get('/staffs/create', [HotelStaffController::class, 'create'])->name('hotel_staffs.create');
    Route::post('/staffs', [HotelStaffController::class, 'store'])->name('hotel_staffs.store');
    Route::get('/staffs/{id}/edit', [HotelStaffController::class, 'edit'])->name('hotel_staffs.edit');
    Route::put('/staffs/{id}', [HotelStaffController::class, 'update'])->name('hotel_staffs.update');
    Route::delete('/staffs/{id}/delete', [HotelStaffController::class, 'destroy'])->name('hotel_staffs.destroy');
    Route::get('/staffs/recycle', [HotelStaffController::class, 'trashShow'])->name('hotel_staffs.trash');
    Route::get('/staffs/{id}', [HotelStaffController::class, 'restore'])->name('hotel_staffs.restore');
    Route::delete('/staffs/{id}', [HotelStaffController::class, 'forceDelete'])->name('hotel_.forceDelete');

    //Roles Route
    Route::get('/roles', [HotelRoleController::class, 'index'])->name('hotel_roles.index');
    Route::get('/roles/create', [HotelRoleController::class, 'create'])->name('hotel_roles.create');
    Route::post('/roles', [HotelRoleController::class, 'store'])->name('hotel_roles.store');
    Route::get('/roles/{id}/edit', [HotelRoleController::class, 'edit'])->name('hotel_roles.edit');
    Route::put('/roles/{id}', [HotelRoleController::class, 'update'])->name('hotel_roles.update');
    Route::delete('/roles/{id}', [HotelRoleController::class, 'destroy'])->name('hotel_roles.destroy');

    //permission Route
    Route::get('/permissions', [HotelPermissionController::class, 'index'])->name('hotel_permissions.index');

    Route::get('/hotel/profile', [ProfileController::class, 'edit'])->name('hotel_profile.edit');
    Route::patch('/hotel/profile', [ProfileController::class, 'update'])->name('hotel_profile.update');
    Route::delete('/hotel/profile', [ProfileController::class, 'destroy'])->name('hotel_profile.destroy');

    Route::delete('/hotel_logout', [AuthenticatedSessionController::class, 'hotel_destroy'])
        ->name('hotel_destroy.logout');
});

// Route::get('/home', [HomeController::class, 'index']);
