import * as types from './mutation-types'
var firebase = require("@nativescript/firebase/app");



export const load = ({ commit }) => {
    commit(types.RESET, {})
    const customersCollection = firebase.firestore().collection("customers");
    return new Promise((resolve, reject) => {
        customersCollection.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                commit(types.ADD, {
                    id: doc.id,
                    first_name: doc.data().first_name,
                    last_name: doc.data().last_name
                })
                resolve(true)
            });
        });
    });
}


export const save = ({ commit }, item) => {
    const customersCollection = firebase.firestore().collection("customers");
    return new Promise((resolve, reject) => {
        customersCollection.add({
            first_name: item.first_name,
            last_name: item.last_name,
        }).then(documentRef => {
            commit(types.ADD, {
                id: documentRef.id,
                first_name: item.first_name,
                last_name: item.last_name,
            })
            console.log(`${item.first_name} added with auto-generated ID: ${documentRef.id}`);
            resolve(true)
        });
    });
}

export const update = ({ commit }, item) => {
    const customerDocument = firebase.firestore().collection("customers").doc(item.id)
    return new Promise((resolve, reject) => {
        customerDocument.update({
            first_name: item.first_name,
            last_name: item.last_name,
        }).then(() => {
            //update wuth reactivity, not necessary to do a commit
            console.log("SF population updated");
            resolve(true)
        });
    });
}

export const remove = ({ commit }, item) => {
    const customerDocument = firebase.firestore().collection("customers").doc(item.id)
    return new Promise((resolve, reject) => {
        customerDocument.delete().then(() => {
            resolve(true)
            commit(types.REMOVE, item)
            console.log("SF was erased from the face of the earth!");
        });
    });
}

export const set = ({ commit }, item) => {
    commit(types.SET, item)
}

export const setDefault = ({ commit }, item) => {
    commit(types.SET, {
        id: '',
        first_name: '',
        last_name: ''
    })
}

