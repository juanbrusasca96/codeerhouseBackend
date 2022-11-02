import { collection, getFirestore } from "firebase/firestore";
import { db } from "../../configFirebase.js";
import { FirebaseClass } from "../../containers/containerFirebase.js";

const nameCollection = 'cart'

const queryCollection = collection(db, nameCollection)

class cartDaoFirebase extends FirebaseClass {
    constructor() {
        super(queryCollection, nameCollection)
    }
}

export default cartDaoFirebase