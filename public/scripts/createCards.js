async function loadGames() {
    const url = "/api/games"
    const res = await fetch(url)
    const json = await res.json()
    return json.data
}

function normalizePrice(price) {
    if (price === undefined)
        return "not verified"
    
    return price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}

async function createCard() {
    const cardsData = await loadGames()

    const cardsContainer = document.querySelector("#cards")
    
    for (const content of cardsData) {
        const normalPrice = content.normalPrice || undefined
        const currentPrice = content.currentPrice || undefined

        const lineThrough = +currentPrice < +normalPrice ? "line-through" : ""

        const normalPriceHTML =
            normalPrice !== currentPrice
                ? `<p class="normal-price ${lineThrough}">${normalizePrice(normalPrice)}</p>`
                : ""

        cardsContainer.innerHTML += `
            <div class="card">
                <p class="game-name">
                    ${content.title || content.name}
                </p>
                <img src="${content.cover}" alt="">
                ${normalPriceHTML}
                <p class="current-price">${normalizePrice(currentPrice)}</p>
            </div>
        `
    }
}

createCard()