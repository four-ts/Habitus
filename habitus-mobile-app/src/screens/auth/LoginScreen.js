import React from 'react'
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Text } from 'react-native-paper'
import { auth } from '../../../firebase';
import tw from 'twrnc';
import { colors } from "../../assets/colors";
const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm(
    {
      defaultValues: {
        email: "",
        password: ""
      }
    }
  );
  const onSubmit = (data) => {
    const { email, password } = data;
    auth
      .signInWithEmailAndPassword(
        email.trim().toLowerCase(), password
      );
  }
  return (
    <View style={tw`flex h-full pt-30 bg-${colors.primaryBg}`}>
      <Text variant="displayLarge" style={tw`text-center text-4xl font-bold pb-20`}>Habitus</Text>
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
        )
        }
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field }) => (
          <>
            <Text style={tw`font-bold justify-start text-left pl-10 pb-2`}>Password</Text>
            <View style={tw`flex justify-center items-center w-full pb-2 `}>
              <TextInput
                style={tw`w-5/6`}
                label="Password"
                mode="flat"
                onBlur={field.onBlur}
                selectionColor={colors.blue}
                activeUnderlineColor={colors.blue}
                underlineColor={colors.yellow}
                onChangeText={(value) => field.onChange(value)}
                value={field.value}
              />
            </View>
            <View style={tw`pb-10`}>
              <Text style={tw`text-right mr-10 text-blue-600 underline`}>
                Forgot Password?
              </Text>
            </View>

          </>
        )}
        name="password"
        rules={{ required: true }}
      />

      <View style={tw`flex items-center`}>

        <Button
          mode="contained"
          compact={false}
          color={colors.blue}
          buttonColor="#fff"
          labelStyle={{ color: "white" }}
          onPress={handleSubmit(onSubmit)}
          style={tw`w-2/6 rounded-full py-2 mb-20`}
        >
          Login
        </Button>
      </View>
      <View style={tw`items-center`} onPress={() => { navigation.navigate('register') }}>
        <Text style={tw`pb-2`}>
          Don't have an account yet?
        </Text>
        <Text style={tw`text-blue-600 font-bold`} onPress={() => { navigation.navigate('register') }}>
          Register Account
        </Text>
      </View>
    </View >
  )
};
export default LoginScreen;