class Library {
    constructor() {
        this.members = Array();
        this.quantityMembers = Number(0);
        this.boardGames = Array();
        this.quantityGames = Number(0);
        this.quantityReserved = Number(0);
        this.quantityAvailable = Number(0);

        // MEMBERS FORM ELEMENTS
        this.inputMemberName = document.getElementById("memberName");
        this.inputMemberNameFeedback = document.getElementById("memberNameFeedback");
        this.inputMemberLastName = document.getElementById("memberLastName");
        this.inputMemberLastNameFeedback = document.getElementById("memberLastNameFeedback");
        this.inputMemberDNI = document.getElementById("memberDNI");
        this.inputMemberDNIFeedback = document.getElementById("memberDNIFeedback");

        // GAMES FORM ELEMENTS
        this.inputGameTitle = document.getElementById("gameTitle");
        this.inputGameTitleFeedback = document.getElementById("gameTitleFeedback");
        this.inputGameBrand = document.getElementById("gameBrand");
        this.inputGameBrandFeedback = document.getElementById("gameBrandFeedback");
        this.inputGameMinPlayers = document.getElementById("gameMinPlayers");
        this.inputGameMinPlayersFeedback = document.getElementById("gameMinPlayersFeedback");
        this.inputGameMaxPlayers = document.getElementById("gameMaxPlayers");
        this.inputGameMaxPlayersFeedback = document.getElementById("gameMaxPlayersFeedback");
        this.inputGameTimeMin = document.getElementById("gameTimeMin");
        this.inputGameTimeMinFeedback = document.getElementById("gameTimeMinFeedback");
        this.inputGameTimeMax = document.getElementById("gameTimeMax");
        this.inputGameTimeMaxFeedback = document.getElementById("gameTimeMaxFeedback");

        // ELEMENTS
        this.membersList = document.getElementById("membersList");
        this.gamesList = document.getElementById("gamesList");

        this.loadLocalStorage();
    }

    renderMembers() {
        let searchMemberQuery = document.getElementById("searchMember").value.toLowerCase();
        let membersCopy = this.members.filter((member) => {
            return member.firstName.toLowerCase().includes(searchMemberQuery) ||
                member.lastName.toLowerCase().includes(searchMemberQuery);
        })

        this.membersList.innerHTML = "";
        membersCopy.forEach(member => {
            member.renderMember(this.membersList);
        });

        this.saveMembers();
    }

    renderGames() {
        let searchGameQuery = document.getElementById("searchGame").value.toLowerCase();
        let gamesCopy = this.boardGames.filter((game) => {
            return game.title.toLowerCase().includes(searchGameQuery) ||
                game.brand.toLowerCase().includes(searchGameQuery);
        })

        this.gamesList.innerHTML = "";
        gamesCopy.forEach(game => {
            game.renderGame(this.gamesList);
        });

        this.saveGames();
    }

    addMember() {
        let firstName = this.inputMemberName.value;
        let lastName = this.inputMemberLastName.value;
        let dni = parseInt(this.inputMemberDNI.value);

        let isInvalid = 0;

        isInvalid += !checkValidations(firstName, this.inputMemberName, Array(
            validation("Complete este campo", this.inputMemberNameFeedback, isNotEmptyString),
            validation("Complete este campo", this.inputMemberNameFeedback, isNotNull),
            validation("El nombre no pude ser un número", this.inputMemberNameFeedback, isNotNumber)
        ));
        isInvalid += !checkValidations(lastName, this.inputMemberLastName, Array(
            validation("Complete este campo", this.inputMemberLastNameFeedback, isNotEmptyString),
            validation("Complete este campo", this.inputMemberLastNameFeedback, isNotNull),
            validation("El apellido no pude ser un número", this.inputMemberLastNameFeedback, isNotNumber)
        ));
        isInvalid += !checkValidations(dni, this.inputMemberDNI, Array(
            validation("Complete este campo", this.inputMemberDNIFeedback, isNotNull),
            validation("Debe ser un número", this.inputMemberDNIFeedback, isNumber),
            validation("Ya existe un miembro con ese DNI", this.inputMemberDNIFeedback, isNotIncluded(this.members, "dni"))
        ));
        if (!isInvalid) {
            let newMember = new Member(firstName, lastName, dni)
            this.members.push(newMember);
            this.quantityMembers++;
            this.renderMembers();
            this.renderGames();
            this.clearMemberForm();
        }
    }

    searchMember(dni) {
        return this.members.find(member => member.dni === dni);
    }

    removeMember(dni) {
        let member = this.searchMember(dni);
        let memberIndex = this.members.indexOf(member);
        member.reservedGames.forEach(game => {
            game.returnGame();
            this.quantityAvailable++;
            this.quantityReserved--;
        });
        this.members.splice(memberIndex, 1);
        this.quantityMembers--;
        this.renderMembers();
        this.renderGames();
    }

    addBoardGame() {
        let title = this.inputGameTitle.value;
        let brand = this.inputGameBrand.value;
        let minPlayers = parseInt(this.inputGameMinPlayers.value);
        let maxPlayers = parseInt(this.inputGameMaxPlayers.value);
        let gameTimeMin = parseInt(this.inputGameTimeMin.value);
        let gameTimeMax = parseInt(this.inputGameTimeMax.value);

        let isInvalid = 0;

        isInvalid += !checkValidations(title, this.inputGameTitle, Array(
            validation("Complete este campo", this.inputGameTitleFeedback, isNotEmptyString),
            validation("Complete este campo", this.inputGameTitleFeedback, isNotNull),
        ));
        isInvalid += !checkValidations(brand, this.inputGameBrand, Array(
            validation("Complete este campo", this.inputGameBrandFeedback, isNotEmptyString),
            validation("Complete este campo", this.inputGameBrandFeedback, isNotNull),
        ));
        isInvalid += !checkValidations(minPlayers, this.inputGameMinPlayers, Array(
            validation("Complete este campo", this.inputGameMinPlayersFeedback, isNotNull),
            validation("Debe ser un número", this.inputGameMinPlayersFeedback, isNumber),
            validation("Debe ser mayor o igual a uno", this.inputGameMinPlayersFeedback, isGreaterThanEqual(1))
        ));
        isInvalid += !checkValidations(maxPlayers, this.inputGameMaxPlayers, Array(
            validation("Complete este campo", this.inputGameMaxPlayersFeedback, isNotNull),
            validation("Debe ser un número", this.inputGameMaxPlayersFeedback, isNumber),
            validation(`Debe ser mayor o igual a la cantidad mínima de jugadores (${minPlayers})`, this.inputGameMaxPlayersFeedback, isGreaterThanEqual(minPlayers))
        ));
        isInvalid += !checkValidations(gameTimeMin, this.inputGameTimeMin, Array(
            validation("Complete este campo", this.inputGameTimeMinFeedback, isNotNull),
            validation("Debe ser un número", this.inputGameTimeMinFeedback, isNumber),
            validation("Debe ser mayor o igual a cinco minutos", this.inputGameTimeMinFeedback, isGreaterThanEqual(5))
        ));
        isInvalid += !checkValidations(gameTimeMax, this.inputGameTimeMax, Array(
            validation("Complete este campo", this.inputGameTimeMaxFeedback, isNotNull),
            validation("Debe ser un número", this.inputGameTimeMaxFeedback, isNumber),
            validation(`Debe ser mayor o igual al tiempo minimo de juego (${gameTimeMin})`, this.inputGameTimeMaxFeedback, isGreaterThanEqual(gameTimeMin))
        ));
        if (!isInvalid) {
            let newGame = new BoardGame(title, brand, minPlayers, maxPlayers, gameTimeMin, gameTimeMax);
            this.boardGames.push(newGame);
            this.quantityGames++;
            this.quantityAvailable++;
            this.renderMembers();
            this.renderGames();
            this.clearGameForm();
        }
    }

    searchGame(id) {
        return this.boardGames.find(game => game.id === id);
    }

    removeGame(id) {
        let game = this.searchGame(id);
        let gameIndex = this.members.indexOf(game);
        let owner = game.owner;
        owner.returnGame(game);
        this.boardGames.splice(gameIndex, 1);
        this.quantityGames--;
        this.quantityAvailable--;
        this.quantityReserved--;
        this.renderMembers();
        this.renderGames();
    }

    reserveGame(id, dni) {
        let game = this.searchGame(id);
        let member = this.searchMember(dni);
        if (member) {
            member.reserveGame(game);
            game.reserveGame(member);
            this.quantityAvailable--;
            this.quantityReserved++;
            this.renderMembers();
            this.renderGames();
        }
    }

    returnGame(id) {
        let game = this.searchGame(id);
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

    clearMemberForm() {
        this.inputMemberName.value = "";
        this.inputMemberName.className = "form-control";
        this.inputMemberLastName.value = "";
        this.inputMemberLastName.className = "form-control";
        this.inputMemberDNI.value = "";
        this.inputMemberDNI.className = "form-control";
    }

    clearGameForm() {
        this.inputGameTitle.value = "";
        this.inputGameTitle.className = "form-control";
        this.inputGameBrand.value = "";
        this.inputGameBrand.className = "form-control";
        this.inputGameMaxPlayers.value = "";
        this.inputGameMaxPlayers.className = "form-control";
        this.inputGameMinPlayers.value = "";
        this.inputGameMinPlayers.className = "form-control";
        this.inputGameTimeMin.value = "";
        this.inputGameTimeMin.className = "form-control";
        this.inputGameTimeMax.value = "";
        this.inputGameTimeMax.className = "form-control";
    }

    loadLocalStorage() {
        let savedMembers = JSON.parse(localStorage.getItem("members"));
        let savedGames = JSON.parse(localStorage.getItem("games"));

        let games = [];
        if (savedGames) {
            savedGames.forEach(game => {
                games.push(new BoardGame(
                    String(game.title),
                    String(game.brand),
                    Number(game.minPlayers),
                    Number(game.maxPlayers),
                    Number(game.gameTimeMin),
                    Number(game.gameTimeMax),
                    Boolean(game.reserved),
                    new Date(game.reservedTimeStamp),
                    Number(game.owner) || null,
                    String(game.id),
                ));
            });
        }

        let members = [];
        if (savedMembers) {
            savedMembers.forEach(member => {
                members.push(new Member(
                    String(member.firstName),
                    String(member.lastName),
                    Number(member.dni),
                    new Date(member.timeStamp),
                    member.reservedGames.map((id) => {
                        return games.find((game) => game.id === id);
                    })
                ))
            });
        }

        games.forEach(game => {
            if (game.owner) {
                game.owner = members.find(member => member.dni === game.owner);
                game.reserved = true;
            }
        });

        this.members = members;
        this.quantityMembers += members.length;

        this.boardGames = games;
        this.quantityGames += games.length;
        this.quantityAvailable += games.filter((game) => !game.reserved);
        this.quantityReserved += games.filter((game) => game.reserved);
    }

    // Optimizar. Esta pisando todo tras cada cambio.
    saveMembers() {
        localStorage.removeItem("members");
        this.members.forEach(member => {
            member.saveOnLocalStorage();
        });
    }

    // Optimizar. Esta pisando todo tras cada cambio.
    saveGames() {
        localStorage.removeItem("games");
        this.boardGames.forEach(game => {
            game.saveOnLocalStorage();
        })
    }
}