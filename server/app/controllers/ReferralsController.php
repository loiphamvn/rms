<?php

class ReferralsController extends BaseController {

	public function getIndex()
	{
		$referrals = DB::table('referrals')->orderBy('created','desc')->get();

		$i = 0;
		foreach($referrals as $referral){
			$referrer_email = DB::table('users')->where('id','=', $referral->referrer)->pluck('email');

			$referred_email = DB::table('users')->where('id','=', $referral->referred)->pluck('email');

			$purchase_total = DB::table('purchases')->where('referrer','=',$referral->id)->sum("amount");

			$payout_total = DB::table('purchases')
								->join('payouts','payouts.id','=','purchases.payout')
								->where('purchases.referrer','=',$referral->id)
								->sum("payouts.amount");

			$referrals[$i]->referrer_email = $referrer_email;
			$referrals[$i]->referred_email = $referred_email;
			$referrals[$i]->purchase_total = $purchase_total;
			$referrals[$i]->payout_total = $payout_total;

			$i++;
		}

		return $referrals;
	}

	public function postIndex(){
		$purchaser_id= Input::get('purchaser_id');

		$referrals = DB::table('referrals')->where('referred','=',$purchaser_id)->get();

		$i = 0;
		foreach($referrals as $referral){
			$referrer_email = DB::table('users')->where('id','=', $referral->referrer)->pluck('email');

			$referrals[$i]->referrer_email = $referrer_email;

			$i++;
		}

		return $referrals;
	}

	public function postCreate(){
		$referrer = Input::get('referrer');
		$referred = Input::get('referred');
		$date = Input::get('date');
		$current_date = round(microtime(true) * 1000);

		$success = DB::table('referrals')->insert(array(
			'referrer' => $referrer,
			'referred' => $referred,
			'date' => $date,
			'created' => $current_date
		));

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postUpdate(){
		$id = Input::get('id');
		$referrer = Input::get('referrer');
		$referred = Input::get('referred');
		$date = Input::get('date');

		$success = DB::table('referrals')->where('id','=',$id)->update(array(
			'referrer' => $referrer,
			'referred' => $referred,
			'date' => $date
		));

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postDelete(){
		$id = Input::get('id');

		$success = DB::table('referrals')->where('id','=',$id)->delete();

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postCount(){
		$count = DB::table('referrals')->count();

		return array('count'=>$count);
	}
}