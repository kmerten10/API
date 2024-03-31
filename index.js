const PORT = 8000

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')


const app = express()

const products = []

app.get('/', (req, res) => {
    res.json('Welcome to my api')
})
 
app.get('/womens', (req, res) => {
axios.get('https://www.aloyoga.com/collections/womens-shop-all')
    .then((response) => {
        const html = response.data
        console.log(html)
        const $ = cheerio.load(html)   

        $('a:contains("hoodie")', html).each(function () {
            const type = $(this).text()
            const url = $(this).attr('href')
            products.push({
                type,
                url
            })
        })
        res.json(products)
}).catch((err) => console.log(err))
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))


