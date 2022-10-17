import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const Navbar = ({ navigation }) => {

    return (
        <BottomNavigation
        >
            <Appbar.Action icon="account" onPress={() => {
                navigation.navigate('homescreen');
            }} />
            <Appbar.Action icon="camera" onPress={() => {
                navigation.navigate('camera-screen');
            }} />
            <Appbar.Action icon="account-multiple" onPress={() => {
                navigation.navigate('goalscreen');
            }} />

        </BottomNavigation>
    );
};

export default Navbar;