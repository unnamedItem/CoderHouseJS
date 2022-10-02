// calculator options
const ADD = 1;
const SUBTRACT = 2;
const DIVIDE = 3;
const MULTIPLY = 4;
const AVERAGE = 5;
const EXIT = 0;

// messages
const optionsMessage = "Elija una opción: \n"
    + ADD + ": Sumar\n"
    + SUBTRACT + ": Restar\n"
    + DIVIDE + ": Dividir\n"
    + MULTIPLY + ": Multiplicar\n"
    + AVERAGE + ": Promedio\n"
    + EXIT + ": Salir";
const defaultPromptMessage = "Ingrese un número por favor.";
const averagePromptMessage = "¿Cuantos valores quiere ingresar?";
const badInput = "No es un número.";
const notAnOption = "No es una opción valida.";
const doNotDivideByZero = "No se puede dividir por cero.";
const resultIs = "El resultado es: ";


function askForFloat(message, zeroIncluded=true) {
    let number;
    do {
        number = parseFloat(prompt(message));
        if (!zeroIncluded && number === 0) {
            alert(doNotDivideByZero)
        } else if (!number && number !== 0) {
            alert(badInput);
        }
    } while ((!number && number !== 0) || (!zeroIncluded && number === 0));
    return number;
}


function askForInt(message, zeroIncluded=true) {
    let number;
    do {
        number = parseInt(prompt(message));
        if (!zeroIncluded && number === 0) {
            alert(doNotDivideByZero)
        } else if (!number && number !== 0) {
            alert(badInput);
        }
    } while ((!number && number !== 0) || (!zeroIncluded && number === 0));
    return number;
}


function add() {
    let numb1 = askForFloat(defaultPromptMessage);
    let numb2 = askForFloat(defaultPromptMessage);
    return numb1 + numb2;
}


function subtract() {
    let numb1 = askForFloat(defaultPromptMessage);
    let numb2 = askForFloat(defaultPromptMessage);
    return numb1 - numb2;
}


function divide() {
    let numb1 = askForFloat(defaultPromptMessage);
    let numb2 = askForFloat(defaultPromptMessage, false);
    return numb1 / numb2;
}


function multiply() {
    let numb1 = askForFloat(defaultPromptMessage);
    let numb2 = askForFloat(defaultPromptMessage);
    return numb1 * numb2;
}


function average() {
    let amountOfValues = askForInt(averagePromptMessage);
    let total = 0;
    for (let i = 0; i < amountOfValues; i++) {
        total += askForFloat(defaultPromptMessage);
    }
    return total / amountOfValues;
}


function calculator() {
    let isRunning = true;

    do {
        let option = parseInt(prompt(optionsMessage));

        switch (option) {
            case ADD:
                alert(resultIs + add());
                break;

            case SUBTRACT:
                alert(resultIs + subtract());
                break;

            case DIVIDE:
                alert(resultIs + divide());
                break;

            case MULTIPLY:
                alert(resultIs + multiply());
                break;

            case AVERAGE:
                alert(resultIs + average());
                break;
            
            case EXIT:
                isRunning = false;
                break;
        
            default:
                alert(notAnOption);
                break;
        }
    } while (isRunning);
}


calculator();