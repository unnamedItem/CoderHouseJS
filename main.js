let library = new Library();

let btnAddMember = document.getElementById("btn-add-member");
let btnRemoveMember = document.getElementById("btn-remove-member");
let btnAddGame = document.getElementById("btn-add-game");
let btnRemoveGame = document.getElementById("btn-remove-game");
let btnReserveGame = document.getElementById("btn-reserve-game");
let btnReturnGame = document.getElementById("btn-return-game");

btnAddMember.addEventListener("click", () => library.addMember());
btnRemoveMember.addEventListener("click", () => library.removeMember());
btnAddGame.addEventListener("click", () => library.addBoardGame());
btnRemoveGame.addEventListener("click", () => library.removeGame());
btnReserveGame.addEventListener("click", () => library.reserveGame());
btnReturnGame.addEventListener("click", () => library.returnGame());

// TEST DATA
library.members.push(new Member("Juan", "Lopez", 32330210));
library.members.push(new Member("Maria", "Blanco", 25404321));
library.members.push(new Member("Axel", "Perez", 47330220));
library.quantityMembers = 3;

library.boardGames.push(new BoardGame("Catan", 8, 3, 4, 45));
library.boardGames.push(new BoardGame("Teg", 5, 2, 6, 90));
library.boardGames.push(new BoardGame("Say My Name", 7, 4, 12, 90));
library.boardGames.push(new BoardGame("Century: Spice Road", 7, 2, 5, 90));
library.boardGames.push(new BoardGame("Magos y Tabernas", 6, 3, 4, 40));
library.quantityGames = 5;
library.quantityAvailable = 5;
library.quantityReserved = 0;

library.renderGames();
library.renderMembers();
