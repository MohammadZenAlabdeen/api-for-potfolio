<?php

use App\Http\Controllers\ClientSide\ProjectController;
use App\Http\Controllers\ClientSide\SectionController;
use App\Http\Controllers\ApiUserController;
use App\Http\Controllers\ClientSide\ClientrequestController;
use App\Http\Controllers\ClientSide\ServiceController;
use App\Http\Controllers\Dashboard\DashboardClientrequestController;
use App\Http\Controllers\Dashboard\DashboardProjectController;
use App\Http\Controllers\Dashboard\DashboardSectionController;
use App\Http\Controllers\Dashboard\DashboardServiceController;
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
Route::get('/sections',[SectionController::class,'index']);
Route::get('/projects',[ProjectController::class,'index']);
Route::post('/clientrequest/store',[ClientrequestController::class,'store']);
Route::get('/services',[ServiceController::class,'index']);

Route::middleware('auth:sanctum')->group( function (){
    Route::post('/logout',[ApiUserController::class,'logout']);

    Route::post('/dashboard/section/store',[DashboardSectionController::class,'store']);
    Route::get('/dashboard/section/show/{section}',[DashboardSectionController::class,'show']);
    Route::delete('/dashboard/section/delete/{section}',[DashboardSectionController::class,'destroy']);
    Route::put('/dashboard/section/update/{section}', [DashboardSectionController::class,'update']);

    Route::post('/dashboard/project/store',[DashboardProjectController::class,'store']);
    Route::get('/dashboard/project/show/{project}',[DashboardProjectController::class,'show']);
    Route::delete('/dashboard/project/delete/{project}',[DashboardProjectController::class,'destroy']);
    Route::put('/dashboard/project/update/{project}',[DashboardProjectController::class,'update']);

    Route::get('/dashboard/clientrequest',[DashboardClientrequestController::class,'index']);
    Route::get('/dashboard/clientrequest/show/{clientrequest}',[DashboardClientrequestController::class,'show']);
    Route::delete('/dashboard/clientrequest/delete/{clientrequest}',[DashboardClientrequestController::class,'destroy']);
    
    Route::get('/dashboard/service/show/{service}',[DashboardServiceController::class,'show']);
    Route::post('/dashboard/service/store',[DashboardServiceController::class,'store']);
    Route::put('/dashboard/service/update/{service}',[DashboardServiceController::class,'update']);
    Route::delete('/dashboard/service/delete/{service}',[DashboardServiceController::class,'destroy']);
});
