<?php

use App\Http\Controllers\API\Admin\CitizenController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\KotaController;
use App\Http\Controllers\API\ProvinsiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/admin/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum', 'isAdmin'])
    ->prefix('admin')
    ->group(function () {
        Route::post('/admin/logout', [AuthController::class, 'logout']);

        Route::get('/citizens', [CitizenController::class, 'index']);
        Route::get('/citizens/{id}', [CitizenController::class, 'show']);
        Route::put('/citizens/{id}/ban-toggle', [CitizenController::class, 'toggleBan']);
        Route::put('/citizens/{id}', [CitizenController::class, 'update']);
        Route::delete('/citizens/{id}', [CitizenController::class, 'destroy']);

        Route::get('/provinsi', [ProvinsiController::class, 'index']);
        Route::post('/provinsi', [ProvinsiController::class, 'store']);
        Route::get('/provinsi/{id}', [ProvinsiController::class, 'show']);
        Route::put('/provinsi/{id}', [ProvinsiController::class, 'update']);
        Route::delete('/provinsi/{id}', [ProvinsiController::class, 'destroy']);

        Route::get('/kota', [KotaController::class, 'index']);
        Route::post('/kota', [KotaController::class, 'store']);
        Route::get('/kota/{id}', [KotaController::class, 'show']);
        Route::put('/kota/{id}', [KotaController::class, 'update']);
        Route::delete('/kota/{id}', [KotaController::class, 'destroy']);
    });
