const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Router = require("./Routers/mainRouter");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

require("dotenv").config();
require("./config/dbConfig")

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
	process.env.CLIENT_URL,
	"http://localhost:5173",
	"http://127.0.0.1:5173",
].filter(Boolean);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			return callback(null, true);
		}
		return callback(new Error("Not allowed by CORS"));
	},
	credentials: true
}));


app.use("/", Router);
app.use((req, res, next) => {
	next(createError.NotFound("The entered URL does not exist"));
})

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(` Now hosted on http://localhost:${PORT}`);
});
