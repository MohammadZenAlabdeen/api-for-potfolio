<?php

use App\Http\Controllers\ApiProjectController;
use App\Http\Controllers\ApiSectionController;
use App\Http\Controllers\ApiUserController;
use App\Http\Controllers\ClientrequestController;
use App\Http\Controllers\ServiceController;
use App\Models\Clientrequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Spatie\FlareClient\Api;

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
Route::post('/login',[ApiUserController::class,'login'])->name('user.login');
Route::get('/sections',[ApiSectionController::class,'index']);
Route::get('/projects',[ApiProjectController::class,'index']);
Route::post('/clientrequest/store',[ClientrequestController::class,'store']);
Route::get('/services',[ServiceController::class,'index']);

Route::middleware('auth:sanctum')->group( function (){
    Route::post('/logout',[ApiUserController::class,'logout']);

    Route::post('/dashboard/section/store',[ApiSectionController::class,'store']);
    Route::get('/dashboard/section/show/{section}',[ApiSectionController::class,'show']);
    Route::delete('/dashboard/section/delete/{section}',[ApiSectionController::class,'destroy']);
    Route::put('/dashboard/section/update/{section}', [ApiSectionController::class,'update']);

    Route::post('/dashboard/project/store',[ApiProjectController::class,'store']);
    Route::get('/dashboard/project/show/{project}',[ApiProjectController::class,'show']);
    Route::delete('/dashboard/project/delete/{project}',[ApiProjectController::class,'destroy']);
    Route::put('/dashboard/project/update/{project}',[ApiProjectController::class,'update']);

    Route::get('/dashboard/clientrequest',[ClientrequestController::class,'index']);
    Route::get('/dashboard/clientrequest/show/{clientrequest}',[ClientrequestController::class,'show']);
    Route::delete('/dashboard/clientrequest/delete/{clientrequest}',[ClientrequestController::class,'destroy']);
    
    Route::get('/dashboard/service/show/{service}',[ServiceController::class,'show']);
    Route::post('/dashboard/service/store',[ServiceController::class,'store']);
    Route::put('/dashboard/service/update/{service}',[ServiceController::class,'update']);
    Route::delete('/dashboard/service/delete/{service}',[ServiceController::class,'destroy']);
});
