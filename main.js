let library = new Library();

let btnAddMember = document.getElementById("btnAddMember");
let btnAddGame = document.getElementById("btnAddGame");
let searchGame = document.getElementById("searchGame");
let searchMember = document.getElementById("searchMember");

btnAddMember.addEventListener("click", () => library.addMember());
btnAddGame.addEventListener("click", () => library.addBoardGame());
searchGame.addEventListener("input", () => library.renderGames());
searchMember.addEventListener("input", () => library.renderMembers());

// TEST DATA
if (!localStorage.getItem("members")) {
    library.members.push(new Member("Juan", "Lopez", 32330210));
    library.members.push(new Member("Maria", "Blanco", 25404321));
    library.members.push(new Member("Axel", "Perez", 47330220));

    library.quantityMembers += 3;
}

if (!localStorage.getItem("games")) {
    library.boardGames.push(new BoardGame("Catan", "Devir", 3, 4, 45, 60));
    library.boardGames.push(new BoardGame("Teg", "Ruibal", 2, 6, 60, 120));
    library.boardGames.push(new BoardGame("Say My Name", "Bureau", 4, 12, 45, 90));
    library.boardGames.push(new BoardGame("Century: Spice Road", "Plan B Games", 2, 5, 45, 60));
    library.boardGames.push(new BoardGame("Magos y Tabernas", "Ludocracia", 3, 4, 30, 40));
    library.boardGames.push(new BoardGame("Toma 6", "Bureau", 2, 10, 45, 60));

    library.quantityGames += 6;
    library.quantityAvailable += 6;
}

library.renderGames();
library.renderMembers();