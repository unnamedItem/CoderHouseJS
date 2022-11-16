class Member {
    constructor(
        firstName,
        lastName,
        dni,
        timeStamp=new Date(),
        reservedGames=Array()
    ) {
        this.firstName = String(firstName);
        this.lastName = String(lastName);
        this.dni = Number(dni);
        this.timeStamp = timeStamp;
        this.reservedGames = reservedGames;
    }

    reserveGame(game) {
        this.reservedGames.push(game);
    }

    returnGame(game) {
        let indexOfGame = this.reservedGames.indexOf(game);
        this.reservedGames.splice(indexOfGame, 1);
    }

    renderMember(parent) {
        let timeStamp = this.timeStamp.toLocaleDateString("es-AR", {year: "numeric", month: "short", day: "numeric"});
        let listItemBody = document.createElement("span");
        listItemBody.innerHTML = `Juegos reservados <b>(${this.reservedGames.length})</b>`;
        let listItemFooter = document.createElement("span");
        listItemFooter.innerHTML = `Miembro desde: <b>${timeStamp}</b>`

        let listItem = createListItem(
            `${this.firstName.toUpperCase()} ${this.lastName.toUpperCase()}`,
            `DNI: <b>${this.dni}</b>`,
            listItemBody,
            listItemFooter,
            `#collapseMember${this.dni}`
        )
        let collapse = this.createMemberCollapse();

        parent.appendChild(listItem);
        parent.appendChild(collapse);
    }

    createMemberCollapse() {
        let collapse = document.createElement("div");
        collapse.className = "collapse list-group-item";
        collapse.id = `collapseMember${this.dni}`;

        let row = document.createElement("div");
        row.className = "row d-flex justify-content-between";

        let col0 = document.createElement("div");
        col0.className = "col-9";
        

        let col1 = document.createElement("div");
        col1.className = "col-3";

        let deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.style = "width: 100%";
        deleteButton.innerHTML = "Eliminar";
        const removeMemberAux = (dni) => () => library.removeMember(dni);
        deleteButton.addEventListener("click", removeMemberAux(this.dni));

        if (this.reservedGames.length) col0.appendChild(this.renderReservedGames());
        col1.appendChild(deleteButton);

        row.appendChild(col0);
        row.appendChild(col1);

        collapse.appendChild(row);

        return collapse;
    }

    renderReservedGames() {
        let gameList = document.createElement("div");
        let title = document.createElement("span");
        title.innerHTML = "Juegos";
        gameList.appendChild(title);

        let ul = document.createElement("ul");
        this.reservedGames.forEach(game => {
            let li = document.createElement("li");

            let div = document.createElement("div");
            div.className = "d-flex justify-content-between";

            let gameTitle = document.createElement("div");
            gameTitle.innerHTML = game.title.toUpperCase();

            let returnButton = document.createElement("a");
            returnButton.type = "button";
            returnButton.className = "text-danger"
            returnButton.innerHTML = "Devolver";
            returnButton.addEventListener("click", () => {
                library.returnGame(game.id);
            })

            div.appendChild(gameTitle);
            div.appendChild(returnButton);
            li.appendChild(div);
            ul.appendChild(li);
        });

        gameList.appendChild(ul);
        return gameList;
    }

    saveOnLocalStorage() {
        let member = {
            firstName: this.firstName,
            lastName: this.lastName,
            dni: this.dni,
            timeStamp: this.timeStamp,
            reservedGames: this.reservedGames.map((game) => game.id)
        }

        let savedMembers = JSON.parse(localStorage.getItem("members")) || [];
        savedMembers.push(member);
        localStorage.setItem("members", JSON.stringify(savedMembers));
    }
}