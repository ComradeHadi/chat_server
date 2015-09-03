@extends('app')

@section("css")

    <style>

        .send_bt, .send_txt {
            height: 51px;
            border: 2px groove rgba(123, 132, 123, 0.24)

        }

    </style>


@endsection

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel panel-default">
                    <div class="panel-heading">Send message</div>

                    <form method="POST" id="send_form">

                        <div class="btn-group" role="group" aria-label="...">

                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                    <div id="choosen_user">User</div>
                                    <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    @foreach($users as $user)

                                        <li><a href="javascript:void(0)"
                                               onclick="set_user('{{ $user->id }}','{{ $user->name }}')">{{ $user->name }}</a>
                                        </li>

                                    @endforeach


                                </ul>
                            </div>
                        </div>

                        <input type="text" class="send_txt" name="message">
                        <input type="submit" class="send_bt" value="send">
                    </form>
                </div>


            </div>
        </div>
    </div>
    </div>

    <script language="javascript">


        var receiver_name = "";
        var receiver_id = "";

        var host = "http://localhost:8000/";


        $(document).ready(function () {

            var host = "http://localhost:8000/";

            $('#send_form').on('submit', function (e) {
                console.log("form submitted with :reciever_name: "+receiver_name+" --->reciever_id -->"+receiver_id);

                e.preventDefault();

                var msg = $(this).find('input[name=message]').val();

                $.ajax({
                    type: "POST",
                    url: host + 'sendmessage',
                    data: {msg: msg, receiver_name: receiver_name, receiver_id: receiver_id},
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                }).done(function (response) {

                    console.log(response.msg)


                });

            });
        });

        function set_user(id, user_name) {


            $('#choosen_user').html(user_name);
            console.log("id ---> " + id);

            receiver_id = id;
            receiver_name = user_name;
        }
    </script>

@endsection