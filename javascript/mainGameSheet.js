let library = new Library();
let gameData = null;

// Get query params
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let gameId = params.gameId;

// DOM Elements
const gameTitle = document.getElementById("gameName");
const carouselIndicators = document.getElementById("carouselIndicators");
const carouselInner = document.getElementById("carouselInner");
const numberOfPlayers = document.getElementById("numberOfPlayers");
const gamePlayTime = document.getElementById("gamePlayTime");
const gameDescription = document.getElementById("gameDescription");
const gameSheetCarousel = document.getElementById("gameSheetCarousel");
const gamePublisher = document.getElementById("gamePublisher");
const btnAddGame = document.getElementById("btnAddGame");

// Misc
const NO_IMAGE_AVAILABLE = "https://s3-us-west-1.amazonaws.com/5cc.images/games/empty+box.jpg";
const NO_DESCRIPTION = "Descripción no disponible";


function setCarouselImage(image, index) {
    let newCarouselItem = createCarouselItem(image, !index);
    let newCarouselIndicator = createCarouselIndicator("gameSheetCarousel", index, !index);
    carouselInner.appendChild(newCarouselItem);
    carouselIndicators.appendChild(newCarouselIndicator);
}


async function getGameInfo() {
    BGASearchGame({ids: [gameId]})
    .then(result => {
        gameData = result.games[0];
        gameTitle.innerHTML = gameData.name;
        gameDescription.innerHTML = gameData.description || NO_DESCRIPTION;
        numberOfPlayers.innerHTML = `${gameData.min_players} - ${gameData.max_players}`;
        gamePlayTime.innerHTML = `${gameData.min_playtime} - ${gameData.max_playtime}`;
        gamePublisher.innerHTML = gameData?.primary_publisher?.name;
    })
}


async function getGameImages() {
    BGAGameImage({game_id: gameId, limit: 10})
    .then(result => {
        result.images.forEach((image, index) => {
            setCarouselImage(image.original, index);
        });

        if (!result.images.length) {
            setCarouselImage(NO_IMAGE_AVAILABLE, 0);
        }
    })
}

btnAddGame.addEventListener("click", () => {
    let newGame = new BoardGame(
        gameData.name,
        gameData.primary_publisher?.name,
        gameData.min_players,
        gameData.max_players,
        gameData.min_playtime,
        gameData.max_playtime,
    );
    library.boardGames.push(newGame);
    library.quantityGames++;
    library.quantityAvailable++;
    library.saveGames();
    displayAlert(`Se añadió ${gameData.name} a la biblioteca`, "success");
})


gameId && getGameInfo();
gameId && getGameImages();