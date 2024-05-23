<?php

use App\Http\Controllers\ProcedureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterToProcedureController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('roles', RoleController::class);
    Route::group(['prefix' => 'roles'], function () {
        Route::get('/{role}/add-permissions', [App\Http\Controllers\RoleController::class, 'addPermissionToRole'])->name('roles.addPermissionToRole');
        Route::put('/{role}/give-permissions', [App\Http\Controllers\RoleController::class, 'givePermissionToRole'])->name('roles.givePermissionToRole');
    });
    Route::resource('user', UserController::class);

    Route::get('registerToProcedure', [RegisterToProcedureController::class, 'registerToProcedure'])->name('procedures.register');
    Route::get('{procedure}/registerToProcedure2', [RegisterToProcedureController::class, 'registerToProcedure2'])->name('procedures.register-2');
    Route::get('{procedure}/{employee}/registerToProcedure3', [RegisterToProcedureController::class, 'registerToProcedure3'])->name('procedures.register-3');
    Route::get('{procedure}/{employee}/registerToProcedure4', [RegisterToProcedureController::class, 'registerToProcedure4'])->name('procedures.register-4');
    Route::post('{procedure}/{employee}/registerToProcedure5', [RegisterToProcedureController::class, 'registerToProcedure5'])->name('procedures.register-5');
    Route::get('/get-occupied-times', [RegisterToProcedureController::class, 'procedures.getOccupiedTimes']);
    Route::get('/procedure-schedule', [RegisterToProcedureController::class, 'showProcedureSchedule'])->name('procedures.schedule');
    Route::get('/previous-procedure-schedule', [RegisterToProcedureController::class, 'showPreviousProcedureSchedule'])->name('procedures.previous-procedures-schedule');
});
Route::prefix("procedures")->name('procedures.')->group(function () {
    Route::get('/', [ProcedureController::class, 'index'])->name('index');
    Route::get('/create', [ProcedureController::class, 'create'])->name('create');
    Route::post('/', [ProcedureController::class, 'store'])->name('store');
    Route::get('/{procedure}/edit', [ProcedureController::class, 'edit'])->name('edit');
    Route::put('/{procedure}', [ProcedureController::class, 'update'])->name('update');
    Route::delete('/{procedure}', [ProcedureController::class, 'destroy'])->name('destroy');
    Route::get('/{procedure}/delete', [ProcedureController::class, 'delete'])->name('delete');
    Route::get('/{procedure}/add-employees', [ProcedureController::class, 'addEmployees'])->name('add-employees');
    Route::post('/{procedure}/employeeToProcedure', [ProcedureController::class, 'employeeToProcedure'])->name('employee-to-procedure');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
