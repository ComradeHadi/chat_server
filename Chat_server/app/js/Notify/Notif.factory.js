/*
 *  AuthenticationFactory:
 * This Factory is responsible for checking the user status on the client side.
 * */
myApp.factory('Notif_factory', function ($window,$http) {
    var Notification_fact = {

        send_notification : function (query) {

            var host = $window.localStorage.getItem("host");
            var response = $http.post(host + 'add_new_Notification', {
                query: query

            });

            return response;
        },
        set_notification_showed : function (_id_Notif) {


            var host = $window.localStorage.getItem("host");
            console.log("inside set_notification_showed factory");
            var response = $http.post(host + 'set_notification_showed', {
                _id_Notif: _id_Notif
            });

            return response;
        }
    };

    return Notification_fact;
});