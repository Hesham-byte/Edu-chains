<?php

use Illuminate\Support\Facades\Route;


Route::view('/{path?}', 'index');
Route::get('/{any}', function () {
    return view('index');})->where('any', '.*');
