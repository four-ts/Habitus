import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { auth, db } from '../../../firebase';
import tw from 'twrnc';
import { colors } from "../../assets/colors";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();

  const [Fname, setFname] = useState();

  const onSubmit = async () => {
    // create user info in the db
    try {
      // const res = auth.createUserWithEmailAndPassword(email.trim().toLowerCase(), password);
      const user = {
        fname: Fname,
        email: email,
        password: password,
      }
      await db.collection('users').doc("88").set(user);

      navigation.navigate('createGoalScreen');
    } catch (e) {
      console.log("error" + e);
    }

  };

  return (
    <View style={tw`mt-13`}>

      <>
        <Text style={tw`font-bold justify-start text-left pl-10 pb-2`}>First Name</Text>
        <View style={tw`flex justify-center items-center w-full pb-10 `}>
          <TextInput
            style={tw`w-5/6`}
            label="Name"
            mode="flat"
            selectionColor={colors.blue}
            activeUnderlineColor={colors.blue}
            underlineColor={colors.yellow}
            onChangeText={(value) => setFname(value)}
            value={Fname}
          />
        </View>
      </>

      <>
        <Text style={tw`font-bold justify-start text-left pl-10 pb-2`}>Email</Text>
        <View style={tw`flex justify-center items-center w-full pb-10 `}>
          <TextInput
            style={tw`w-5/6`}
            label="Email"
            mode="flat"
            selectionColor={colors.blue}
            activeUnderlineColor={colors.blue}
            underlineColor={colors.yellow}
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
        </View>
      </>


      <>
        <Text style={tw`font-bold justify-start text-left pl-10 pb-2`}>Password</Text>
        <View style={tw`flex justify-center items-center w-full pb-10 `}>
          <TextInput
            style={tw`w-5/6`}
            label="Password"
            mode="flat"
            selectionColor={colors.blue}
            activeUnderlineColor={colors.blue}
            underlineColor={colors.yellow}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>

      </>
      <>
        <Text style={tw`font-bold justify-start text-left pl-10 pb-2`}>Confirm Password</Text>
        <View style={tw`flex justify-center items-center w-full pb-10 `}>
          <TextInput
            style={tw`w-5/6`}
            label="Confirm Password"
            mode="flat"
            selectionColor={colors.blue}
            activeUnderlineColor={colors.blue}
            underlineColor={colors.yellow}
            onChangeText={(value) => setRePassword(value)}
            value={rePassword}
          />
        </View>
      </>

      <View style={tw`flex items-center`}>

        <Button
          mode="contained"
          compact={false}
          color={colors.blue}
          buttonColor="#fff"
          labelStyle={{ color: "white" }}
          onPress={() => {
            onSubmit();
          }}
          style={tw`w-2/6 rounded-full py-2 mb-10`}
        >
          Sign Up
        </Button>
      </View>
      <View style={tw`items-center`} onPress={() => { navigation.navigate('signIn') }}>
        <Text style={tw`pb-2`}>
          Already have an account?
        </Text>
        <Text style={tw`text-blue-600 font-bold`} onPress={() => { navigation.navigate('signIn') }}>
          Sign in
        </Text>
      </View>
    </View>
  );
};
export default RegisterScreen;