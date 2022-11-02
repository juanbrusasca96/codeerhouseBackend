import { MongoClass } from "../../containers/containerMongodb.js";
import { productsModel } from "../../models/products.js";

class productsDaoMongodb extends MongoClass {
    constructor() {
        super(productsModel)
    }
}

export default productsDaoMongodb