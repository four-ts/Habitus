
import React, { useState, useEffect, useRef } from 'react'
import { Camera, CameraType } from 'expo-camera';
import { Image, View, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';
import CameraPreview from './CameraPreview';

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
        <View>
            {preview && photo ? (<CameraPreview style={tw`mb-10`} navigation={navigation} image={photo} retakePicture={retakePhoto} description={description} setDescription={setDescription} />
            ) : (
                <Camera style={tw`mt-10`} type={type} ref={(r) => {
                    camera = r
                }}>
                    <View style={tw`h-full`} >
                        <TouchableOpacity
                            onPress={toggleCameraType}
                            style={{
                                marginTop: 20,
                                borderRadius: '50%',
                                height: 25,
                                width: 25
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20
                                }}
                            >
                                {type === 'front' ? '?' : '?'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: '#fff'
                        }} onPress={() => { takePhoto() }}>
                        </TouchableOpacity>
                    </View>
                </Camera>)}
        </View>
    )
};
export default CameraScreen;