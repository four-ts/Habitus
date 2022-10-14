import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {useTailwind} from 'tailwind-rn';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
    }

    return (
        <Container style={}> 
        <View Component>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always">
               
                <Text>Habitus</Text>
                <View> 
                <Text>Enter Email</Text>
                <TextInput
                    placeholder='Email'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                </View>
                <View> 

                <Text>Enter Password</Text>
                <TextInput
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                 </View>
                <TouchableOpacity
                    onPress={() => onLoginPress()}>
                    <Text >Log in</Text>
                </TouchableOpacity>
                <View >
                    <Text >Don't have an account? <Text onPress={onFooterLinkPress} >Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
        </Container>
    )
}