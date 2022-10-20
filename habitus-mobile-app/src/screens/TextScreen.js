
import React, { useState, useEffect, } from 'react'
import { Image, View, ScrollView, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../firebase';
import { Button, Text, Card } from 'react-native-paper';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextScreen = ({ navigation }) => {
    const [text, setText] = useState();

    return (
        <View style={tw`w-full bg-[#FAF0E4] h-300`}>
            <ScrollView style={tw``}>
                <View>
                    <View style={tw`flex flex-row justify-between text-center items-center`}>
                        <Text style={tw`text-3xl pb-4 mx-5 mt-6 `}>Sarah Smith</Text>
                        <Button icon="bell-badge" color="black" size={32} />

                    </View>
                    <View style={tw`bg-orange-500 h-1`} />
                </View>
                <View>
                    <Text style={tw`text-sm pb-4 mx-5 mt-6 text-grey-200 text-center`}>Sun 4:02pm</Text>
                    <View style={tw`bg-[#FFE1BE] w-4/6 rounded-lg flex-row justify-center items-center drop-shadow-lg`}>
                        <Icon name="certificate" size={20} color="black" style={tw`mr-4`} />

                        <Text style={tw`text-black pt-4 text-center mb-4 `}>Today’s run was super tough 😅</Text>
                    </View>
                    <View style={tw` items-end my-8 `}>
                        <View style={tw`bg-[#E9C273] w-4/6  rounded-lg drop-shadow-lg `}>
                            <Text style={tw`text-black pt-4 text-center mb-4  `}>IKR!! But we did it! 💪</Text>
                        </View>
                    </View>
                    <View style={tw`bg-[#FFE1BE] w-5/6 rounded-lg flex-row justify-center items-center drop-shadow-lg`}>
                        <Icon name="certificate" size={20} color="black" style={tw`mr-4`} />
                        <Text style={tw`text-black pt-4 text-center mb-4 `}>I’m so tired but it was definitely worth it and {"\n"}I feel like I’m making progress 😃</Text>
                    </View>
                </View>
                <View>
                    <Text style={tw`text-sm pb-4 mx-5 mt-6 text-grey-200 text-center`}>Mon 10:17am</Text>
                    <View style={tw`bg-[#FFE1BE] w-5/6 rounded-lg flex-row justify-center items-center drop-shadow-lg`}>
                        <Icon name="certificate" size={20} color="black" style={tw`mr-4`} />
                        <Text style={tw`text-black pt-4 text-center mb-4 `}>Hope you have a great run today! {"\n"} You can do it!</Text>
                    </View>
                    {text &&
                        <>
                            <View style={tw`justify-end text-end items-end my-8 `}>
                                <View style={tw`bg-[#E9C273] w-4/6  rounded-lg drop-shadow-lg `}>
                                    <Text style={tw`text-black pt-4 text-center mb-4  `}>And you ran 3km today! So proud of you! {"\n"}You’re doing amazing 👏</Text>
                                </View>
                            </View>
                        </>}
                </View>
                <View style={tw`items-center ${text ? "h-20" : "h-56"} justify-end`}>
                    <Button
                        mode="contained"
                        labelStyle={{ color: "black" }}
                        style={tw` rounded-full py-2 mt-5  w-11/12  bg-slate-300`}
                        onPress={() => { setText(!text) }}
                    >
                        send a message...
                        <Icon name="send" size={20} color="black" style={tw`mr-4`} />

                    </Button>
                </View>

            </ScrollView>
        </View >
    )
}

export default TextScreen;