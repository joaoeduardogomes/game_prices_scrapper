async function loadGames() {
    const url = "/api/games"
    const res = await fetch(url)
    const json = await res.json()
    return json.data
}

function normalizePrice(price) {
    return price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

async function createCard() {
    const cardsData = await loadGames()

    const cardsContainer = document.querySelector("#cards")

    for (const content of cardsData) {
        cardsContainer.innerHTML += `
            <div class="card">
                <p class="game-name">
                    ${content.title}
                </p>
                <img src="${content.cover}" alt="">
                <p class="normal-price">${normalizePrice(content.normalPrice)}</p>
                <p class="current-price">${normalizePrice(content.currentPrice)}</p>
            </div>
        `
    }
}

createCard()