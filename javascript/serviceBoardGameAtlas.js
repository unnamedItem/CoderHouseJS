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
        response.status === 503 && displayAlert("Error 503 API service not available", "warning");
        return response.text();
    })
    .then(response => {
        return JSON.parse(response);
    })
    .catch(err => {
        console.log(`ERR: ${err}`);
        displayAlert(err, "danger");
    })
}


function BGASearchGame(args) {
    return goFetch("/search", args);
}


function BGAGameImage(args) {
    return goFetch("/game/images", args);
}