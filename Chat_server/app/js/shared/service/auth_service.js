myApp.service('auth_services', [ '$rootScope',  '$window', '$rootScope',
    function (myconfig, $rootScope, $window) {
        var authServices = {};

        authServices.SaveSession = function (data) {

            /* configs */

            $window.localStorage.setItem("host", host);
            $window.localStorage.setItem("isLogged", true);
            $window.localStorage.setItem("isalive", "true");
            $window.localStorage.setItem("token", data.token);
            $window.localStorage.setItem("Cin", data.user.Cin);
            $window.localStorage.setItem("ID", data.user.ID);
            $window.localStorage.setItem("Nom", data.user.Nom);
            $window.localStorage.setItem("Prenom", data.user.Prenom);
            $window.localStorage.setItem("Date_Naiss", data.user.Date_Naiss);
            $window.localStorage.setItem("Sexe", data.user.Sexe);
            $window.localStorage.setItem("Gouvernorat", data.user.Gouvernorat);
            $window.localStorage.setItem("Ville", data.user.Ville);
            $window.localStorage.setItem("Num_Tel", data.user.Num_Tel);
            $window.localStorage.setItem("Role", data.user.Role);
            $window.localStorage.setItem("Facebook", data.user.Facebook);
            $window.localStorage.setItem("E_mail", data.user.E_mail);
            $window.localStorage.setItem("Password", data.user.Password);
            $window.localStorage.setItem("Flag_last_visit", data.user.Flag_last_visit);
            $window.localStorage.setItem("Avatar_path", data.user.Avatar_path);
            $window.localStorage.setItem("user",  data.user.Nom);


        };


        return authServices;
    }]);