myApp.service('sharedProperties', function ($rootScope) {
    var property = 'the value is Null';
    var id_user_property;
    var scope;

    return {
        getProperty: function () {
            console.log("inside sharedProperties getProperty -->"+property);
            return property;
        },
        get_user_id_Property: function () {
            console.log("inside sharedProperties getProperty -->"+id_user_property);
            return id_user_property;
        },
        setProperty: function(appoint_data) {
            console.log("inside sharedProperties setProperty --->"+appoint_data.Patient_Nom);
            $rootScope.Patient_Nom_lab =appoint_data.Patient_Nom;
            $rootScope.Patient_Nom_lab = appoint_data.Patient_Nom ;
            $rootScope.Patient_Prenom_lab = appoint_data.patient_Prenom;
            $rootScope.Patient_Date_naissance_lab = appoint_data.Patient_date_naissance;
            $rootScope.Patient_Avatar = appoint_data.Patient_Avatar;
            $rootScope.Nom_Medecin = appoint_data.Doctor_Nom+""+appoint_data.Doctor_Prenom;
            $rootScope.Doctor_Spec = appoint_data.Doctor_Spec;
            $rootScope._id_appoint = appoint_data._id_appoint;


            property = appoint_data._id_appoint;
            id_user_property = appoint_data._id_patient;
        }





    };
});