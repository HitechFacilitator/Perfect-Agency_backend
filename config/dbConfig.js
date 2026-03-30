const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv")

dotenv.config()
mongoose.set('debug', true); // Enable only in development

var connection = mongoose
    .connect(process.env.MONGODB_CONNECTION_URI)
    .then(() =>{
        console.log("Database connected Successfuly");
    })
    .catch( (error) =>{
        console.error("Database connection fails\n DB Connection Error :\n",error)
    })

module.exports = connection
