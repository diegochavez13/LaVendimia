//Functions for KeyPress Event
//arrCharacteres = [38, 9, 10, 13, 24, 32, 127];

function onlyLetter(ev) {
    if (!((ev.which >= 64 && ev.which <= 90) || (ev.which >= 97 && ev.which <= 122))) {
        if (ev.which != 32) //space
            if (ev.which != 46) //point
                ev.preventDefault();
    }
}
//188
function onlyLetterWithComma(ev) {
    if (!((ev.which >= 64 && ev.which <= 90) || (ev.which >= 97 && ev.which <= 122))) {
        if (ev.which != 32) //space
        {
            if (ev.which != 46) //point
            {
                if (ev.which != 44) //Comma
                    ev.preventDefault();
            }
        }
    }
}
function onlyCharactersAlphanumerics(ev) {
    if (!((ev.which >= 64 && ev.which <= 90) || (ev.which >= 97 && ev.which <= 122))) {//Leters
        if (!(ev.which >= 48 && ev.which <= 57)) //Numbers
        {
            if (ev.which != 32) //space
            {
                if (ev.which != 46) //point
                    ev.preventDefault();
            }
        }
    }
}
function onlyCharactersAlphanumericsWithComma(ev) {
    //alert(ev.which);
    if (!((ev.which >= 64 && ev.which <= 90) || (ev.which >= 97 && ev.which <= 122))) {//Leters
        if (!(ev.which >= 48 && ev.which <= 57)) //Numbers
        {
            if (ev.which != 32) //space
            {
                if (ev.which != 46) //point
                {
                    if (ev.which != 44) //Comma
                    {
                        if (ev.which != 95) //_
                        {
                            if (ev.which != 45) //-
                                ev.preventDefault();
                        }
                    }
                }
            }
        }
    }
}
function validEmail(control) {
    var a = true;
    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (!regex.test($('#' + control).val().trim())) {
        a = false;
    }
    return a;
}

function onlyNumbers(ev)
{
    if (!(ev.which >= 48 && ev.which <= 57)) //Numbers
    {
        ev.preventDefault();
    }
}

function Decimal(event) {
    if ((/[^0-9\.]/g.test(String.fromCharCode(event.which)) || event.which == 39
		|| event.which == 37) && event.which != 8) {
        event.preventDefault();
    } else if (String.fromCharCode(event.which) == '.' && (event.target.value.indexOf('.') > -1
			|| event.target.value == '')) {
        event.preventDefault();
    }
}

function Numeric(event) {
    if ((/[^0-9]/g.test(String.fromCharCode(event.which)))) {
        event.preventDefault();
    }
}
