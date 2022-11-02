import productsDaoMongodb from "./products/productsDaoMongodb.js";
import productsDaoFirebase from "./products/productsDaoFirebase.js";
import cartDaoMongodb from "./cart/cartDaoMongodb.js";
import cartDaoFirebase from "./cart/cartDaoFirebase.js";

// 1 - Dao's Mongodb
// 2 - Dao's Firebase

const productsDaoDecision = 2
const cartDaoDecision = 1

export const productsDaoDynamic = productsDaoDecision === 1 ? productsDaoMongodb : productsDaoFirebase
export const cartDaoDynamic = cartDaoDecision === 1 ? cartDaoMongodb : cartDaoFirebase