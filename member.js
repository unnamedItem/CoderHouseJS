class Member {
    constructor(
        firstName,
        lastName,
        dni,
    ) {
        this.firstName = String(firstName);
        this.lastName = String(lastName);
        this.dni = Number(dni);
        this.reservedGames = Array();
    }

    reserveGame(game) {
        this.reservedGames.push(game);
    }

    returnGame(game) {
        let indexOfGame = this.reservedGames.indexOf(game);
        this.reservedGames.splice(indexOfGame);
    }

    renderMember(parent) {
        let liTitle = document.createElement('li');
        liTitle.innerHTML = `NOMBRE: ${this.firstName}`;
        parent.appendChild(liTitle);

        let liLastName = document.createElement('li');
        liLastName.innerHTML = `APELLIDO: ${this.lastName}`;
        parent.appendChild(liLastName);

        let liDni = document.createElement('li');
        liDni.innerHTML = `DNI: ${this.dni}`;
        parent.appendChild(liDni);

        let ul = document.createElement('ul');
        this.reservedGames.forEach(game => {
            let li = document.createElement('li');
            li.innerHTML = game.title;
            ul.appendChild(li);
        });

        let liReservedGames = document.createElement('li');
        liReservedGames.innerHTML = "JUEGOS RESERVADOS:";
        liReservedGames.appendChild(ul);
        parent.appendChild(liReservedGames);
    }
}