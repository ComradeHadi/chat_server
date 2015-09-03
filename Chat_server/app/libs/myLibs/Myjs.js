$('.notif_row').click(function () {
    alert("clicked");
    // var unhide = $(this).data("faculty");
});


/* Select option Styling */
function show_Text() {

    $('.wrapper-dropdown-2').removeClass('animation-pullUp');
    $('.wrapper-dropdown-2').css('opacity', '0.5');

}
function DropDown(el) {
    this.dd = el;
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = [];
    this.index = [];
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            event.stopPropagation();
        });

        obj.opts.children('label').on('click', function (event) {
            var opt = $(this).parent(),
                chbox = opt.children('input'),
                val = chbox.val(),
                idx = opt.index();

            ($.inArray(val, obj.val) !== -1) ? obj.val.splice($.inArray(val, obj.val), 1) : obj.val.push(val);
            ($.inArray(idx, obj.index) !== -1) ? obj.index.splice($.inArray(idx, obj.index), 1) : obj.index.push(idx);
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
}

$(function () {

    var main_appoint_admins_DoctorName = new DropDown($('#main_appoint_admins_DoctorName'));
    var user_modal_Doctor_Name_ID = new DropDown($('#user_modal_Doctor_Name_ID'));
    var Appoint_Type_id = new DropDown($('#Appoint_Type_id'));
    var medication_dropDown = new DropDown($('#medication_dropDown'));
    var element_dropDown = new DropDown($('#element_dropDown'));
    var nb_fois_dropDown = new DropDown($('#nb_fois_dropDown'));

    var nb_fois_input_dropDown = new DropDown($('#nb_fois_input_dropDown'));
    var nb_fois_label_input_dropDown = new DropDown($('#nb_fois_label_input_dropDown'));
    var durant_input_dropDown = new DropDown($('#durant_input_dropDown'));
    var durant_label_input_dropDown = new DropDown($('#durant_label_input_dropDown'));

    $(document).click(function () {
        // all dropdowns
        $('.wrapper-dropdown-4').removeClass('active');
    });

});

/* Select option Styling */


function showPicker() {

    $('.datepicker').css("z-index", "99999");
    $('.datepicker').fadeIn(500);
}
function show_Time_Picker() {

    $('.bootstrap-datetimepicker-widget').addClass("animation-expandUp");
}


$('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show')
});


$("#dropzone").on("dragenter", function () {
    $("#dropzone").css("border-color", "rgb(67, 132, 65)");

}).on("dragleave", function () {
    $("#dropzone").css("border-color", "#FFF");

});
$("#dropzone").mouseenter(
    function () {
        $("#dropzone").css("border-color", "rgb(67, 132, 65)");
    }
).mouseleave(function () {
        $("#dropzone").css("border-color", "#FFF");
    });

function init_new_user() {

    $("#Add_user_Cin").val("");
    $("#Add_user_Nom").val("");
    $("#Add_user_Prenom").val("");
    $("#add_user_Gouvernorat").val("");
    $("#add_user_Ville").val("");
    $("#add_user_Tel").val("");
    $("#add_userdate_naiss").val("");
    $("#facebook_path").val("");
    $("#add_user_Email").val("");
    $("#add_user_Password").val("");
    $("#profile_avatar_TxtPath").val("");
    $("#dropzone").css("background", "");
    $('.SuccesIcon').css("display", "none");


}


function show_update_form() {

    $("#Update_Form").hide();
    $("#Update_Form").css("display", "block");
    $("#Update_Form").show();
    $("#Update_Form").addClass("animation-pullUp");
}


function hide_update_form() {

    $("#Update_Form").removeClass("animation-pullUp");
    $("#Update_Form").hide(500);

}


var is_datepicker_open = false;
function openPicker() {


    if (!is_datepicker_open) {

        $("#WelcomeDatetime").css("display", "inline-block");
        $("#datepickedbutton").removeClass("fa fa-calendar-o");
        $("#datepickedbutton").addClass("fa fa-check");
        $("#WelcomeDatetime").css("margin-left", "-57%");
        $("#datepickerblock").animate({"margin-bottom": '-10%'}, "slow");
        $("#WelcomeDatetime").animate({"margin-left": '0%', opacity: '1'}, "slow");
        $("#WelcomeDatetime").show(200);
        is_datepicker_open = true;

    }
    else {

        $("#datepickedbutton").addClass("fa fa-calendar-o");
        $("#datepickedbutton").removeClass("glyphicon glyphicon-calendar");
        $("#datepickerblock").animate({"margin-bottom": '0%'}, "slow");
        $("#WelcomeDatetime").animate({"margin-left": '-20%', opacity: '1'}, "slow");
        $("#WelcomeDatetime").animate({"margin-left": '80%', opacity: '0'}, "fast");
        $("#WelcomeDatetime").hide(200);
        is_datepicker_open = false;
    }
}


/* date Time Picker*/

// init jquery functions and plugins
$(document).ready(function () {
    $.getScript('//cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js', function () {
        $.getScript('//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker.min.js', function () {
            $.getScript('//cdnjs.cloudflare.com/ajax/libs/moment.js/2.6.0/moment.min.js', function () {
                $.getScript('//cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/3.0.0/js/bootstrap-datetimepicker.min.js', function () {
                    $.getScript('//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js', function () {


                        /* var today = new Date();
                         var dd = today.getDate();
                         var mm = today.getMonth()+1; //January is 0!
                         var yyyy = today.getFullYear();
                         var date = dd+"/"+mm+"/"+yyyy;
                         $('#Patient_Find_by_Date_naissance').val(date);
                         $('#Patient_Find_by_Date_start').val(date);
                         $('#Patient_Find_by_Date_end').val(date);*/

                        /* $('.datepicker ').addClass("setIndex");



                         $('#datepicker').datepicker({
                         autoclose:true
                         }).on("changeDate", function(e){
                         console.log(e.date);
                         });
                         $('#datepicker_start').datepicker({
                         autoclose:true
                         }).on("changeDate", function(e){
                         console.log(e.date);

                         });
                         /* $('#datepicker_end').datepicker({
                         autoclose:false
                         }).on("changeDate", function(e){
                         console.log(e.date);
                         });*/
                        /*  $('#datepicker_naissance').datepicker({
                         autoclose:true
                         }).on("changeDate", function(e){
                         console.log(e.date);
                         });*/


                        $('.datepicker ').addClass("setIndex");
                        /*  $('#datepicker').datepicker({
                         autoclose:true
                         }).on("changeDate", function(e){
                         console.log(e.date);
                         });*/
                        $('#timepicker').datetimepicker({
                            pickDate: false
                        });
                        $('#timepicker_new_Appoint').datetimepicker({
                            pickDate: false
                        });
                        $('#notif_timepicker_Appoint').datetimepicker({
                            pickDate: false
                        });

                        /*   $('#datepicker_Appoint').datepicker({
                         autoclose:true
                         }).on("changeDate", function(e){
                         console.log(e.date);
                         });*/


                    });//script
                });//script
            });//script
        });//script
    });//script
});//script


/* end date Piker */


function showForgetModal() {
    $("#myModal").modal("show");
}
/* dropZone */


$(function () {


    $('#dropzone').on('dragover', function () {
        $(this).addClass('hover');
    });

    $('#dropzone').on('dragleave', function () {
        $(this).removeClass('hover');
    });

    $('#dropzone input').on('change', function (e) {
        var file = this.files[0];

        $('#dropzone').removeClass('hover');

        if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
            return alert('File type not allowed.');
        }

        $('#dropzone').addClass('dropped');
        $('#dropzone img').remove();

        if ((/^image\/(gif|png|jpeg)$/i).test(file.type)) {
            var reader = new FileReader(file);

            reader.readAsDataURL(file);

            reader.onload = function (e) {
                var data = e.target.result,
                    $img = $('<img />').attr('src', data).fadeIn();

                $('#dropzone div').html($img);
            };
        } else {
            var ext = file.name.split('.').pop();

            $('#dropzone div').html(ext);
        }


    });
});


/* end dropZone*/





/*  auth page */
function showLogin() {

    $("#registerWrap").fadeOut(500);
    $("#LoginWrap").fadeIn(500);

    $("#registerWrap").css("display", "none");
    $("#LoginWrap").css("display", "block");
    $('.form-signin-heading').html("Authentifcation");
    $("html, body").animate({scrollTop: $('.container').offset().top}, 1500);


}
function showregister() {
    $("#LoginWrap").fadeOut(500);

    $("#registerWrap").fadeIn(500);

    $("#LoginWrap").css("display", "none");
    $("#registerWrap").css("display", "block");
    $('.form-signin-heading').html("Inscription");
}
/*  auth page  End */






/* Profile page Start */


function showIcon() {
    $("#icon_picture").css('opacity', '1');
}
function hideIcon() {
    $("#icon_picture").css('opacity', '0');
}


function closeAll_tabs() {

    $("#Config_tab").removeClass("active");
    $("#Exam_tab").removeClass("active");
    $("#histo_tab").removeClass("active");
    $("#Calendar_tab").removeClass("active");


    $("#Config_Tab_Content").css("display", "none");
    $("#histo_Tab_Content").css("display", "none");
    $("#Calendar_Tab_Content").css("display", "none");
    $("#Exam_Tab_Content").css("display", "none");


}

function showSetting_tab() {
    closeAll_tabs();
    $("#Config_tab").addClass("active");
    $("#Config_Tab_Content").css("display", "block");
}
function showExamination_tab() {
    closeAll_tabs();
    $("#Config_tab").addClass("active");
    $("#Exam_Tab_Content").css("display", "block");
}
function showHistorique_tab() {
    closeAll_tabs();
    $("#Config_tab").addClass("active");
    $("#histo_Tab_Content").css("display", "block");
}
function showCalendar_tab() {
    closeAll_tabs();
    $("#Config_tab").addClass("active");
    $("#Calendar_Tab_Content").css("display", "block");
}


function animate(element) {
    element.fadeOut(500);
    element.fadeIn(500);


}

var step = 0;
var maxSteps = 2;

$("#previousStepCl").css("display", "none");


function previouspanel() {


    if (step > 0) {
        $("#previousStepCl").css("display", "block");
        $("#wizard-vertical-p-" + step).css("display", "none");
        $("#tabwiz" + step).removeClass("first current");
        $("#tabwiz" + step).addClass("done");
        step--;
        $("#wizard-vertical-p-" + step).css("display", "block");
        $("#tabwiz" + step).removeClass("done");
        $("#tabwiz" + step).addClass("first current");
        animate($("#wizard-vertical-p-" + step));
    }

    if (step == 0) {
        $("#previousStepCl").css("display", "none");


    }
    else {
        $("#previousStepCl").css("display", "block");

    }

    if (step == maxSteps) {
        $("#NextStepCl").css("display", "none");
        $("#FinishStepCl").css("display", "block");

    }
    else {
        $("#NextStepCl").css("display", "block");
        $("#FinishStepCl").css("display", "none");

    }
}

function nextPanel() {
    if (step < maxSteps) {
        $("#NextStepCl").removeClass("disabled");
        $("#wizard-vertical-p-" + step).css("display", "none");
        $("#tabwiz" + step).removeClass("first current");
        $("#tabwiz" + step).addClass("done");
        step++;
        $("#wizard-vertical-p-" + step).css("display", "block");
        $("#tabwiz" + step).removeClass("done");
        $("#tabwiz" + step).addClass("first current");
        animate($("#wizard-vertical-p-" + step));
    }

    if (step == maxSteps) {
        $("#NextStepCl").css("display", "none");
        $("#FinishStepCl").css("display", "block");

    }
    else {
        $("#NextStepCl").css("display", "block");
        $("#FinishStepCl").css("display", "none");

    }

    if (step == 0) {
        $("#previousStepCl").css("display", "none");


    }
    else {
        $("#previousStepCl").css("display", "block");

    }

}


/* Profile page End */

/* template sidebar */


var isLeftMenu_visible = true;
function hideLeftMenu() {
    if (isLeftMenu_visible) {
        $('#sidebar').removeClass("hide-left-bar");
        isLeftMenu_visible = false;
    }
    else {
        $('#sidebar').addClass("hide-left-bar");
        isLeftMenu_visible = true;
    }
}

var isRightSidebar_visible = false;
function hideRightMenu() {
    if (!isRightSidebar_visible) {
        $('#right-sidebar').removeClass("open-right-bar");
        isRightSidebar_visible = true;
    }
    else {
        $('#right-sidebar').addClass("open-right-bar");
        isRightSidebar_visible = false;
    }
}

var isSub_Admin_Open = false;
function showSubAdmin() {
    if (!isSub_Admin_Open) {
        $('#subAdmin').css("display", "block");
        isSub_Admin_Open = true;
    }
    else {
        $('#subAdmin').css("display", "none");
        isSub_Admin_Open = false;
    }
}

