
import React, { useState, useEffect, useRef } from 'react'
import { Camera, CameraType } from 'expo-camera';
import { Image, View, ScrollView, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../../firebase';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

const CameraPreview = ({ navigation, image, retakePicture, description, setDescription }) => {

    const postPhoto = async () => {
        try {
            const photo = {
                // uid: title,
                uri: image.uri,
                description: description,
                likes: 0,
            }
            const ref = db.collection('photos');
            await ref.add(photo);
            navigation.navigate('home');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={tw`h-full`}>
            <ScrollView style={tw`bg-red-500`}>
                <ImageBackground style={tw`h-100`}
                    source={{ uri: image && image.uri }}

                />
                <TouchableOpacity
                    onPress={() => retakePicture()}
                    style={{
                        width: 130,
                        height: 40,

                        alignItems: 'center',
                        borderRadius: 4
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 20
                        }}
                    >
                        Re-take Photo
                    </Text>
                </TouchableOpacity>



                <TextInput
                    style={tw`bg-white w-full h-10`}
                    label="Enter description"
                    mode="outlined"
                    onChangeText={(description) => setDescription(description)}
                    value={description}
                />
                <Button
                    mode="outlined"
                    icon="account-plus"
                    compact
                    onPress={() =>
                        postPhoto()
                    }
                >
                    Post
                </Button>


            </ScrollView>
        </View >
    )
}

export default CameraPreview;