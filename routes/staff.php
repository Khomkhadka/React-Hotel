<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Staff\StaffBookingController;
use App\Http\Controllers\Staff\StaffCustomerController;
use App\Http\Controllers\Staff\StaffPackageController;
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



Route::middleware('auth:staffs')->group(function () {
     
Route::get('/staff/dashboard',[StaffBookingController::class,'staffShow'])->name('staff_dashboard');

Route::get('/staff/customers',[StaffCustomerController::class,'index'])->name('staff_customers.index');
Route::get('/staff/customers/create',[StaffCustomerController::class,'create'])->name('staff_customers.create');
Route::post('/staff/customers',[StaffCustomerController::class,'store'])->name('staff_customers.store');
Route::get('/staff/customers/{id}/edit',[StaffCustomerController::class,'edit'])->name('staff_customers.edit');
Route::put('/staff/customers/{id}',[StaffCustomerController::class,'update'])->name('staff_customers.update');
Route::delete('/staff/customers/{id}/delete',[StaffCustomerController::class,'destroy'])->name('staff_customers.destroy');
Route::get('/staff/customers/recycle', [StaffCustomerController::class, 'trashShow'])->name('staff_customers.trash');
Route::get('/staff/customers/{id}', [StaffCustomerController::class, 'restore'])->name('staff_customers.restore');
Route::delete('/staff/customers/{id}', [StaffCustomerController::class, 'forceDelete'])->name('staff_customers.forceDelete');

//packages route
Route::get('/staff/packages',[StaffPackageController::class,'index'])->name('staff_packages.index');
Route::get('/staff/packages/create',[StaffPackageController::class,'create'])->name('staff_packages.create');
Route::post('/staff/packages',[StaffPackageController::class,'store'])->name('staff_packages.store');
Route::get('/staff/packages/{id}/edit',[StaffPackageController::class,'edit'])->name('staff_packages.edit');
Route::put('/staff/packages/{id}',[StaffPackageController::class,'update'])->name('staff_packages.update');
Route::delete('/staff/packages/{id}/delete',[StaffPackageController::class,'destroy'])->name('staff_packages.destroy');
Route::get('/staff/packages/recycle', [StaffPackageController::class, 'trashShow'])->name('staff_packages.trash');
Route::get('/staff/packages/{id}', [StaffPackageController::class, 'restore'])->name('staff_packages.restore');
Route::delete('/staff/packages/{id}', [StaffPackageController::class, 'forceDelete'])->name('staff_packages.forceDelete');

//booking route
Route::get('/staff/bookings',[StaffBookingController::class,'index'])->name('staff_bookings.index');
Route::get('/staff/bookings/create',[StaffBookingController::class,'create'])->name('staff_bookings.create');
Route::post('/staff/bookings',[StaffBookingController::class,'store'])->name('staff_bookings.store');
Route::get('/staff/bookings/{id}/edit',[StaffBookingController::class,'edit'])->name('staff_bookings.edit');
Route::put('/staff/bookings/{id}',[StaffBookingController::class,'update'])->name('staff_bookings.update');
Route::delete('/staff/bookings/{id}/delete',[StaffBookingController::class,'destroy'])->name('staff_bookings.destroy');
Route::get('/staff/bookings/recycle', [StaffBookingController::class, 'trashShow'])->name('staff_bookings.trash');
Route::get('/staff/bookings/{id}', [StaffBookingController::class, 'restore'])->name('staff_bookings.restore');
Route::delete('/staff/bookings/{id}', [StaffBookingController::class, 'forceDelete'])->name('staff_bookings.forceDelete');

  Route::delete('/staff_logout', [AuthenticatedSessionController::class, 'staff_destroy'])
        ->name('staff_destroy.logout');

});

// Route::get('/home', [HomeController::class, 'index']);

