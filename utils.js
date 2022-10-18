
const isValid = true;
const isNotValid = false;

function askForString(message, validations) {
    let value;
    do {
        value = prompt(message);
    } while (!validations.every(validation => validation(value)));
    return value;
}


function askForNumber(message, validations) {
    let value;
    do {
        value = parseInt(prompt(message));
    } while (!validations.every(validation => validation(value)));
    return value;
}


function validation(message, validator) {
    const validation = function (value) {
        if (validator(value)) {
            return isValid;
        } else {
            alert(message);
            return isNotValid;
        }
    }
    return validation;
}

const isNotNull = (val) => val !== null;
const isNotEmptyString = (str) => String(str).length;
const isNumber = (numb) => Number(numb);
const isNotNumber = (numb) => !Number(numb);
const isNotUndefined = (val) => val !== undefined;
const isBetweenEqual = (a, b) => { return (numb) => a <= numb && numb <= b };
const isLowerThanEqual = (a) => { return (numb) => numb <= a };
const isGreaterThanEqual = (a) => { return (numb) => numb >= a };
