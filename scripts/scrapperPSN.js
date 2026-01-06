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

        const title = $('h1[data-qa="mfe-game-title#name"]').text()
        let normalPriceText = $('span[data-qa="mfeCtaMain#offer1#originalPrice"]').text().trim()
        let currentPriceText = $('span[data-qa="mfeCtaMain#offer1#finalPrice"]').text().trim()

        if (normalPriceText.length === 0)
            normalPriceText = $('span[data-qa="mfeCtaMain#offer0#originalPrice"]').text().trim()
        if (currentPriceText.length === 0)
            currentPriceText = $('span[data-qa="mfeCtaMain#offer0#finalPrice"]').text().trim()

        const parsePrice = (txt) => {
            if (!txt) return null
            const cleaned = txt.replace(/[^\d,]/g, '').replace(',', '.')
            return +cleaned
        }

        const currentPrice = parsePrice(currentPriceText)
        const normalPrice = parsePrice(normalPriceText) || currentPrice

        let imageUrl =
            $('meta[property="og:image"]').attr('content') ||
            $('meta[name="twitter:image"]').attr('content')

        if (!imageUrl) {
            $('script[type="application/ld+json"]').each((_, el) => {
                try {
                    const json = JSON.parse($(el).html())
                    if (json.image) imageUrl = Array.isArray(json.image) ? json.image[0] : json.image
                } catch {}
            })
        }

        return { title, normalPrice, currentPrice, imageUrl }
    }
    catch (error) {
        console.error(`[Scrapper PSN] Erro ao acessar ${url}:`, error.message)
        return null
    }
}

module.exports = { scrapePSNGame }