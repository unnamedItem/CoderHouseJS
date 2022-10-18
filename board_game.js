class BoardGame {
    constructor (
        title,
        rating,
        minPlayers,
        maxPlayers,
        gameTime,
    ) {
        this.title = String(title);
        this.rating = Number(rating);
        this.minPlayers = Number(minPlayers);
        this.maxPlayers = Number(maxPlayers);
        this.gameTime = Number(gameTime);
        this.reserved = false;
        this.owner = null;
    }

    reserveGame(member) {
        this.reserved = true;
        this.owner = member;
    }

    returnGame() {
        this.reserved = false;
        this.owner = null;
    }

    renderGame(parent) {
        let liFirstName = document.createElement('li');
        liFirstName.innerHTML = `TITULO: ${this.title}`;
        parent.appendChild(liFirstName);

        let liRating = document.createElement('li');
        liRating.innerHTML = `PUNTUACIÓN: ${this.rating} / 10`;
        parent.appendChild(liRating);

        let liNumberOfPlayers = document.createElement('li');
        liNumberOfPlayers.innerHTML = `NÚMERO DE JUGADORES: ${this.minPlayers} - ${this.maxPlayers}`;
        parent.appendChild(liNumberOfPlayers);

        let liGameTime = document.createElement('li');
        liGameTime.innerHTML = `DURACIÓN: ${this.gameTime} minutos`;
        parent.appendChild(liGameTime);

        let liReserved = document.createElement('li');
        liReserved.innerHTML = `RESERVADO: ${this.reserved ? 'SI' : 'NO' }`;
        parent.appendChild(liReserved);

        if (this.reserved) {
            let liOwner = document.createElement('li');
            liOwner.innerHTML = `LO TIENE RESERVADO: ${this.owner.firstName} ${this.owner.lastName}`;
            parent.appendChild(liOwner);
        }
    }
}