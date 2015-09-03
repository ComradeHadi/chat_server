<?php namespace App\Http\Controllers;

/**
 * Created by PhpStorm.
 * User: amine
 * Date: 8/21/15
 * Time: 12:29 PM
 */

use App\Http\Requests;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;
use Request;
use LRedis;

use App\User;
use App\messages;
use Auth;
use Illuminate\Support\Facades\Input;


class User_adminController extends Controller
{


    public function __construct()
    {
        $this->middleware('guest');
        // $this->middleware('auth');
    }

    public function get_all_users()
    {

        $users = User::get_all();


        $users = User::all();

        $response = array(
            'status' => 200,
            'msg' => 'Success',
            'users' => $users
        );
        return Response::json($response);


    }


    public function get_messages()
    {


      /*  $test ="";
        $to_id =2;
        $from_id =3;*/


        $request = Request::instance();
        $content = json_decode($request->getContent());


        $from_id = $content->from_id;
        $to_id = $content->to_id;




        $messages=messages::where('from_id',$from_id)->where('to_id',$to_id)->orWhere('from_id',$to_id)->Where('to_id',$from_id)->get();




        $response = array(
            'status' => 200,
            'net_msg' => 'Success',
           'messages' =>$messages
        );
        return Response::json($response);


    }


    public function sendMessage()
    {
        $redis = LRedis::connection();
        $request = Request::instance();
        $content = json_decode($request->getContent());


        $sender_id = $content->sender_id;
        $sender_name = $content->sender_name;

        $receiver_name = $content->receiver_name;
        $receiver_id = $content->receiver_id;
        $msg = $content->msg;
        $sender_path = $content->sender_path;
        $to_path = $content->to_path;


        $message = new messages;
        $message->from_id = $sender_id;
        $message->from_name = $sender_name;
        $message->from_path = $sender_path;

        $message->message = $msg;
        $message->to_id = $receiver_id;
        $message->to_name = $receiver_name;
        $message->to_path = $to_path;


        $message->save();


        $response = array(
            'status' => 200,
            'msg' => $msg,
            'content' => $content
        );

        $redis->publish('message', json_encode($content));


        return Response::json($response);


    }


    public function user_is_typing()
    {
        $redis = LRedis::connection();
        $request = Request::instance();
        $content = json_decode($request->getContent());


        $response = array(
            'status' => 200,
            'msg' => "success",
            'content' => $content
        );

     $redis->publish('userTyping', json_encode($content));


        return Response::json($response);


    }


    public function sendMessage2()
    {

        $redis = LRedis::connection();


        $userId = Auth::id();
        $useremail = Auth::user()->email;
        $userName = Auth::user()->name;

        if (Request::ajax()) {
            $msg = Input::get('msg', 'the msg is empty');
            $to = Input::get('receiver_id', 'the receiver Id is empty');


            $msg_arr = array("from" => $userName, "to" => $to, "msg" => $msg);

            $redis->publish('message', json_encode($msg_arr));


            $response = array(
                'status' => 'success',
                'msg' => 'the message was sent with success',
                'from' => $userName,
                'to' => $to
            );

            return Response::json($response);
        } else {
            $response = array(
                'status' => 'error',
                'msg' => "the message wasn't sent ",

            );

            return Response::json($response);
        }


    }


}
