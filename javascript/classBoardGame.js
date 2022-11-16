class BoardGame {
    constructor (
        title,
        brand,
        minPlayers,
        maxPlayers,
        gameTimeMin,
        gameTimeMax,
        reserved=false,
        reservedTimeStamp=null,
        owner=null,
        id=null
    ) {
        this.title = String(title);
        this.brand = String(brand);
        this.minPlayers = Number(minPlayers);
        this.maxPlayers = Number(maxPlayers);
        this.gameTimeMin = Number(gameTimeMin);
        this.gameTimeMax = Number(gameTimeMax);
        this.reserved = reserved;
        this.reservedTimeStamp = reservedTimeStamp;
        this.owner = owner;
        this.id = id || uuidv4();
    }

    reserveGame(member) {
        this.reserved = true;
        this.reservedTimeStamp = new Date();
        this.owner = member;
    }

    returnGame() {
        this.reserved = false;
        this.owner = null;
    }

    renderGame(parent) {
        let listItemBody = document.createElement("span");
        listItemBody.innerHTML = this.reserved ?
            `Reservado por <b>${this.owner.firstName.toUpperCase()} ${this.owner.lastName.toUpperCase()}</b>` :
            "<b>Disponible</b>";

        let numbPlayers = `Jugadores: <b>${this.minPlayers} - ${this.maxPlayers}</b>`;
        let gameTime = `Tiempo: <b>${this.gameTimeMin} - ${this.gameTimeMax}</b>`;

        let listItemFooter = document.createElement("span");
        listItemFooter.innerHTML = `${numbPlayers} | ${gameTime} minutos`

        let listItem = createListItem(
            `${this.title.toUpperCase()}`,
            `Marca: <b>${this.brand}</b>`,
            listItemBody,
            listItemFooter,
            `#collapseGame${this.id}`
        )
        let collapse = this.createGameCollapse();

        if (this.reserved) {
            listItem.className = "list-group-item list-group-item-action bg-secondary";
        } else {
            listItem.className = "list-group-item list-group-item-action";
        }

        parent.appendChild(listItem);
        parent.appendChild(collapse);
    }

    createGameCollapse() {
        // Collapse
        let collapse = document.createElement("div");
        collapse.className = "collapse list-group-item";
        collapse.id = `collapseGame${this.id}`;

        let row = document.createElement("div");
        row.className = "row";

        let col0 = document.createElement("div");
        col0.className = this.reserved ? "col-9" : "col-6";
        
        let col1 = document.createElement("div");
        col1.className = "col-3";

        let col2 = document.createElement("div");
        col2.className = "col-3";

        // DNI input
        let inputGroup = document.createElement("div");
        inputGroup.className = "input-group input-group-sm";
        let inputDNI = document.createElement("input");
        inputDNI.id = `reserveDNI${this.id}`;
        inputDNI.type = "text";
        inputDNI.className = "form-control";
        inputDNI.placeholder = "DNI";
        let inputDNIFeedback = document.createElement("div");
        inputDNIFeedback.className = "invalid-feedback";
        inputDNIFeedback.id = `reserveDNI${this.id}Feedback`;

        // Reserve button
        let reserveButton = document.createElement("button");
        reserveButton.type = "button";
        reserveButton.className = "btn btn-primary btn-sm";
        reserveButton.style = "width: 100%";
        reserveButton.innerHTML = "Reservar";
        const reserveGameAux = (id) => () => {
            let dni = parseInt(inputDNI.value);
            let isInvalid = 0;
            isInvalid += !checkValidations(dni, inputDNI, Array(
                validation("Complete este campo", inputDNIFeedback, isNotNull),
                validation("Debe ser un número", inputDNIFeedback, isNumber),
                validation("No existe un miembro con ese DNI", inputDNIFeedback, isIncluded(library.members, "dni"))
            ));
            if (!isInvalid) {
                library.reserveGame(id, dni)
            }
        };
        reserveButton.addEventListener("click", reserveGameAux(this.id));

        // Delete button
        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.style = "width: 100%";
        deleteButton.innerHTML = "Eliminar";
        const removeGameAux = (id) => () => library.removeGame(id);
        deleteButton.addEventListener("click", removeGameAux(this.id));

        // Return button
        let returnButton = document.createElement("button");
        returnButton.type = "button";
        returnButton.className = "btn btn-primary btn-sm";
        returnButton.style = "width: 100%";
        returnButton.innerHTML = "Devolver juego";
        const returnGameAux = (id) => () => library.returnGame(id);
        returnButton.addEventListener("click", returnGameAux(this.id));

        inputGroup.appendChild(inputDNI);
        inputGroup.appendChild(inputDNIFeedback);

        if (this.reserved) {
            col0.appendChild(returnButton)
            col1.appendChild(deleteButton);
        } else {
            col0.appendChild(inputGroup)
            col1.appendChild(reserveButton);
            col2.appendChild(deleteButton);
        }

        row.appendChild(col0);
        row.appendChild(col1);
        row.appendChild(col2);

        collapse.appendChild(row);

        return collapse;
    }

    saveOnLocalStorage() {
        let game = {
            title: this.title,
            brand: this.brand,
            maxPlayers: this.maxPlayers,
            minPlayers: this.minPlayers,
            gameTimeMin: this.gameTimeMin,
            gameTimeMax: this.gameTimeMax,
            reserverd: this.reserved,
            reservedTimeStamp: this.reservedTimeStamp,
            owner: this.owner?.dni,
            id: this.id,
        }

        let savedGames = JSON.parse(localStorage.getItem("games")) || [];
        savedGames.push(game);
        localStorage.setItem("games", JSON.stringify(savedGames));
    }
}