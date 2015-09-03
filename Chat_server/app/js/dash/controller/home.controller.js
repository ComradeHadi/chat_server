myApp.controller('homeCtrl',
    ['home_factory', '$scope', '$rootScope', '$window', '$routeParams', 'myconfig', '$timeout', '$http',
        function (home_factory, $scope, $rootScope, $window, $routeParams, myconfig, $timeout, $http) {


            var socket_host = 'http://localhost:8890';
            //var socket_host = 'http://192.168.0.100:8890';
            $window.localStorage.setItem("socket_host", socket_host);

            $rootScope.chat_room = [];
            $rootScope.selected_users = [];
            var opened_user_chat;


            var socket = io.connect(socket_host);


            socket.on('message', function (js_data) {
                var data = JSON.parse(js_data);
                var current_user_id = $window.localStorage.getItem("current_user_id");

                console.log("message sent from : --->" + data.sender_name + ", id --->" + data.sender_id);
                console.log("message sent To : --->" + data.receiver_name);
                console.log("message received --->" + data.msg);

                $timeout(function () {

                    var id = "li" + data.receiver_id;
                    $("#" + id).addClass("animation-floating");
                }, 1000);

                if (current_user_id == data.receiver_id) {

                    //if (opened_user_chat == data.sender_id) {

                    $timeout(function () {

                        console.log("current_user_id --->" + current_user_id + " , receiver id --->" + data.receiver_id);
                        $('.msgs_area').append('<div class="sender_msg animation-expandUp"><img class="sender_path" src=' + data.sender_path + '>&nbsp;&nbsp;&nbsp;' + data.msg + '</div>');


                    }, 1000);

                    $scope.play_sound();

                    /* } else {

                     $timeout(function () {

                     var id = "li" + data.receiver_id;
                     $("#" + id).addClass("animation-floating");
                     }, 1000);
                     }*/
                }

            });


            $scope.user_typing = function () {


                var current_user_name = $window.localStorage.getItem("current_user_name");
                var current_user_id = $window.localStorage.getItem("current_user_id");
                var user_typing = {

                    typing_user_name: current_user_name,
                    typing_user_id: current_user_id


                };
                console.log("inside user_typing scope ");

                // socket.emit("is_typing", user_typing);
                home_factory.user_is_typing(user_typing).success(function (rt) {

                    console.log('response ---> ' + rt.status);

                }).error(function (err) {

                    alert("error---->" + err.message);

                });


                //console.log("user is typing ---->" + $scope.msg);


            }


            socket.on('userTyping', function (js_data) {
                var data = JSON.parse(js_data);
                var current_user_id = $window.localStorage.getItem("current_user_id");


                console.log("inside socket userTyping");
                 if (current_user_id != data.typing_user_id) {

                //$scope.msg = data.typing_user_name + " is typing ...";
                $('.is_typing_class').html(data.typing_user_name + " is typing ...");
                console.log($scope.msg);

                     $('.is_typing_class').animate({opacity:1},200);






                $timeout(function () {

                    $('.is_typing_class').animate({opacity:0},100);



                }, 1500);

                }

            });


            $scope.showtooltip = false;

            $scope.hideTooltip = function () {

                $scope.showtooltip = false;
            }

            $scope.toggleTooltip = function (e) {
                e.stopPropagation();
                $scope.showtooltip = !$scope.showtooltip;
            }


            $scope.get_all_users = function () {

                console.log("inside ---> get_all_users  Scope");


                home_factory.get_all_users().success(function (rt) {

                    $scope.users = rt.users;
                    console.log(rt.users.length + ' results');
                    console.log("user --->" + rt.users[0].name);


                }).error(function (err) {

                    alert("error---->" + err.message);

                });

            }

            $scope.is_current_user = function (user) {

                return user.from_id == $window.localStorage.getItem("current_user_id");
            }


            $scope.get_messages = function (chat_user) {

                console.log("inside ---> get_all_users  Scope");
                var current_user_id = $window.localStorage.getItem("current_user_id");


                var query = {
                    from_id: current_user_id,
                    to_id: chat_user

                };


                home_factory.get_messages(query).success(function (response) {


                    $scope.$apply(function () {


                    });

                    $timeout(function () {

                        $scope.chat_box = [];
                        $scope.chat_box.length = 0;

                        $scope.chat_box = response.messages;
                    }, 200);


                    console.log('success  ---->' + response.net_msg);


                }).error(function (err) {

                    alert("error---->" + err);

                });

            };


            $scope.mass_messages_sender = function (i, selected_users_array, promises) {


                var msg = $scope.msg;
                var max = selected_users_array.length;

                var current_img_path = $window.localStorage.getItem("current_user_img_path");
                var current_user_name = $window.localStorage.getItem("current_user_name");
                var current_user_id = $window.localStorage.getItem("current_user_id");
                var current_user_age = $window.localStorage.getItem("current_user_age");
                var host = "http://localhost:8000/";
                //var host = "http://192.168.0.100:8000/";

                if (i < max) {


                    var chat_user_id = selected_users_array[i].chat_user_id;
                    var chat_user_img_path = selected_users_array[i].chat_user_img_path;
                    var chat_user_name = selected_users_array[i].chat_user_name;
                    var chat_user_age = selected_users_array[i].chat_user_age;


                    var query = {
                        msg: msg,
                        sender_id: current_user_id,
                        sender_name: current_user_name,
                        sender_path: current_img_path,
                        receiver_id: chat_user_id,
                        receiver_name: chat_user_name,
                        to_path: chat_user_img_path
                    };


                    $timeout(function () {

                        promises.push($http({
                            url: host + 'sendmessage',
                            method: "POST",
                            async: true,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            data: query
                        }));
                        var x = i + 1;
                        $scope.mass_messages_sender(x, selected_users_array, promises);

                    }, 110);


                } else {


                    home_factory.send_message(promises);


                    $('.msgs_area').append('<div class="current_user_msg animation-expandUp" style="opacity: 0.4" >' + msg + '</div>');

                    return false;


                }


            }


            $scope.send_message = function () {


                var promises = [];
                $scope.mass_messages_sender(0, $rootScope.selected_users, promises);


            }


            $scope.send_message_fact = function (query) {


                /*    var chat_img_path = $window.localStorage.getItem("chat_user_img_path");
                 var chat_user_name = $window.localStorage.getItem("chat_user_name");
                 var chat_user_id = $window.localStorage.getItem("chat_user_id");
                 var chat_user_age = $window.localStorage.getItem("chat_user_age");*/


                var current_img_path = $window.localStorage.getItem("current_user_img_path");
                var current_user_name = $window.localStorage.getItem("current_user_name");
                var current_user_id = $window.localStorage.getItem("current_user_id");
                var current_user_age = $window.localStorage.getItem("current_user_age");


                var msg = $scope.msg;
                var sender_id = current_user_id;
                var sender_name = current_user_name;

                /*  var receiver_name = chat_user_name;
                 var receiver_id = chat_user_id;
                 */

                console.log("receiver _id --->" + query.chat_user_id);

                var query = {
                    msg: msg,
                    sender_id: sender_id,
                    sender_name: sender_name,
                    sender_path: current_img_path,
                    receiver_id: query.chat_user_id,
                    receiver_name: query.chat_user_name,
                    to_path: query.chat_user_img_path
                };

                /*        $('.msgs_area').append('<div class="current_user_msg animation-expandUp" style="opacity: 0.4" >' + msg + '</div>');*/

                home_factory.send_message(query).success(function (response) {

                    console.log(response.msg);
                    $timeout(function () {


                        $('.current_user_msg').css("opacity", '1');
                    }, 1000);


                }).error(function (err) {

                    console.log("error---->" + err.message);

                });

            };

            $scope.send_message_fact2 = function (msg) {


                var chat_img_path = $window.localStorage.getItem("chat_user_img_path");
                var chat_user_name = $window.localStorage.getItem("chat_user_name");
                var chat_user_id = $window.localStorage.getItem("chat_user_id");
                var chat_user_age = $window.localStorage.getItem("chat_user_age");


                var current_img_path = $window.localStorage.getItem("current_user_img_path");
                var current_user_name = $window.localStorage.getItem("current_user_name");
                var current_user_id = $window.localStorage.getItem("current_user_id");
                var current_user_age = $window.localStorage.getItem("current_user_age");


                var msg = $scope.msg;
                var sender_id = current_user_id;
                var sender_name = current_user_name;

                var receiver_name = chat_user_name;
                var receiver_id = chat_user_id;


                var query = {
                    msg: msg,
                    sender_id: sender_id,
                    sender_name: sender_name,
                    sender_path: current_img_path,

                    receiver_id: receiver_id,
                    receiver_name: receiver_name,
                    to_path: chat_img_path
                };

                $('.msgs_area').append('<div class="current_user_msg animation-expandUp" style="opacity: 1" >' + msg + '</div>');

                home_factory.send_message(query).success(function (response) {

                    console.log(response.msg);
                    $timeout(function () {


                        $('.current_user_msg').css("opacity", '1');
                    }, 1000);


                }).error(function (err) {

                    console.log("error---->" + err.message);

                });

            };


            $scope.get_all_users();


            $scope.play_sound = function () {

                var obj = document.createElement("audio");
                var url = ('libs/myLibs/notify.mp3');
                obj.setAttribute("src", url);
                $.get();
                obj.play();

            }


            $scope.romove_user = function (index) {


                $rootScope.selected_users.splice(index, 1);


            }

            $rootScope.choose_user = function (user) {


                //console.log(user.name);
                var img_path = user.avatar;
                var user_name = user.name;
                var user_id = user.id;
                var user_age = user.age;

                var content = "chat user :<a ><img ng-src=" + img_path + " /></a> <p>ID :" + user_id + " , Nom :" + user_name + " , Age : " + user_age + "</p>";


                console.log(content);
                $rootScope.selected_users.unshift({
                    chat_user_id: user_id,
                    chat_user_img_path: img_path,
                    chat_user_name: user_name,
                    chat_user_age: user_age


                });


            };


            $rootScope.choose_user1 = function (user) {


                //console.log(user.name);
                var img_path = user.avatar;
                var user_name = user.name;
                var user_id = user.id;
                var user_age = user.age;
                var content = "chat user :<a ><img ng-src=" + img_path + " /></a> <p>ID :" + user_id + " , Nom :" + user_name + " , Age : " + user_age + "</p>";


                console.log(content);
                $rootScope.img_avt = img_path;
                $rootScope.user_detail = user_name + " -> " + user_age;


                $window.localStorage.setItem("chat_user_img_path", img_path);
                $window.localStorage.setItem("chat_user_name", user_name);
                $window.localStorage.setItem("chat_user_id", user_id);
                $window.localStorage.setItem("chat_user_age", user_age);

                var user_name = $window.localStorage.getItem("chat_user_name");
                console.log("Local_storage  chat_user_name -->" + user_name);


                $("#li" + user_id).removeClass("animation-floating");
                opened_user_chat = user_id;

                $scope.chat_box = [];
                $scope.chat_box.length = 0;

                $("#msgs").html("");

                $timeout(function () {

                    $scope.get_messages(user_id);
                }, 500);


            };

            $rootScope.choose_current_user = function (user) {


                console.log(user.name);
                var img_path = user.avatar;
                var user_name = user.name;
                var user_id = user.id;
                var user_age = user.age;
                var content = "current <a ><img ng-src=" + img_path + " /></a> <p>ID :" + user_id + " , Nom :" + user_name + " , Age : " + user_age + "</p>";


                console.log(content);
                $rootScope.current_img_avt = img_path;
                $rootScope.user_detail = user_name + " -> " + user_age;


                $window.localStorage.setItem("current_user_img_path", img_path);
                $window.localStorage.setItem("current_user_name", user_name);
                $window.localStorage.setItem("current_user_id", user_id);
                $window.localStorage.setItem("current_user_age", user_age);

                var user_name = $window.localStorage.getItem("current_user_name");
                console.log("Local_storage  current_user_name -->" + user_name);


            };


        }])
;



