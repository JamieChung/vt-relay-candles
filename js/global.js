
var info = "";

function setupPage() {
    $.get(__proxy + "http://vtrelay.alwaysdata.net/teams/candles/all/", function (data, status) {
        for (item in data) {
            record = data[item];
            if (record.team_signup == true && record.team_type == "RT") {
                record.team_name = new String(record.team_name);
                record.team_event_milestone_candles = parseInt(record.team_event_milestone_candles);
                record.team_email_milestone_candles = parseInt(record.team_email_milestone_candles);
                record.team_donation_milestone_candles = parseInt(record.team_donation_milestone_candles);
                record.team_candles_total = parseInt(record.team_candles_total);
            } else {
                delete data[item];
            }
        }
        sortResult(data);
    });
}

function setupTable(data) {
    document.getElementById("loadingImg").style.display = "none";
    for (var item in data) {
        record = data[item];
        record['position'] = parseInt(item) + 1;
        $("#team_table_body").append("<tr class='teamRow' id=" + item + "><td id='teamRowPosition'>" + record.position + "</td><td class='teamRowFirstName'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + record.team_name + "</td><td id='teamRowMilestone'>" + record.team_donation_milestone_candles + "</td><td id='teamRowEmails'>" + record.team_email_milestone_candles + "</td><td id='teamRowEvents'>" + record.team_event_milestone_candles + "</td><td id='teamRowTotal'>" + record.team_candles_total + "</td></tr>");
    }
    jQuery("#forScroll").mCustomScrollbar("update");
}

function sortResult(data) {
    data = data.sort(function (a, b) {
        var prop = "team_candles_total";
        if (b[prop] instanceof String) {
            a[prop] = a[prop].toLowerCase();
            b[prop] = b[prop].toLowerCase();
        }
        if (b[prop] > a[prop]) {
            return 1;
        }
        if (b[prop] < a[prop]) {
            return -1;
        } else {
            return (compareThings(a["team_name"], b["team_name"]));
        }

        // return (compareThings(b["team_candles_total"], a["team_candles_total"]));
    });
    setupTable(data);
    info = data;
}

// Search bar

$(document).ready(function ($) {
    jQuery.expr[":"].contains = jQuery.expr.createPseudo(function (arg) {
        return function (elem) {
            return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });

    function listFilter(list) {
        var input = $("#searchBox");

        $(input)
            .change(function () {
            var filter = $(this).val();
            if (filter) {
                $('tr').find("td:not(:Contains(" + filter + "))").parent().hide();
                $('tr').find("td:Contains(" + filter + ")").parent().show();
                $("#forScroll").mCustomScrollbar("update");
            } else {
                $('tr').show();
            }
            $("#forScroll").mCustomScrollbar("update");
            return false;
        })
            .keyup(function () {
            $(this).change();
        });
    }

    $(function () {
        listFilter($(".teamRow"));
    });
}(jQuery));


//Feedback slide up

$(document).ready(function () {
    //$(":not('#feedbackTab')").click(function () {
    //    $("#feedbackBody").slideDown();
    //});
    $("#feedbackTab").click(function (event) {
        if ($("#feedbackBody").hasClass("up")) {
            $("#feedbackBody").slideUp();
            $("#feedbackBody").removeClass("up");
        } else {
            $("#feedbackBody").slideDown();
            $("#feedbackBody").addClass("up");
        }
        event.stopPropagation();
    });
    $("#feedbackBody").click(function (event) {
        event.stopPropagation();
    });
    $("body").click(function (event) {
        event.stopPropagation();
        if ($("#feedbackBody").hasClass("up")) {
            $("#feedbackBody").slideUp();
            $("#feedbackBody").removeClass("up");
        }
    });
});


//Column sorting

//$('#sorterHeader tr th').hover(function() {
//$(this).addClass




$(function () {
    $('#sorterHeader tr th').click(function () {
        var id = $(this).attr('id');
        var asc = (!$(this).attr('asc')); // switch the order, true if not set

        // set asc="asc" when sorted in ascending order
        $('#sorterHeader tr th').each(function () {
            $(this).removeAttr('asc');
        });
        if (asc) $(this).attr('asc', 'asc');

        sortResults(id, asc);
    });

});

function sortResults(prop, asc) {
    arr = info;
    arr = arr.sort(function (a, b) {
        var thing1 = a[prop];
        var thing2 = b[prop];
        if (thing1 instanceof String) {
            thing1 = thing1.toLowerCase();
            thing2 = thing2.toLowerCase();
        }
        if (asc) {
            if (thing1 > thing2) {
                return 1;
            }
            if (thing1 < thing2) {
                return -1;
            } else {
                return (compareThings(a["team_name"], b["team_name"]));
            }
        } else {
            if (thing2 > thing1) {
                return 1;
            }
            if (thing2 < thing1) {
                return -1;
            } else {
                return (compareThings(a["team_name"], b["team_name"]));
            }
        }

        // return (compareThings(a[prop] , b[prop]));
        // else return (compareThings(b[prop] , a[prop], a, b));
    });

    showResults(arr);
}

function compareThings(thing1, thing2) {
    if (thing1 instanceof String) {
        thing1 = thing1.toLowerCase();
        thing2 = thing2.toLowerCase();
    }
    if (thing1 < thing2) {
        return -1;
    } else {
        return 1;
    }
}

function showResults(arr) {
    var html = '';
    for (var e in arr) {
        items = arr[e];
        html += "<tr class='teamRow' id=" + e + "><td id='teamRowPosition'>" + items.position + "</td><td class='teamRowFirstName'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + items.team_name + "</td><td id='teamRowMilestone'>" + items.team_donation_milestone_candles + "</td><td id='teamRowEmails'>" + items.team_email_milestone_candles + "</td><td id='teamRowEvents'>" + items.team_event_milestone_candles + "</td><td id='teamRowTotal'>" + items.team_candles_total + "</td></tr>";
    }
    $('#team_table_body').html(html);
}