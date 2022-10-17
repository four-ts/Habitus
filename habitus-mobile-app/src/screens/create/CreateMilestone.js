import React, { useState, useEffect } from 'react'
import { ScrollView, View, FlatList, ListView } from 'react-native';
import { useForm, Controller, set } from 'react-hook-form';
import { db } from '../../../firebase';
import { DatePickerModal } from 'react-native-paper-dates';
import { TextInput, Button, Text, Paragraph, Dialog, Portal, Provider, Menu, Divider, List } from 'react-native-paper';
import tw from 'twrnc';
import { CreateTaskObject } from "../../assets/types/Task";
import { CreateMilestone } from "../../assets/types/Milestone";


const CreateMilestoneScreen = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [goalTitle, setGoalTitle] = useState();

    const [milestoneTitle, setMilestoneTitle] = useState("");
    const [range, setRange] = useState({ startDate: undefined, endDate: undefined });


    const [taskView, setTaskView] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [weeklyFreq, setWeeklyFreq] = useState({ mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false })
    // const [mon, setMon] = useState(false);
    // const [tue, setTue] = useState(false);
    // const [wed, setWed] = useState(false);
    // const [thu, setThu] = useState(false);
    // const [fri, setFri] = useState(false);
    // const [sat, setSat] = useState(false);
    // const [sun, setSun] = useState(false);
    const [frequency, setFrequency] = useState('');

    const [frequencyMenu, setFrequencyMenu] = useState(false);
    const [goalDocID, setGoalDocId] = useState();
    const [tasks, setTasks] = useState([]);

    const getGoal = async () => {
        var docRef = await db.collection("goal").get();
        var docId = docRef.docs[0].id
        setGoalDocId(docId);
        // get 
        var doc = db.collection("goal").doc(docId);

        doc.get().then((doc) => {
            if (doc.exists) {
                setGoalTitle(doc.data()["title"]);
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

    const onSubmit = async () => {
        var goalDoc = db.collection("goal").doc(goalDocID);
        var mileStoneTasks = makeMileStoneTasks(tasks);
        await goalDoc.set({ milestone: { title: milestoneTitle, isCompleted: false, startDate: range.startDate, endDate: range.endDate, tasks: mileStoneTasks } }, { merge: true })
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
        <View>
            <Text variant="labelLarge">Add a Milestone</Text>
            <Text variant="labelMedium">{goalTitle}</Text>
            <Text variant="labelLarge">Milestone Name</Text>

            <TextInput
                label="Enter a name"
                mode="outlined"
                onChangeText={(name) => setMilestoneTitle(name)}
                value={milestoneTitle}
            />


            <View>
                <Text variant="headlineSmall">How long is the Milestone?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text onPress={() => { setOpen(!open) }} variant="bodyMedium">{(range.startDate == undefined) ? "DD/DD/YYYY" : `${new Date(range.startDate).toLocaleDateString("en-GB")} - ${new Date(range.endDate).toLocaleDateString("en-GB")}`}</Text>
                    <Button icon="calendar" onPress={() => { setOpen(!open) }} />
                    <DatePickerModal
                        locale="en"
                        mode="range"
                        startDate={range.startDate}
                        endDate={range.endDate}
                        visible={open}
                        saveLabel="Save"
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



            </View>
            <Text variant="labelLarge">Tasks</Text>
            {tasks != [] &&
                <>
                    <FlatList data={tasks} renderItem={
                        ({ item }) => { return <Text style={tw`flex flex-col`}><Text>{item.title} {"\n"}</Text><Text>Set {item.frequency}</Text> </Text> }
                    }
                    />
                </>
            }
            <Button onPress={() => { setTaskView(!taskView) }}>Add a Task</Button>

            <ScrollView >

                <Portal>
                    <Dialog visible={taskView} onDismiss={() => { setTaskView(!taskView) }} style={{
                        width: undefined, height: undefined, backgroundColor: 'powderblue'
                    }}>
                        <Dialog.Content>
                            <Paragraph>Create a Task</Paragraph>

                            <TextInput
                                label="Enter a task name"
                                mode="outlined"
                                onChangeText={(taskName) => setTaskName(taskName)}
                                value={taskName}
                            />

                            <List.Section title="Frequency">
                                <List.Accordion
                                    title={frequency == '' ? "Select Frequency of this Task" : frequency}
                                    right={props => <List.Icon {...props} icon="chevron-down" />}
                                    expanded={!frequencyMenu}
                                    onPress={() => { setFrequencyMenu(!frequencyMenu) }}>
                                    <List.Item title="daily" onPress={() => { setFrequency("daily"); setFrequencyMenu(!frequencyMenu); }} />
                                    <List.Item title="weekly" onPress={() => { setFrequency("weekly"); setFrequencyMenu(!frequencyMenu) }} />
                                    <List.Item title="fortnightly" onPress={() => { setFrequency("fortnightly"); setFrequencyMenu(!frequencyMenu) }} />
                                    <List.Item title="monthly" onPress={() => { setFrequency("monthly"); setFrequencyMenu(!frequencyMenu) }} />
                                </List.Accordion>
                            </List.Section>
                            <Text>Which day of the week will this task occur?</Text>
                            <View style={tw`flex-row justify-between`}>
                                <Button mode={"elevated"} buttonColor={weeklyFreq.mon ? "#D9D9D9" : "#E9C273"} onPress={() => setWeeklyFreq({ mon: !weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                    M
                                </Button>
                                <Button mode="elevated" buttonColor={weeklyFreq.tue ? "#D9D9D9" : "#E9C273"} onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: !weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                    T
                                </Button>
                                <Button mode="elevated" buttonColor={weeklyFreq.wed ? "#D9D9D9" : "#E9C273"} onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: !weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                    W
                                </Button>
                            </View>
                            <View style={tw`flex-row justify-between`}>
                                <Button mode="elevated" buttonColor={weeklyFreq.thu ? "#D9D9D9" : "#E9C273"} onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: !weeklyFreq.thu, fri: weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                    T
                                </Button>
                                <Button mode="elevated" buttonColor={weeklyFreq.fri ? "#D9D9D9" : "#E9C273"} onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: !weeklyFreq.fri, sat: weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                    F
                                </Button>
                                <Button mode="elevated" buttonColor={weeklyFreq.sat ? "#D9D9D9" : "#E9C273"} onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: !weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                    S
                                </Button>
                                <Button mode="elevated" buttonColor={weeklyFreq.sun ? "#D9D9D9" : "#E9C273"} onPress={() => setWeeklyFreq({ mon: weeklyFreq.mon, tue: weeklyFreq.tue, wed: weeklyFreq.wed, thu: weeklyFreq.thu, fri: weeklyFreq.fri, sat: !weeklyFreq.sat, sun: weeklyFreq.sun })}>
                                    S
                                </Button>
                            </View>
                        </Dialog.Content>

                        <Dialog.Actions>
                            <Button onPress={() => { setTaskView(!taskView); createTask(); }}>Create Task</Button>
                        </Dialog.Actions>
                    </Dialog>

                </Portal>
                <View>

                    <Button
                        mode="contained"
                        compact={false}
                        onPress={() => { onSubmit() }}
                    >
                        Create Milestone
                    </Button>
                </View>
            </ScrollView>
        </View >
    )
};
export default CreateMilestoneScreen;