import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { GiftedChat } from 'react-native-gifted-chat'
function chat() {
    const [messages, setMessages] = useState([]);


    const [inputMessage, setInputMesage] = useState("")
    const [outputMessage, setoutputMessage] = useState("Results to be shown here")
    const handleButtonClick = () => {
        console.log(inputMessage)
        const message = {
            _id: Math.random().toString(36).substring(7),
            text: inputMessage,
            createAt: new Date(),
            user: { _id: 1 }
        }
        setMessages((previousMassages) =>
            GiftedChat.append(previousMassages, [message])
        )
        // const apiKey = ''

        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": " Bearer " + apiKey,
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                "messages": [{ "role": "user", "content": inputMessage }],
                "model": "gpt-3.5-turbo",
            })
        }).then((response) => response.json()).then((data) => {
            console.log(data)
            setInputMesage("")
            setoutputMessage(data.choices[0].message.content.trim())
            const message = {
                _id: Math.random().toString(36).substring(7),
                text: data.choices[0].message.content.trim(),
                createAt: new Date(),
                user: { _id: 2, name: "Firat Yildirim" }
            }
            setMessages((previousMassages) =>
                GiftedChat.append(previousMassages, [message])
            )

        })
    }
    const handleTextInput = (text) => {
        setInputMesage(text)
        console.log(text)
    }


    return (
        <ImageBackground
            source={require('../../../assets/chat2.jpg')}
            resizeMode='cover'
            style={{ flex: 1, width: "100%", height: "100%" }}
        ><View style={{ flex: 1 }}>
                <View style={{ flex: 2, justifyContent: "center", }}>
                    {/* <Text>{outputMessage}</Text> */}
                    <GiftedChat
                        messages={messages}
                        renderInputToolbar={() => { }}
                        user={{ _id: 1 }} minInputToolbarHeight={0}
                    />
                </View>
                <View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
                    <View style={{ flex: 1, marginLeft: 10, marginBottom: 20, backgroundColor: "white", borderColor: "grey", borderWidth: 1, borderRadius: 10, height: 60, marginLeft: 10, marginRight: 10, justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
                        <TextInput placeholder='Hangi Tür Kitap İstersin...' onChangeText={handleTextInput} value={inputMessage} />
                    </View>
                    <TouchableOpacity onPress={handleButtonClick} >

                        <View style={{ backgroundColor: "green", padding: 5, marginRight: 10, marginBottom: 20, borderRadius: 9999, width: 60, height: 60, justifyContent: 'center' }}>
                            <MaterialIcons name='send' size={30} color="white" style={{ marginLeft: 12 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <StatusBar style="auto" />
            </View ></ImageBackground>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default chat