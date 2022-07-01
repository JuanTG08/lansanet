const { config } = require('dotenv');
config();

module.exports = {
    PORT_SERVER: process.env.PORT_SERVER || 8000,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/lansanet",
    SECRET_SERVER: process.env.SECRET_SERVER,
}