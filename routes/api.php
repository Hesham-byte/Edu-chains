<?php

use App\Http\Controllers\APi\V1\ApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\CategoryController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/tags', [TagController::class, 'index']);
Route::post('/tags', [TagController::class, 'store']);
Route::apiResource('categories', CategoryController::class);

Route::get('/jobs/category/{id}', [JobController::class, 'getByCategory']);
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{id}', [JobController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [UserController::class, 'show']);

    Route::put('/user/edit', [UserController::class, 'edit']);
    Route::post('/jobs', [JobController::class, 'store']);
    Route::put('/jobs/{id}', [JobController::class, 'update']);
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']);
});

// Application Routes
Route::controller(ApplicationController::class)->group(function () {
    Route::get('/jobs/{id}/applications', 'getByJob')->middleware('auth:sanctum');
    Route::get('/user/applications', 'getByUser')->middleware('auth:sanctum');
    Route::post('/jobs/{id}/apply', 'store')->middleware('auth:sanctum');
    Route::get('/applications/{id}', 'show')->middleware('auth:sanctum');
    Route::put('/applications/{id}/take-action', 'takeAction')->middleware('auth:sanctum');
});