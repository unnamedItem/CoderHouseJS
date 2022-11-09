const BGAClientId = "JLBr5npPhV";
const BGABaseUrl = "https://api.boardgameatlas.com/api";


function goFetch(path, args) {
    url = `${BGABaseUrl}${path}?`;
    args = {client_id: BGAClientId, ...args};
    for (const key in Object(args)) {
        url = url.concat(`${key}=${args[key]}&`);
    }

    return fetch(url)
    .then(response => {
        return response.text();
    })
    .then(response => {
        return JSON.parse(response);
    })
    .catch(err => {
        console.log(`ERR: ${err}`)
    })
}


function BGASearchGame(args) {
    return goFetch("/search", args);
}


function BGAGameImage(args) {
    return goFetch("/game/images", args);
}


function BGAGamePrice(args) {
    return goFetch("/game/prices", args);
}


async function test() {
    let games = await BGASearchGame({name: "Catan"});

    games.games.forEach(async game => {
        let gameImgUrl = await BGAGameImage({game_id: game.id});
        console.log(gameImgUrl);
    });
}

test()