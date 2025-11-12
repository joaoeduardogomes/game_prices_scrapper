const axios = require('axios')
const cheerio = require('cheerio')

async function scrapePSNGame(url) {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        })
        const $ = cheerio.load(data)

        const name = $('h1[data-qa="mfe-game-title#name"]').text().trim()
        const normalPriceText = $('span[data-qa="mfeCtaMain#offer1#originalPrice"]').text().trim()
        const currentPriceText = $('span[data-qa="mfeCtaMain#offer1#finalPrice"]').text().trim()

        const parsePrice = (txt) => {
            if (!txt) return null
            const cleaned = txt.replace(/[^\d,]/g, '').replace(',', '.')
            return +cleaned
        }

        const normalPrice = parsePrice(normalPriceText)
        const currentPrice = parsePrice(currentPriceText) || normalPrice

        return { name, normalPrice, currentPrice }
    }
    catch (error) {
        console.error(`[Scrapper PSN] Erro ao acessar ${url}:`, error.message)
        return null
    }
}

scrapePSNGame("https://store.playstation.com/pt-br/product/UP4497-PPSA03974_00-0000000000000CP1")

module.exports = { scrapePSNGame }