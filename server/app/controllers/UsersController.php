<?php

class UsersController extends BaseController {

	public function getIndex()
	{
		$users = DB::table('users')->orderBy('created','desc')->get();

		$i = 0;
		foreach($users as $user){
			$referral_count = DB::table('referrals')->where('referrer','=',$user->id)->count();

			$purchase_total = DB::table('purchases')->where('purchaser','=',$user->id)->sum('amount');

			$payout_total = DB::table('purchases')
								->join('payouts','payouts.id','=','purchases.payout')
								->where('purchases.purchaser','=',$user->id)
								->sum("payouts.amount");

			$users[$i]->referral_count = $referral_count;
			$users[$i]->purchase_total = $purchase_total;
			$users[$i]->payout_total = $payout_total;

			$i++;
		}

		return $users;
	}

	public function postCreate(){
		$firstname = Input::get('firstname');
		$lastname = Input::get('lastname');
		$email = Input::get('email');
		$referral_code = Input::get('referral_code');
		$current_date = round(microtime(true) * 1000);

		$success = DB::table('users')->insert(array(
			'firstname' => $firstname,
			'lastname' => $lastname,
			'email' => $email,
			'referral_code' => $referral_code,
			'created' => $current_date
		));

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postUpdate(){
		$id = Input::get('id');
		$firstname = Input::get('firstname');
		$lastname = Input::get('lastname');
		$email = Input::get('email');
		$referral_code = Input::get('referral_code');

		$success = DB::table('users')->where('id','=',$id)->update(array(
			'firstname' => $firstname,
			'lastname' => $lastname,
			'email' => $email,
			'referral_code' => $referral_code
		));

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postDelete(){
		$id = Input::get('id');

		$success = DB::table('users')->where('id','=',$id)->delete();

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postCount(){
		$count = DB::table('users')->count();

		return array('count'=>$count);
	}
}