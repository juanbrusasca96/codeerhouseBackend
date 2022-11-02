import { collection, getFirestore } from "firebase/firestore";
import { db } from "../../configFirebase.js";
import { FirebaseClass } from "../../containers/containerFirebase.js";

const nameCollection = 'products'

const queryCollection = collection(db, nameCollection)

class productsDaoFirebase extends FirebaseClass {
    constructor() {
        super(queryCollection, nameCollection)
    }
}

export default productsDaoFirebase