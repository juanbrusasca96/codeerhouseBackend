import dotenv from "dotenv";
import path from "path";
const __dir = path.resolve();

dotenv.config({
	path: path.join(__dir, `${process.env.NODE_ENV}.env`),
});

const entorno = {
	NODE_ENV: process.env.NODE_ENV || "development",
	MONGO_DB_URI: process.env.MONGO_DB_URI || "mongodb+srv://juanbrusasca:iacc40105795@cluster0.f6mjx6z.mongodb.net/ecommerce?retryWrites=true&w=majority",
};
export default entorno;
