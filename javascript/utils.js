// Validation functions ==================================================================================
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


// Render functions ======================================================================================
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


function createGameCard(id, title, imgSrc) {
    let card = document.createElement("div");
    card.className = "card bg-dark p-2 pointer";
    card.id = id;

    let image = document.createElement("img");
    image.src = imgSrc;
    image.className = "card-img-top card-game-img";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let cardTitle = document.createElement("h5");
    cardTitle.className = "card-title text-white";
    cardTitle.innerHTML = title;

    cardBody.appendChild(cardTitle);
    card.appendChild(image);
    card.appendChild(cardBody);

    return card;
}


function createCarouselItem(imgSrc, active) {
    let item = document.createElement("div");
    item.className = active ? "carousel-item active" : "carousel-item";

    let image = document.createElement("img");
    image.src = imgSrc;
    image.className = "d-block w-100 game-sheet-carousel-img";

    item.appendChild(image);

    return item;
}


function createCarouselIndicator(carouselId, slideId, active) {
    let indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", `#${carouselId}`);
    indicator.setAttribute("data-bs-slide-to", `${slideId}`);
    indicator.className = active ? "active" : "";

    return indicator;
}


// Other stuff ===========================================================================================
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


function displayAlert(message, type) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
}