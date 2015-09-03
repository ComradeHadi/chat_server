
myApp.factory('shared_factory', function ($http) {
    return {


       /* get_Patient_Profile : function (id_user, callback) {
        var _token ="test_tocken";
        console.log("inside get_Patient_Profile ---> user_ID ---->"+id_user);
        users_AdministrationsFactory.get_patients_Profile(_token, id_user).success(function (data) {


            var user_profile = data.users;
            var userId = user_profile._id;
            var Nom = user_profile.Nom;
            var Prenom = user_profile.Prenom;
            var avatar = user_profile.Avatar_path;
            var Role = user_profile.Role;
            console.log("inside get_Patient_Profile success --->"+Nom);
            var profile = {
                "Nom": Nom,
                "Prenom": Prenom,
                "avatar": avatar,
                "Role": Role
            }
            callback(profile);

        }).error(function (data) {
            alert("error");
            callback(null);

        });


    },*/
    play_sound  : function () {

        var obj = document.createElement("audio");
        var url = ('libs/mylibs/notify.mp3');
        obj.setAttribute("src", url);
        $.get();
        obj.play();

    }



    }
});






