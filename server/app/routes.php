<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

//USERS API
Route::controller('users', 'UsersController');


//REFERRALS API
Route::controller('referrals', 'ReferralsController');

//PURCHASES API
Route::controller('purchases', 'PurchasesController');

//PAYOUTS API
Route::controller('payouts', 'PayoutsController');

//UNIQUE CHECK
Route::post('unique', function(){
	$input = Input::all();

	$table = Input::get('id');
	$property = Input::get('property');
	$value = Input::get('value');

	$check = DB::table($table)->where($property, $value)->first();

	if($check)
		return array('status'=>false);
	else
		return array('status'=>true);
});