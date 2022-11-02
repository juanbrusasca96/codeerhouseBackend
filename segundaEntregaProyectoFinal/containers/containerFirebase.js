import { addDoc, deleteDoc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../configFirebase.js"

export class FirebaseClass {
    constructor(collection, nameCollection) {
        this.collection = collection
        this.nameCollection = nameCollection
    }

    async getAll() {
        const data = await getDocs(this.collection)
        const dataArray = data.docs.map(elem => {
            return {
                id: elem.id,
                ...elem.data()
            }
        })
        return dataArray
    }

    async getById(id) {
        const data = await getDoc(db, this.nameCollection, id)
        return {
            id: data.id,
            ...data.data()
        }
    }

    async create(obj) {
        return await addDoc(this.collection, obj)
    }

    async update(id, obj) {
        const documentRef = doc(db, this.nameCollection, id)
        return await updateDoc(documentRef, obj)
    }

    async delete(id) {
        return await deleteDoc(doc(db, this.nameCollection, id));
    }
}