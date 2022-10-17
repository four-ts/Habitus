import React, { useState, useCallback } from 'react'
import { View, ScrollView } from 'react-native';
import { db } from '../../../firebase';
import { DatePickerModal } from 'react-native-paper-dates';
import { TextInput, Button, Text } from 'react-native-paper';
import tw from 'twrnc';
import { colors } from "../../assets/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import { en, registerTranslation, } from 'react-native-paper-dates';

registerTranslation('en', en);


const CreateGoalScreen = ({ navigation }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [open, setOpen] = useState(false);
  const [goalName, setGoalName] = useState();
  const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
  const [goal, setGoal] = useState({ title: undefined, startDate: undefined, endDate: undefined, partner: '' })

  const onSubmit = async () => {
    try {
      const goalObject = {
        title: goalName,
        startDate: goal.startDate,
        endDate: goal.endDate,
        // partner: ,
      }
      const ref = db.collection('goal');
      await ref.add(goalObject);

      navigation.navigate('createMilestone');
    } catch (e) {
      console.log(e);
    }
  }
  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);


  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setGoal({ title: goal.title, startDate: startDate, endDate: endDate, partner: goal.partner })
    },
    [setOpen]
  );

  return (
    <ScrollView style={tw`h-full bg-${colors.primaryBg} mt-20`}>

      <Text style={tw`justify-start text-left pl-10 pb-2  text-xl`}>The Goal is to...</Text>
      <View style={tw`flex justify-center items-center w-full pb-10 `}>
        <TextInput
          style={tw`w-5/6`}
          label="Enter Goal"
          mode="outlined"
          onChangeText={(input) => {
            setGoalName(input);
            setGoal({ title: input, startDate: goal.startDate, endDate: goal.endDate, partner: goal.partner });
          }}
          value={goalName}
        />
      </View>
      <Text style={tw`justify-start text-left pl-10 pb-2 text-xl`}>How long will it take?</Text>
      <View style={tw`flex justify-center w-full pb-10 `}>
        <View
          style={tw`flex flex-row items-center bg-slate-200 mx-8 justify-between`}
          onPress={() => { setOpen(!open) }}
        >
          <Text
            style={tw`pl-2 pb-2 text-xl pt-3`}
            onPress={() => { setOpen(!open) }} >
            {(!goal.startDate) ? "Add Dates" :
              new Date(goal.startDate).toLocaleDateString("en-GB") + '  -  ' + new Date(goal.endDate).toLocaleDateString("en-GB")}

          </Text>
          <Button
            style={tw``}
            onPress={() => { setOpen(!open) }}>
            <Icon name="calendar" size={24} color={colors.blue} />
          </Button>
        </View>
      </View>
      <DatePickerModal
        locale="en"
        mode="range"
        back
        startDate={startDate}
        endDate={endDate}
        visible={open}
        saveLabel="confirm"
        onDismiss={onDismiss}
        onConfirm={
          onConfirm
        }
        startYear={2022} // optional, default is 1800
        closeIcon="close" // optional, default is "close"
        calendarIcon="calendar" // optional, default is "calendar"
        endLabel="To"
      />
      {/* <Text variant="headlineSmall">Who is your Goal Buddy?</Text>
            <TextInput
              label="Enter friends code"
              mode="outlined"
              secureTextEntry
              onBlur={field.onBlur}
              onChangeText={(value) => field.onChange(value)}
              value={field.value}
            /> */}
      <View style={tw`flex items-center`}>

        <Button
          mode="contained"
          compact={false}
          color={colors.orange}
          buttonColor="#fff"
          labelStyle={{ color: "white" }}
          onPress={() => { onSubmit() }}
          style={tw`w-2/6 rounded-full py-2 mb-10`}
        >
          Next
        </Button>
      </View>
    </ScrollView>
  )
};
export default CreateGoalScreen;