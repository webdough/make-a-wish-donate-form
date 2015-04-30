/**
 * @param amount
 * @param type
 * @constructor
 */
function SetAmount(amount, type) {
    if (type == 'sin') {
        $('#txtOther').val(amount);
    }
    else {
        $('#txtOtherReg').val(amount);
    }
}

/**
 * @returns {boolean}
 */
function disableForm() {
    if ($("#form1").bootstrapValidator({}).bootstrapValidator('validate')) {
        $("#ContentPlaceHolderMain_btnSubmit").attr('disabled', 'disabled');
        var noRefresh = document.getElementById("lblProcessing");
        noRefresh.style.display = "inline";
        return true;
    }
    else
    {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
    }
}

$(document).ready(function () {
    $("#dd").parent().hide();

    $('#myTab a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
        $("#hfTabT").val($(this).attr('id'));
        if ($(this).attr('id') == "sin") {
            $("#dd").parent().hide();
            $("#cc").click();
        }
        else {
            var currentDay = (new Date).getDate();
            if ($("#hfTabB").val() == "dd") {
                if (currentDay > 10) {
                    if ($("#radStartDateM1").is(":checked")) {
                        $("#radStartDateM2").click();
                    }
                    $("#radStartDateM1Parent").hide();
                    $("#radStartDateM3Parent").show();
                }
                else {
                    $("#radStartDateM1Parent").show();
                    if ($("#radStartDateM3").is(":checked")) {
                        $("#radStartDateM2").click();
                    }
                    $("#radStartDateM3Parent").hide();
                }

            }
            else {
                if (currentDay > 19) {
                    if ($("#radStartDateM1").is(":checked")) {
                        $("#radStartDateM2").click();
                    }
                    $("#radStartDateM1Parent").hide();
                    $("#radStartDateM3Parent").show();
                }
                else {
                    $("#radStartDateM1Parent").show();
                    if ($("#radStartDateM3").is(":checked")) {
                        $("#radStartDateM2").click();
                    }
                    $("#radStartDateM3Parent").hide();
                }
            }

            $("#dd").parent().show();
        }
    });
    $('#myTab2 a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
        $("#hfTabB").val($(this).attr('id'));

        var currentDay = (new Date).getDate();
        $("#radStartDateM1Parent").show();
        if ($(this).attr('id') == "dd") {
            if (currentDay > 10) {
                if ($("#radStartDateM1").is(":checked")) {
                    $("#radStartDateM2").click();
                }
                $("#radStartDateM1Parent").hide();
                $("#radStartDateM3Parent").show();
            }
            else {
                $("#radStartDateM1Parent").show();
                if ($("#radStartDateM3").is(":checked")) {
                    $("#radStartDateM2").click();
                }
                $("#radStartDateM3Parent").hide();
            }
        }
        else {	//cc
            if (currentDay > 19) {
                if ($("#radStartDateM1").is(":checked")) {
                    $("#radStartDateM2").click();
                }
                $("#radStartDateM1Parent").hide();
                $("#radStartDateM3Parent").show();
            }
            else {
                $("#radStartDateM1Parent").show();
                if ($("#radStartDateM3").is(":checked")) {
                    $("#radStartDateM2").click();
                }
                $("#radStartDateM3Parent").hide();
            }
        }
    });

    $('#txtOther').click(function (e) {
        $('#oneA0').click();
    });

    $('#txtOther').mousedown(function (e) {
        $('#oneA0').click();
    });

    $('#txtOther').focus(function (e) {
        $('#oneA0').click();
    });

    $('#txtOtherReg').click(function (e) {
        $('#regA0').click();
    });

    if ($("#ContentPlaceHolderMain_ddlTitle option:selected").val() != 'Other') {
        $('#ContentPlaceHolderMain_txtTitleOther').hide();
    }
    else {
        $('#ContentPlaceHolderMain_txtTitleOther').show();
    };
    $('#ContentPlaceHolderMain_ddlTitle').on('change', function () {
        if (this.value == 'Other') {
            $('#ContentPlaceHolderMain_txtTitleOther').show();
            $('#ContentPlaceHolderMain_txtTitleOther').focus();
        }
        else {
            $('#ContentPlaceHolderMain_txtTitleOther').hide();
        }
    });

    if ($("#hfTabT").val() == "sin") {
        $("#dd").parent().hide();
    }
    else if ($("#hfTabT").val() == "reg") {
        $("#reg").click();
        //$("#dd").parent().show();
        if ($("#hfTabB").val() == "cc") {
            $("#cc").click();
        }
        else if ($("#hfTabB").val() == "dd") {
            $("#dd").click();
        }
    }

    //$('.btn-group').button();

    $('.carousel').carousel({
        pause: false,
        interval: 7000
    });

    // Handles Bootstrap Popovers
    $('#popcsc').popover({
        trigger: "hover"
    })

    $("#ContentPlaceHolderMain_txtCardNumber").inputmask({
        "mask": "9",
        "repeat": 20,
        "greedy": false
    }); // ~ mask "9" or mask "99" or ... mask "9999999999"
    $("#txtOther").inputmask({
        "mask": "9",
        "repeat": 10,
        "greedy": false
    });
    $("#txtOtherReg").inputmask({
        "mask": "9",
        "repeat": 10,
        "greedy": false
    });
    $("#ContentPlaceHolderMain_txtCardExpiryMonth").inputmask({
        "mask": "9",
        "repeat": 2,
        "greedy": false
    });
    $("#ContentPlaceHolderMain_txtCardExpiryYear").inputmask({
        "mask": "9",
        "repeat": 2,
        "greedy": false
    });
    $("#ContentPlaceHolderMain_txtCsc").inputmask({
        "mask": "9",
        "repeat": 4,
        "greedy": false
    });

    var myRadio1 = $('input[name*=oneAmount]');
    myRadio1.filter(':checked').parent().addClass("active");
    var myRadio2 = $('input[name*=regAmount]');
    myRadio2.filter(':checked').parent().addClass("active");

    $("form input[type=text]").on('input', function () {
        if ($(this).val().length == jQuery(this).attr('maxlength')) {
            $(this).next("input").focus();
        }
    });
});
