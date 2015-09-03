myApp.factory('home_factory', function ($q, $http, $window, $location) {


    var host = "http://localhost:8000/";
    //var host = "http://192.168.0.100:8000/";
    var home_fact = {


        get_all_users: function () {

            /*  var host = $window.localStorage.getItem("host");*/

            var response = $http.get(host + 'get_all_users', {});


            console.log('response ---> ' + response.msg);
            return response;

        },


        load_http_msgs_services: function (i, max, promises) {


            if (i < max) {

                $timeout(function () {
                    var query = {name: "user_name" + i, email: "user_mail" + i};
                    promises.push($http({
                        url: host + 'create_user',
                        method: "POST",
                        async: true,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: query
                    }));
                    var x = i + 1;
                    home_fact.load_http_services(x, max, promises);

                }, 110);


            } else {

                $q.all(promises).then(function (response) {
                    console.log(response);
                    var i = 1;
                    while (i < max) {

                        $("#console").append("<div style='margin-top: 5px;color: green' class='msg_console'>" + response[i - 1].data.msg + "</div>");
                        i++;
                    }


                    return response;
                });


            }


        },


        send_message: function (promises) {


            $q.all(promises).then(function (response) {
                console.log(response);

                return response;

            });


            /* var response = $http({
             method: 'POST',
             url: host + 'sendmessage',
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
             data: query
             });


             console.log('response ---> ' + response.msg);
             return response;*/

        },


        user_is_typing: function (query) {




             var response = $http({
             method: 'POST',
             url: host + 'user_is_typing',
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
             data: query
             });


            // console.log('response ---> ' + response.status);
             return response;

        },
        get_messages: function (query) {

            var response = $http({
                method: 'POST',
                url: host + 'get_messages',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: query
            });


            //console.log('response ---> ' + response);
            return response;

        }


    }

    return home_fact;
});




