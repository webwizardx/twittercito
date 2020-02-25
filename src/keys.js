require('dotenv').config()

module.exports = {

    database: {
        URI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twittercito-3np4q.mongodb.net/test?retryWrites=true&w=majority`////'mongodb://localhost/twittercito'
    }

}