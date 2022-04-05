<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::group(['namespace' => 'Category', 'prefix' => 'categories'], function () {
        Route::get('/', 'IndexController');
        Route::post('/', 'StoreController');
        Route::patch('/{category}', 'UpdateController');
        Route::delete('/{category}', 'DestroyController');
    });

    Route::group(['namespace' => 'Tag', 'prefix' => 'tags'], function () {
        Route::get('/', 'IndexController');
        Route::post('/', 'StoreController');
        Route::patch('/{tag}', 'UpdateController');
        Route::delete('/{tag}', 'DestroyController');
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
});

Route::group(['namespace' => 'User', 'prefix' => 'users'], function () {
    Route::get('/', 'IndexController');
    Route::post('/', 'LoginController');
});


