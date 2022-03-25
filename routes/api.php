<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group(['namespace' => 'Tag', 'prefix' => 'tags'], function () {
    Route::get('/', 'IndexController');
    Route::post('/', 'StoreController');
    Route::patch('/{tag}', 'UpdateController');
    Route::delete('/{tag}', 'DestroyController');
});

Route::group(['namespace' => 'Category', 'prefix' => 'categories'], function () {
    Route::get('/', 'IndexController');
    Route::post('/', 'StoreController');
    Route::patch('/{category}', 'UpdateController');
    Route::delete('/{category}', 'DestroyController');
});

Route::group(['namespace' => 'Article', 'prefix' => 'articles'], function () {
    Route::group(['namespace' => 'Image', 'prefix' => 'images'], function () {
        Route::post('/', 'StoreController');
    });

    Route::get('/', 'IndexController');
    Route::post('/', 'StoreController');
    Route::patch('/{article}', 'UpdateController');
    Route::delete('/{article}', 'DestroyController');
});
