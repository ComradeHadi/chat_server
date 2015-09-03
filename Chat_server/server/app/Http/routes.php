<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::get('socket', 'SocketController@index');
//Route::post('sendmessage', 'SocketController@sendMessage');
Route::get('writemessage', 'SocketController@writemessage');



Route::get('get_all_users2', 'User\User_adminController@get_all_users');


Route::get('get_all_users', [
	'middleware' => 'cors',
	'uses' => 'User_adminController@get_all_users'
]);


Route::post('get_messages', [
	'middleware' => 'cors',
	'uses' => 'User_adminController@get_messages'
]);


Route::post('sendmessage', [
	'middleware' => 'cors',
	'uses' => 'User_adminController@sendMessage'
]);


Route::post('user_is_typing', [
	'middleware' => 'cors',
	'uses' => 'User_adminController@user_is_typing'
]);



Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
