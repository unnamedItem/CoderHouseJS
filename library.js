class Library {
    constructor() {
        this.members = Array();
        this.quantityMembers = Number(0);
        this.boardGames = Array();
        this.quantityGames = Number(0);
        this.quantityReserved = Number(0);
        this.quantityAvailable = Number(0);
    }

    renderMembers() {
        let membersList = document.getElementById("members-list");
        membersList.innerHTML = "";
        this.members.forEach(member => {
            let hr = document.createElement('hr');
            membersList.appendChild(hr);
            member.renderMember(membersList);
        });
    }

    renderGames() {
        let gamesList = document.getElementById("games-list");
        gamesList.innerHTML = "";
        this.boardGames.forEach(game => {
            let hr = document.createElement('hr');
            gamesList.appendChild(hr);
            game.renderGame(gamesList);
        });
    }

    addMember() {
        let firstName = askForString("Ingrese el nombre del nuevo miembro", Array(
            validation("No pude dejar el nombre en blanco", isNotEmptyString),
            validation("No pude dejar el nombre en blanco", isNotNull),
            validation("El nombre no pude ser un número", isNotNumber)
            ));
        let lastName = askForString("Ingrese el apellido del nuevo miembro", Array(
            validation("No pude dejar el apellido en blanco", isNotEmptyString),
            validation("No pude dejar el apellido en blanco", isNotNull),
            validation("El apellido no pude ser un número", isNotNumber)
            ));
        let dni = askForNumber("Ingrese el DNI del nuevo miembro", Array(
            validation("Debe ser un número", isNumber)
        ));
        if (!this.members.find(member => member.dni === dni)) {
            this.members.push(
                new Member(firstName, lastName, dni)
            );
            this.quantityMembers++;
            this.renderMembers();
            this.renderGames();
        } else {
            alert("Ya existe un miembro con ese documento");
        }
    }

    searchMember() {
        if (this.quantityMembers <= 0) {
            alert('No hay miembros');
            return;
        }
        let memberToFind;
        do {
            let dni = askForNumber("Ingrese el DNI del nuevo miembro", Array(
                validation("Debe ser un número", isNumber)
            ));
            memberToFind = this.members.find(member => member.dni === dni);
        } while (!validation("El DNI ingresado no coincide con el de ningún usuario", isNotUndefined)(memberToFind))
        return memberToFind;
    }

    removeMember() {
        let member = this.searchMember();
        let memberIndex = this.members.indexOf(member);
        member.reservedGames.forEach(game => {
            game.returnGame();
            this.quantityAvailable++;
            this.quantityReserved--;
        });
        this.members.splice(memberIndex);
        this.quantityMembers--;
        this.renderMembers();
        this.renderGames();
    }

    addBoardGame() {
        let title = askForString("Ingrese el nombre del juego", Array(
            validation("No puede dejar el titulo en blanco", isNotEmptyString),
            validation("No puede dejar el titulo en blanco", isNotNull),
        ));
        let rating = askForNumber("Ingrese la valoración del juego", Array(
            validation("Debe ser un número", isNumber),
            validation("La valoración no puede ser mayor a diez ni menor cero", isBetweenEqual(0,10))
        ));
        let minPlayers = askForNumber("Ingrese la cantidad mínima de jugadores", Array(
            validation("Debe ser un número", isNumber),
            validation("Debe ser mayor o igual a uno", isGreaterThanEqual(1))
        ));
        let maxPlayers = askForNumber("Ingrese la cantidad máxima de jugadores", Array(
            validation("Debe ser un número", isNumber),
            validation(`Debe ser mayor o igual a la cantidad mínima de jugadores (${minPlayers})`, isGreaterThanEqual(minPlayers))
        ));
        let gameTime = askForNumber("Ingrese la cantidad de minutos que dura el juego", Array(
            validation("Debe ser un número", isNumber),
            validation("Debe ser mayor o igual a cinco minutos", isGreaterThanEqual(5))
        ));
        this.boardGames.push(
            new BoardGame(title, rating, minPlayers, maxPlayers, gameTime)
        );
        this.quantityGames++;
        this.quantityAvailable++;
        this.renderMembers();
        this.renderGames();
    }

    searchGame() {
        let gameToFind;
        do {
            let title = askForString("Ingrese el nombre del juego", Array(
                validation("Ingrese un nombre por favor", isNotEmptyString)
            ));
            gameToFind = this.boardGames.find(game => game.title.toLowerCase() === title.toLowerCase());
        } while (!validation("El nombre ingresado no coincide con ningún juego", isNotUndefined)(gameToFind))
        return gameToFind;
    }

    removeGame() {
        let game = this.searchGame();
        let gameIndex = this.members.indexOf(game);
        let owner = game.owner;
        owner.returnGame(game);
        this.boardGames.splice(gameIndex);
        this.quantityGames--;
        this.quantityAvailable--;
        this.quantityReserved--;
        this.renderMembers();
        this.renderGames();
    }

    reserveGame() {
        if (this.quantityGames <= 0) {
            alert('No hay juegos');
            return;
        } else if (this.quantityAvailable <= 0) {
            alert('No hay juegos disponibles');
            return;
        }
        let game = this.searchGame();
        if (game.reserved) {
            alert("El juego ya está reservado");
            return;
        }
        alert("¿A que miembro quiere reservarle el juego?")
        let member = this.searchMember();
        if (member) {
            member.reserveGame(game);
            game.reserveGame(member);
            this.quantityAvailable--;
            this.quantityReserved++;
            this.renderMembers();
            this.renderGames();
        }
    }

    returnGame() {
        if (this.quantityGames <= 0) {
            alert('No hay juegos');
            return;
        } else if (this.quantityReserved <= 0) {
            alert('No hay juegos reservados');
            return;
        }
        let game = this.searchGame();
        if (!game.reserved) {
            alert("El juego no está reservado");
            return;
        }
        let owner = game.owner;
        if (owner) {
            owner.returnGame(game);
            game.returnGame();
            this.quantityAvailable++;
            this.quantityReserved--;
            this.renderMembers();
            this.renderGames();
        }
    }
}