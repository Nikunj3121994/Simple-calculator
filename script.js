/**
 * Created by ibukun on 10/28/2016.
 */
$(document).ready(function () {
    var pressedNumber = null;
    var answer = 0;
    var calculation = {
        firstNumber: "", //1
        operator: null, //2
        secondNumber: "", //3
        lastUpdated: 0 // this will be set to 0 1,2,3 0r 4 depending on which field was last updated.
        // this will also signify when chaining is being done.
    };
    // click listener for the regular numbers
    $(".number").click(function () {
        //if the operator has not been selected, then assign the first number
        if (!calculation.operator) {
            //if an entirely brand new computation is the motive
            if (calculation.lastUpdated === 0 || calculation.lastUpdated === 4) {
                pressedNumber = ($(this).attr("id"));
                calculation.firstNumber = pressedNumber;
                calculation.lastUpdated = 1;
                resetScreen(2);
                updateBottomScreen(pressedNumber);
                //the problem is that after chaining and you want a new computation there's an error.
            }
            else {
                //to update or lengthen the first number
                pressedNumber = ($(this).attr("id"));
                calculation.firstNumber += pressedNumber;
                calculation.lastUpdated = 1;
                updateBottomScreen(pressedNumber);
            }

        }
        /*  if the operator has been set, then assign the second number.
         *  this is the case when either chaining operations is the motive
         *   or anb entirely new computation after the operator has been set is the motive.
         */
        else if (calculation.operator) {
            pressedNumber = ($(this).attr("id"));
            calculation.secondNumber = calculation.secondNumber + pressedNumber;
            calculation.lastUpdated = 3;
            updateBottomScreen(pressedNumber);
        }
    });
    //click listener for the operator keys
    $('.operator').click(function () {
        //if the first number is not set then you should not be allowed to set the operator value.
        if (calculation.lastUpdated === 0) {
            alert("You need to enter a number first");
        }
        //if they already entered the first and 2nd number
        else if (calculation.lastUpdated === 3) {
            answer = math.eval(calculation.firstNumber + calculation.operator + calculation.secondNumber);
            if(answer%1 !== 0){
                answer = answer.toFixed(3);
            }
            else {
                //do nothing
            }
            calculation.firstNumber = answer; //this facilitates chaining the calculations.
            pressedNumber = ($(this).attr("id"));
            calculation.operator = pressedNumber;
            calculation.lastUpdated = 1;
            calculation.secondNumber = "";
            updateTopScreen(answer);
            updateBottomScreen(pressedNumber);

        }
        else {
            pressedNumber = ($(this).attr("id"));
            calculation.operator = pressedNumber;
            calculation.lastUpdated = 2;
            updateTopScreen(pressedNumber);
            updateBottomScreen(pressedNumber);
        }
    });
    //click listener for the equal to operator
    $("#equals").click(function () {

        //if all fields of calculation are not field
        if (calculation.firstNumber === "" || calculation.operator === null || calculation.secondNumber === "") {
            alert("Please enter an expression before clicking the 'equals' button ");
        }
        else {
            // the math.eval method used here is contained in a cdn
            answer = math.eval(calculation.firstNumber + calculation.operator + calculation.secondNumber);
            if(answer%1 !== 0){
                answer = answer.toFixed(3);
            }
            else {
                //do nothing
            }
            calculation.firstNumber = answer; //this facilitates chaining the calculations.
            calculation.operator = null;
            calculation.lastUpdated = 4;
            calculation.secondNumber = "";
            updateTopScreen(answer);
        }
    });
    // click listener for the AC button
    $('#clear').click(function () {
        calculation.firstNumber = "";
        calculation.operator = null;
        calculation.secondNumber = "";
        calculation.lastUpdated = 0;
        resetScreen(1);
        resetScreen(2);
    });

    //click listener for the CE button...this is where the lastUpdated field is used.
    $('#delete').click(function () {
        switch (calculation.lastUpdated) {
            case 1:
                calculation.firstNumber = calculation.firstNumber.substr(0, calculation.firstNumber.length - 1);
                resetScreen(2);
                updateBottomScreen(calculation.firstNumber);
                break;
            case 2:
                calculation.operator = calculation.operator.substr(0, calculation.operator.length - 1);
                resetScreen(2);
                updateBottomScreen(calculation.firstNumber);
                updateBottomScreen(calculation.operator);
                calculation.lastUpdated = 4;
                break;
            case 3:
                calculation.secondNumber = calculation.secondNumber.substr(0, calculation.secondNumber.length - 1);
                resetScreen(2);
                updateBottomScreen(calculation.firstNumber);
                updateBottomScreen(calculation.operator);
                updateBottomScreen(calculation.secondNumber);
                break;
            default:
                calculation.firstNumber = "";
                calculation.operator = null;
                calculation.secondNumber = "";
                calculation.lastUpdated = 0;
                resetScreen(1);
                resetScreen(2);
                break;
        }

    });
    updateTopScreen(0);//default value should be 0
    //function to update top screen
    function updateTopScreen(update) {
        $('#scrn1').val(update);
    }

    //updateBottomScreen(0); //default value should be 0
    //function to update the screen at the bottom.
    function updateBottomScreen(update) {

        var newValue = $('#scrn2').val() + update;
        $('#scrn2').val(newValue);
    }

    //function to reset a screen
    function resetScreen(screen) {
        if (screen === 1) {
            $('#scrn1').val(0);
        }
        else if (screen === 2) {
            $('#scrn2').val("");
        }
    }
});