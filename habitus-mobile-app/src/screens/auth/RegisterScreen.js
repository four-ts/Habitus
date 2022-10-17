import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { auth, db } from '../../../firebase';
import tw from 'twrnc';
import { colors } from "../../assets/colors";

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    errors,
    watch,
    register } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const fname = useRef({});
  fname.current = watch("fname", '');

  const onSubmit = async (data) => {
    const { email, password } = data;

    const res = await auth
      .createUserWithEmailAndPassword(
        email.trim().toLowerCase(), password
      );

    // create user info in the db 
    try {
      const user = {
        uid: res.user.uid,
        name: fname.current,
        partner: '',
      }
      const ref = db.collection('users');
      await ref.add(user);

      navigation.navigate('createGoal');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={tw`mt-13`}>
      <Controller
        control={control}
        name="fname"
        render={({ field }) => (
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
                onBlur={field.onBlur}
                onChangeText={(value) => field.onChange(value)}
                value={field.value}
              />
            </View>
          </>
        )}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
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
                onBlur={field.onBlur}
                onChangeText={(value) => field.onChange(value)}
                value={field.value}
              />
            </View>
          </>
        )}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
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
                onBlur={field.onBlur}
                onChangeText={(value) => field.onChange(value)}
                value={field.value}
              />
            </View>
          </>
        )}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        name="rePassword"
        render={({ field }) => (
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
                onBlur={field.onBlur}
                onChangeText={(value) => field.onChange(value)}
                value={field.value}
              />
            </View>
          </>
        )}
        rules={{ required: true }}
        defaultValue=""
      />
      <View style={tw`flex items-center`}>

        <Button
          mode="contained"
          compact={false}
          color={colors.blue}
          buttonColor="#fff"
          labelStyle={{ color: "white" }}
          onPress={handleSubmit(onSubmit)}
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