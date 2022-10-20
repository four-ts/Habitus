
import React, { useState } from 'react'
import { Camera, CameraType } from 'expo-camera';
import { View, TouchableOpacity } from 'react-native';

import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';
import CameraPreview from './CameraPreview';
import { colors } from "../../assets/colors";

const CameraScreen = ({ navigation }) => {
    let camera;
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [type, setType] = useState(CameraType.back);
    const [startCamera, setStartCamera] = useState(false);
    const [preview, setPreview] = useState(false);
    const [photo, setPhoto] = useState();
    const [description, setDescription] = useState();

    const triggerStartCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            setStartCamera(true)
        } else {
            Alert.alert("Access denied")
        }
    }

    if (permission === null) {
        return <View />;
    }
    if (permission === false) {
        return <Text>No access to camera</Text>;
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const retakePhoto = async = () => {
        setPhoto(null)
        setPreview(false)
        takePhoto()
    }

    const takePhoto = async () => {
        // error check if camera is broken
        if (!camera) return
        const photo = await camera.takePictureAsync();
        setPreview(true);
        setPhoto(photo);
    }

    return (
        <View style={tw`flex bg-[#FAF0E4] `}>
            {preview && photo ? (<CameraPreview style={tw`mb-10`} navigation={navigation} image={photo} retakePicture={retakePhoto} description={description} setDescription={setDescription} />
            ) : (
                <>
                    <View style={tw` items-center`} >
                        <Text
                            style={tw` mt-15 text-lg text-black font-bold`}
                        >
                            New Post
                        </Text>
                        <Text
                            style={tw`text-gray-700`}
                        >
                            Showcase your Accomplishments!
                        </Text>
                    </View>
                    <Camera style={tw`mt-5`} type={type} ref={(r) => {
                        camera = r
                    }}>
                        <View style={tw`h-100`} >

                        </View>
                        <View style={tw`items-end mr-5 `}>
                            <TouchableOpacity
                                onPress={toggleCameraType}
                                style={tw`w-1/6 rounded-lg py-2 mb-5 bg-gray-50/20 `}
                            >
                                <Text
                                    style={tw`items-center text-center text-lg text-slate-500`}
                                >
                                    Flip
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>

                    <View style={tw`items-center mb-8`}>
                        <Button
                            mode="contained"
                            compact={false}
                            color={colors.blue}
                            buttonColor="#fff"
                            labelStyle={{ color: "white" }}
                            onPress={() => { takePhoto() }}
                            style={tw`w-4/6 rounded-full py-2 mt-15 mb-10`}
                        >
                            Take Photo

                        </Button>
                    </View>
                </>
            )}
        </View>
    )
};
export default CameraScreen;