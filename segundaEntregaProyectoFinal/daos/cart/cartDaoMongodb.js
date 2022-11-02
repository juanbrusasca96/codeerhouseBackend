import { MongoClass } from "../../containers/containerMongodb.js";
import { cartModel } from "../../models/cart.js";

class cartDaoMongodb extends MongoClass {
    constructor() {
        super(cartModel)
    }
}

export default cartDaoMongodb