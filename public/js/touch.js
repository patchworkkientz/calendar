/**
 * Created by patch on 1/27/18.
 */

var timeSlot = [].slice.call(document.getElementsByClassName("time"));
var modal = document.getElementById("myModal");
var checkbox = document.querySelectorAll('input[type="checkbox"]');
var select = document.getElementById("start");
var next = document.getElementById("end");

var days = {"sun": "Sunday", "mon": "Monday", "tue": "Tuesday", "wed": "Wednesday", "thu": "Thursday", "fri": "Friday", "sat": "Saturday"};

timeSlot.forEach(function (element, index){
    element.addEventListener("touchstart", function() {
        modal.style.display = "block";
        var t = timeSlot[index].childNodes[1].id;
        for (var key in days) {
            if (key == t.substring(0, 3)) {
                document.getElementById("day").innerText = days[key];
            }
        }
        document.getElementById("day").setAttribute("data-value", t.substring(0, 3));
        t = t.substring(3, t.length);
        setSelectedValue(select, t);
        document.getElementById("sub").disabled = true; // disable some things for a moment so not clicked when checkbox behind is pressed
        document.getElementById("clo").disabled = true;
        document.getElementById("start").disabled = true;
        document.getElementById("end").disabled = true;
        setTimeout(function() {
            document.getElementById("sub").disabled = false;
            document.getElementById("clo").disabled = false;
            document.getElementById("start").disabled = false;
            document.getElementById("end").disabled = false;
        }, 500);
    });
});

function exitModal() {
    next.options[0].selected = true;
    modal.style.display = "none";
}

function highlighter() {
    var startTime, endTime;
    var day = document.getElementById("day").getAttribute('data-value');
    var dayAndTime = [], all = [];
    for (var i = 0; i < checkbox.length; i++) {
        for (var j = 0; j < select.options.length; j++) {
            if (select.options[j].selected) {
                startTime = select.options[j].value;
            }
        }
        for (j = 0; j < next.options.length; j++) {
            if (next.options[j].selected) {
                endTime = next.options[j].value;
            }
        }
        all.push(checkbox[i].id);
    }
    var go, stop;
    for (j = 0; j < all.length; j++) {
        if (all[j] == day + startTime) {
            go = j;
        }
        if (all[j] == day + endTime) {
            stop = j;
        }
    }
    if (go <= stop) {
        for (i = go; i <= stop; i++) {
            checkbox[i].checked = true;
        }
    }
    else {
        for (i = go; i >= stop; i--) {
            checkbox[i].checked = true;
        }
    }
    next.options[0].selected = true;
    modal.style.display = "none";
}

function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].value == valueToSet) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}