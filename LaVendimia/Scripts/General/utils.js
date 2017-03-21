function __initComponents__(){
    initCustomTags();
    $('input').keydown(function (event) {
        tabOnEnter(this, event);
    });
    $('select').keydown(function (event) {
        tabOnEnter(this, event);
    });
    $('button').keydown(function (event) {
        tabOnEnter(this, event);
    });

    Numerics("numeric", false, false);

    /*$(".dd-nodrag").on("dragstart", function(event) { // mousedown prevent nestable click
        event.preventDefault();
        return false;
    });*/

    /*$(".dd-nodrag").not("label").on("click", function(event) { // click event
        // event.preventDefault();
        return false;
    });*/
}

function getNextElement(field) {
    var elements = $('[id]');
    for (var e = 0; e < elements.length; e++) {
        if (field == elements[e]) {
            break;
        }
    }

    return elements[++e % elements.length];
}

function tabOnEnter(field, evt) {
    if (field.nodeName === "BUTTON" && evt.keyCode === 13)
        field.click();

    if (evt.keyCode === 13 || (evt.keyCode===9 && !evt.shiftKey)) {
        if (evt.preventDefault) {
            evt.preventDefault();
        } else if (evt.stopPropagation) {
            evt.stopPropagation();
        } else {
            evt.returnValue = false;
        }

        var nextField = getNextElement(field);
        //alements allowed to recived focus
        var allowedElems=["INPUT","SELECT","TEXTAREA","BUTTON"];
        while (allowedElems.indexOf(nextField.nodeName) == -1 || nextField.disabled || nextField.readOnly || nextField.hidden || !$(nextField).is(":visible")) {
            nextField = getNextElement(nextField);
        }

        nextField.focus();
        return false;
    } else {
        return true;
    }
}