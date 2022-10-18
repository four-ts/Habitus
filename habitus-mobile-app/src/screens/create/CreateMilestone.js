import React, { useState, useEffect } from 'react'
import { ScrollView, View, } from 'react-native';
import { db } from '../../../firebase';
import { DatePickerModal } from 'react-native-paper-dates';
import { TextInput, Button, Text, Paragraph, Dialog, Portal, List } from 'react-native-paper';
import { CreateTaskObject } from "../../assets/types/Task";
import tw from 'twrnc';
import { colors } from "../../assets/colors";
import Icon from 'react-native-vector-icons/FontAwesome';

const CreateMilestoneScreen = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [goalTitle, setGoalTitle] = useState();
    const [milestoneTitle, setMilestoneTitle] = useState("");
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });
    const [taskView, setTaskView] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [weeklyFreq, setWeeklyFreq] = useState({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false })
    const [frequency, setFrequency] = useState('');
    const [frequencyMenu, setFrequencyMenu] = useState(false);
    const [goalDocID, setGoalDocId] = useState();
    const [tasks, setTasks] = useState([]);

    const getGoal = async () => {
        var docRef = await db.collection("goal").get();
        // get 
        var doc = db.collection("goal").doc("uniqueGoal");

        doc.get().then((doc) => {
            if (doc.exists) {
                setGoalTitle(doc.data()["goalObject"]["title"]);
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    function resetWeek(input) {
        setWeeklyFreq({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false });
    }
    // frequency taskName, weeklyFreq, frequency
    const createTask = () => {
        if (taskName != '' && frequency != '') {
            const task = new CreateTaskObject(taskName, weeklyFreq, frequency);
            setTasks([...tasks, task]);
            setTaskName("");
            setFrequency("");
            resetWeek(weeklyFreq);
            return;
        } else {
            console.log("you must fill in the blanks!");
        }
    }

    function makeMileStoneTasks(tasks) {
        var res = []
        tasks.forEach(task => {
            res.push({ title: task.title, reminder: task.reminder, frequency: task.frequency, isCompleted: false })
        })

        return res
    }
    const renderWeekdays = (weekdays) => {
        var text = '';
        if (weekdays.mon == true)
            text += "Mon ";
        if (weekdays.tue == true)
            text += "Tue ";
        if (weekdays.wed == true)
            text += "Wed ";
        if (weekdays.thu == true)
            text += "Thu ";
        if (weekdays.fri == true)
            text += "Fri ";
        if (weekdays.sat == true)
            text += "Sat ";
        if (weekdays.sun == true)
            text += "Sun ";

        return text
    }

    const onSubmit = async () => {
        var goalDoc = db.collection("goal").doc("uniqueGoal");
        const goalInfo = (await goalDoc.get()).data();
        var mileStoneTasks = makeMileStoneTasks(tasks);
        var time = new Date();

        await goalDoc.set({ goal: goalInfo, timestamp: time, milestone: { title: milestoneTitle, isCompleted: false, startDate: range.startDate, endDate: range.endDate, tasks: mileStoneTasks } }, { merge: true })
        navigation.navigate("home")
    }
    const onDismiss = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmDates = React.useCallback(
        ({ startDate, endDate }) => {
            const rangeStart = startDate;
            const rangeEnd = endDate;
            setOpen(false);
            setRange({ startDate: rangeStart, endDate: rangeEnd });
        },
        [setOpen, setRange]
    );
    useEffect(() => {
        getGoal();
    }, [taskView])
    return (

        <View style={tw`w-full bg-[#FAF0E4] h-300`}>
            <ScrollView >
                <View style={tw`bg-amber-500 px-5`}>
                    <Text style={tw`font-bold pt-4 pb-2`}>Goal:</Text>
                    <Text style={tw`text-xl font-bold pb-4`}>{goalTitle}</Text>
                </View>
                <View style={tw`bg-red-500 h-1`} />
                <View style={tw`bg-blue-500 h-1`} />

                <Text style={tw`font-bold justify-start text-left px-5 pt-6`}>Milestone Name</Text>
                <View style={tw`flex w-full pb-2 px-5`}>
                    <TextInput
                        style={tw`w-full`}
                        label="Enter new milestone"
                        mode="flat"
                        selectionColor={colors.blue}
                        activeUnderlineColor={colors.blue}
                        underlineColor={colors.yellow}
                        onChangeText={(name) => setMilestoneTitle(name)}
                        value={milestoneTitle}
                    />
                </View>
                <View style={tw`bg-slate-500 h-1 mt-6 opacity-20`} />
                <View>
                    <Text style={tw`justify-start text-left px-5 pb-2 font-bold pt-6`}>How long will it take?</Text>
                    <View style={tw``}>
                        <View
                            style={tw`flex flex-row items-center bg-gray-200 px-2 mx-5 justify-between`}
                            onPress={() => { setOpen(!open) }}
                        >
                            <Text
                                style={tw`pl-2 pb-2 text-xl pt-3`}
                                onPress={() => { setOpen(!open) }} >
                                {(!range.startDate) ? "Add Dates" :
                                    new Date(range.startDate).toLocaleDateString("en-GB") + '  -  ' + new Date(range.endDate).toLocaleDateString("en-GB")}

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
                        startDate={range.startDate}
                        endDate={range.endDate}
                        visible={open}
                        saveLabel="confirm"
                        onDismiss={onDismiss}
                        onConfirm={
                            onConfirmDates
                        }
                        startYear={2022} // optional, default is 1800
                        closeIcon="close" // optional, default is "close"
                        calendarIcon="calendar" // optional, default is "calendar"
                        endLabel="To"
                    />
                </View>
                <View style={tw`bg-slate-500 h-1 mt-10 mb-6 opacity-20`} />



                <Text style={tw`justify-start text-left px-5 pb-2 font-bold mb-4`}>Tasks</Text>
                {tasks != [] &&
                    <>
                        {tasks.map((task, index) => {
                            return <Text key={index} style={tw`flex flex-col mx-5 p-2 mb-6 rounded-lg bg-slate-300`}>
                                <Text style={tw`text-lg font-bold`}>{task.title} {"\n"}</Text>
                                <Text style={tw`text-sky-900`}>Set {task.frequency} {"\n"}</Text>
                                <Text style={tw`text-blue-700`}>{renderWeekdays(task.reminder)}</Text>
                            </Text>
                        })}

                    </>

                }
                <View>
                    <View style={tw`items-center`}>
                        <Button
                            mode="outlined"
                            compact={false}
                            color={colors.blue}
                            labelStyle={{ color: colors.blue }}
                            onPress={() => { setTaskView(!taskView) }}
                            style={tw`w-4/6 rounded-full py-2 mt-4 mb-10 border-blue-400`}
                        >
                            <Icon name="plus" size={24} color={colors.blue} />
                        </Button>
                    </View>
                    <Portal>
                        <Dialog visible={taskView} onDismiss={() => { setTaskView(!taskView) }} style={tw`rounded-lg`}>
                            <Dialog.Content>
                                <Text style={tw`font-bold text-lg pb-6`}>Create a Task!</Text>

                                <Paragraph style={tw`justify-start text-left pb-2 font-bold `}>Enter a task name</Paragraph>

                                <TextInput
                                    label="task..."
                                    mode="outlined"
                                    style={tw`bg-slate-100/60`}
                                    outlineColor="black"
                                    underlineColor={colors.blue}
                                    activeOutlineColor={colors.blue}
                                    selectionColor={colors.blue}
                                    onChangeText={(taskName) => setTaskName(taskName)}
                                    value={taskName}
                                />

                                <List.Section >
                                    <Text style={tw`font-bold py-4`}>Frequency of task</Text>

                                    <List.Accordion
                                        style={tw`bg-slate-50 rounded-lg`}
                                        title={frequency == '' ? "Select" : frequency}
                                        right={props => <List.Icon {...props} icon="chevron-down" />}
                                        expanded={frequencyMenu}
                                        onPress={() => { setFrequencyMenu(!frequencyMenu) }}>
                                        <List.Item title="Daily" style={tw`bg-slate-100`} onPress={() => { setFrequency("daily"); setFrequencyMenu(!frequencyMenu); }} />
                                        <List.Item title="Weekly" style={tw`bg-slate-200`} onPress={() => { setFrequency("weekly"); setFrequencyMenu(!frequencyMenu) }} />
                                        <List.Item title="Fortnightly" style={tw`bg-slate-300`} onPress={() => { setFrequency("fortnightly"); setFrequencyMenu(!frequencyMenu) }} />
                                        <List.Item title="Monthly" style={tw`bg-slate-400`} onPress={() => { setFrequency("monthly"); setFrequencyMenu(!frequencyMenu) }} />
                                    </List.Accordion>
                                </List.Section>
                                <Text style={tw`font-bold py-4`}>When will you complete this task?</Text>
                                <View style={tw`flex-row justify-between`}>
                                    <Button mode={"elevated"}
                                        labelStyle={tw`${weeklyFreq.mon ? "text-white" : "text-black"}`}
                                        style={tw`${weeklyFreq.mon ? "bg-[#D2651E]" : "bg-[#D9D9D9]"}`}
                                        onPress={() => setWeeklyFreq({ mon: !weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                        M
                                    </Button>
                                    <Button mode="elevated"
                                        labelStyle={tw`${weeklyFreq.tue ? "text-white" : "text-black"}`}
                                        style={tw`${weeklyFreq.tue ? "bg-[#D2651E]" : "bg-[#D9D9D9]"}`}
                                        onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: !weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                        T
                                    </Button>
                                    <Button mode="elevated"
                                        labelStyle={tw`${weeklyFreq.wed ? "text-white" : "text-black"}`}
                                        style={tw`${weeklyFreq.wed ? "bg-[#D2651E]" : "bg-[#D9D9D9]"}`}
                                        onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: !weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                        W
                                    </Button>
                                </View>
                                <View style={tw`flex-row justify-between pt-4`}>
                                    <Button mode="elevated"
                                        labelStyle={tw`${weeklyFreq.thu ? "text-white" : "text-black"}`}
                                        style={tw`${weeklyFreq.thu ? "bg-[#D2651E]" : "bg-[#D9D9D9]"}`}
                                        onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: !weeklyFreq.thu, fri: weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                        T
                                    </Button>
                                    <Button mode="elevated"
                                        labelStyle={tw`${weeklyFreq.fri ? "text-white" : "text-black"}`}
                                        style={tw`${weeklyFreq.fri ? "bg-[#D2651E]" : "bg-[#D9D9D9]"}`}
                                        onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: !weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                        F
                                    </Button>
                                    <Button mode="elevated"
                                        labelStyle={tw`${weeklyFreq.sat ? "text-white" : "text-black"}`}
                                        style={tw`${weeklyFreq.sat ? "bg-[#D2651E]" : "bg-[#D9D9D9]"}`}
                                        onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: !weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                        S
                                    </Button>
                                    <Button mode="elevated"
                                        labelStyle={tw`${weeklyFreq.sun ? "text-white" : "text-black"}`}
                                        style={tw`${weeklyFreq.sun ? "bg-[#D2651E]" : "bg-[#D9D9D9]"}`}
                                        onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: weeklyFreq.sat, sun: !weeklyFreq.sun })}>
                                        S
                                    </Button>
                                </View>
                            </Dialog.Content>

                            <Dialog.Actions>
                                <Button
                                    labelStyle={tw`text-[#5C82DC]`}
                                    onPress={() => { setTaskView(!taskView); createTask(); }}>Create Task</Button>
                            </Dialog.Actions>
                        </Dialog>

                    </Portal>
                </View>
                <View style={tw`items-center`}>
                    <Button
                        mode="contained"
                        compact={false}
                        color={colors.blue}
                        buttonColor="#fff"
                        labelStyle={{ color: "white" }}
                        onPress={() => { onSubmit() }}
                        style={tw`w-4/6 rounded-full py-2 mt-4 mb-10`}
                    >
                        Add Milestone

                    </Button>
                </View>
            </ScrollView>
        </View >
    )
};
export default CreateMilestoneScreen;