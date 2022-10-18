
import React, { useState, useEffect, useRef } from 'react'
import { Camera, CameraType } from 'expo-camera';
import { Image, View, ScrollView, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../../firebase';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';
import { colors } from "../../assets/colors";

const CameraPreview = ({ navigation, image, retakePicture, description, setDescription }) => {

    const postPhoto = async () => {
        try {
            const userInfo = (await db.collection('users').doc("88").get()).data();
            const milestoneInfo = await (await db.collection("goal").doc("uniqueGoal").get()).data();

            const photo = {
                milestoneTitle: milestoneInfo["milestone"]["title"],
                userName: userInfo["fname"],
                uri: image.uri,
                description: description,
                likes: 0,
            }
            const ref = db.collection('photos');
            await ref.add(photo);
            navigation.navigate('homepage');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={tw`mt-30`}>
            <ScrollView style={tw``}>
                <ImageBackground style={tw`h-100`}
                    source={{ uri: image && image.uri }}
                />
                <View style={tw`items-end mr-5 mt-4 `}>
                    <TouchableOpacity
                        onPress={() => retakePicture()}
                        style={tw`w-2/6 rounded-lg py-2 mb-2 bg-gray-50/20 `}
                    >
                        <Text
                            style={tw`items-center text-center text-lg text-slate-500`}
                        >
                            Retake Photo
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={tw`text-lg justify-start text-left px-5 mb-2 `}>Caption:</Text>
                <View style={tw`flex w-full pb-2 px-5`}>
                    <TextInput
                        style={tw`bg-white w-full h-13`}
                        placeholder=' Enter Caption...'
                        mode="outlined"
                        onChangeText={(description) => setDescription(description)}
                        value={description}
                    />
                </View>
                <View style={tw`items-center`}>
                    <Button
                        onPress={() => { postPhoto() }}
                        mode="contained"
                        compact={false}
                        color={colors.blue}
                        buttonColor="#fff"
                        labelStyle={{ color: "white" }}
                        style={tw`w-4/6 rounded-full py-2 mt-5 mb-30`}>
                        Post
                    </Button>
                </View>


            </ScrollView>
        </View >
    )
}

export default CameraPreview;