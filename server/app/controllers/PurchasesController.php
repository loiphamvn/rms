<?php

class PurchasesController extends BaseController {

	public function getIndex()
	{
		$purchases = DB::table('purchases')->orderBy('created','desc')->get();

		$i = 0;
		foreach($purchases as $purchase){
			$referrer_id = DB::table('referrals')->where('id','=',$purchase->referrer)->pluck('referrer');

			$referrer_email = DB::table('users')->where('id','=', $referrer_id)->pluck('email');

			$purchaser_email = DB::table('users')->where('id','=', $purchase->purchaser)->pluck('email');

			$purchases[$i]->referrer_email = $referrer_email;
			$purchases[$i]->purchaser_email = $purchaser_email;

			$i++;
		}

		return $purchases;
	}

	public function postCreate(){
		$referrer = Input::get('referrer');
		$purchaser = Input::get('purchaser');
		$date = Input::get('date');
		$amount = Input::get('amount');
		$commission_amount = Input::get('commission_amount');
		$referral_eligible = Input::get('referral_eligible');
		$confirmed = Input::get('confirmed');
		$payout = Input::get('payout');
		$current_date = round(microtime(true) * 1000);

		$success = DB::table('purchases')->insert(array(
			'referrer' => $referrer,
			'purchaser' => $purchaser,
			'amount' => $amount,
			'commission_amount' => $commission_amount,
			'referral_eligible' => $referral_eligible,
			'confirmed' => $confirmed,
			'date' => $date,
			'created' => $current_date,
			'payout'=> $payout
		));

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postUpdate(){
		$id = Input::get('id');
		$referrer = Input::get('referrer');
		$purchaser = Input::get('purchaser');
		$date = Input::get('date');
		$amount = Input::get('amount');
		$commission_amount = Input::get('commission_amount');
		$referral_eligible = Input::get('referral_eligible');
		$payout = Input::get('payout');
		$confirmed = Input::get('confirmed');

		$success = DB::table('purchases')->where('id','=',$id)->update(array(
			'referrer' => $referrer,
			'purchaser' => $purchaser,
			'amount' => $amount,
			'commission_amount' => $commission_amount,
			'referral_eligible' => $referral_eligible,
			'confirmed' => $confirmed,
			'date' => $date,
			'payout'=> $payout
		));

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postDelete(){
		$id = Input::get('id');

		$success = DB::table('purchases')->where('id','=',$id)->delete();

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postCount(){
		$count = DB::table('purchases')->count();

		return array('count'=>$count);
	}
}