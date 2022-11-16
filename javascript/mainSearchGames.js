// Get query params
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let gameName = params.gameName;

// DOM Elements
const gameCards = document.getElementById("gameCards");
const loadingSpinner = document.getElementById("loadingSpinner");


async function searchGame() {
    BGASearchGame({name: gameName})
    .then(result => {
        result.games.forEach((game, index) => {
            let newCol = document.createElement("div");
            newCol.className = "col mb-3";

            let newCardGame = createGameCard(`gameCard${index}`, game.name, game.image_url);
            newCardGame.addEventListener("click", (evt) => {
                evt.preventDefault();
                window.location.href = `gameSheet.html?gameId=${game.id}`;
            })

            newCol.appendChild(newCardGame);
            gameCards.appendChild(newCol);
            loadingSpinner.className = "visually-hidden";
        });
    })
}

gameName && searchGame();