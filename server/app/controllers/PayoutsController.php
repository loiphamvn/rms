<?php

class PayoutsController extends BaseController {

	public function getIndex()
	{
		$payouts = DB::table('payouts')->orderBy('created','desc')->get();

		$i = 0;
		foreach($payouts as $payout){
			$recipient_email = DB::table('users')->where('id','=', $payout->recipient)->pluck('email');
			$purchase_count = DB::table('purchases')->where('payout','=',$payout->id)->count();

			$payouts[$i]->recipient_email = $recipient_email;

			$payouts[$i]->purchase_count = $purchase_count;

			$i++;
		}

		return $payouts;
	}

	public function postCreate(){
		$recipient = Input::get('recipient');
		$amount = Input::get('amount');		
		$date = Input::get('date');
		$current_date = round(microtime(true) * 1000);

		$success = DB::table('payouts')->insert(array(
			'recipient' => $recipient,
			'amount' => $amount,
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
		$recipient = Input::get('recipient');
		$amount = Input::get('amount');		
		$date = Input::get('date');
		$current_date = round(microtime(true) * 1000);

		$success = DB::table('payouts')->where('id','=',$id)->update(array(
			'recipient' => $recipient,
			'amount' => $amount,
			'date' => $date
		));

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postDelete(){
		$id = Input::get('id');

		$success = DB::table('payouts')->where('id','=',$id)->delete();

		if($success)
			return array('success'=>true);
		else
			return array('success'=>false);
	}

	public function postCount(){
		$count = DB::table('payouts')->count();

		return array('count'=>$count);
	}
}