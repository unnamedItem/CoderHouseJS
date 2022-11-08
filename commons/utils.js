
const isValid = true;
const isNotValid = false;

function checkValidations(value, element, validations) {
    if(!validations.every(validation => validation(value))) {
        element.className = "form-control is-invalid";
        return isNotValid;
    } else {
        element.className = "form-control is-valid";
        return isValid;
    }
}


function validation(message, element, validator) {
    const validation = function (value) {
        if (validator(value)) {
            return isValid;
        } else {
            element.innerHTML = message;
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
const isNotIncluded = (list, key=null) => { return (val) => !list.find(item => item[key] === val) }
const isIncluded = (list, key=null) => { return (val) => list.find(item => item[key] === val) }


function createListItem(title, info, body, footer, collapseId) {
    let listItem = document.createElement("a");
    listItem.setAttribute("data-bs-toggle", "collapse");
    listItem.href = collapseId;
    listItem.className = "list-group-item list-group-item-action";

    let listItemHeader = document.createElement("div");
    listItemHeader.className = "d-flex w-100 justify-content-between";
    let listItemHeaderTitle = document.createElement("h5");
    listItemHeaderTitle.innerHTML = title;
    let listItemHeaderInfo = document.createElement("small");
    listItemHeaderInfo.innerHTML = info;
    listItemHeader.appendChild(listItemHeaderTitle);
    listItemHeader.appendChild(listItemHeaderInfo);

    let listItemBody = document.createElement("p");
    listItemBody.className = "mb-1";
    listItemBody.appendChild(body);

    let listItemFooter = document.createElement("small");
    listItemFooter.appendChild(footer);

    listItem.appendChild(listItemHeader);
    listItem.appendChild(listItemBody);
    listItem.appendChild(listItemFooter);
    
    return listItem;
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}