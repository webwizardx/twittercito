require('dotenv').config()

module.exports = {

    database: {
        URI: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@twittercito-3np4q.mongodb.net/test?retryWrites=true&w=majority`////'mongodb://localhost/twittercito'
    }

}