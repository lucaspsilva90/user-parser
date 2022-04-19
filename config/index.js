module.exports = {
    server: {
        port: process.env.PORT
    },
    db: {
        collections: {
            user: process.env.USER_COLLECTION
        }
    }
}