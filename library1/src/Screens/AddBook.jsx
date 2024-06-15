import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const AddBook = () => {

    const [data, setData] = useState([])
    console.log("data", typeof data)
    const [isSave, setIssave] = useState(false)

    useEffect(() => {
        getData()
    }, [isSave])
    // datayi firebaseye gonder
    const sendData = async () => {
        try {
            const docRef = await addDoc(collection(db, "Books"), {
                title: "Frankenstein",
                writer: "Mary",
                Publisher: "Doğan Egmont",
                type: "Roman",
                content: "genc bilim insani victor yaratigi dev varlik dunyaya gozunu ilk actiginda",
                ISBN: "978-605-098430-9",
                NumberPages: 150,
                releaseDate: 2021
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    //firebaseden veri cek oku 
    const getData = async () => {
        const allData = []

        try {
            const querySnapshot = await getDocs(collection(db, "Books"));
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
                allData.push({ ...doc.data(), id: doc.id })
            });
            setData(allData)
        } catch (error) {
            console.log(error)
        }

    }

    // datayi sil
    const deleteData = async (value) => {

        try {
            await deleteDoc(doc(db, "Books", value))
        } catch (error) {
            console.log(error)
        }

    }

    // veriyi guncele
    const updateData = async () => {
        try {

            const booksData = doc(db, "Books", "ZJVAM6O04JwTC5i8k425")
            // Set the "capital" field of the city 'DC'
            await updateDoc(booksData, {
                releaseDate: 500
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            {data.map((value, index) => {


                return (
                    <Pressable
                        onPress={() => [deleteData(value.id), setIssave(isSave == false ? true : false)]}
                        key={index}>
                        <Text>{index}</Text>
                        <Text>{value.title}</Text>
                        <Text>{value.id}</Text>
                        <Text>{value.title}</Text>
                        <Text>{value.writer}</Text>
                        <Text>{value.Publisher}</Text>
                        <Text>{value.content}</Text>
                        <Text>{value.ISBN}</Text>
                    </Pressable>)


            })}

            <Text>{data.NumberPages}</Text>
            <Text>{data.releaseDate}</Text>

            <Button title="Save Data" onPress={() => { sendData(), (setIssave === false ? true : false) }} />
            <Button title="get Data" onPress={getData} />
            <Button title="delete Data" onPress={deleteData} />
            <Button title="update Data" onPress={updateData} />
        </View>
    )
}

export default AddBook

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
