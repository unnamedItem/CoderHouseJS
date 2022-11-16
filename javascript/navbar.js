let navbarSearchGameBtn = document.getElementById("navbarSearchGameBtn");
let navbarSearchGameInput = document.getElementById("navbarSearchGameInput");


navbarSearchGameBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let gameName = navbarSearchGameInput.value;
    window.location.href = `searchGame.html?gameName=${gameName}`;
});