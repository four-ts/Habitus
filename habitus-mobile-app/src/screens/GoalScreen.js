
import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native';
import { db } from '../../firebase';
import { Avatar, Button, Card, Title, Paragraph, Text, Checkbox } from 'react-native-paper';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const GoalScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [milestone, setMilestone] = useState("");
    const [tasks, setTasks] = useState([]);
    const [toggleHistory, setToggleHistory] = useState(true);


    const getGoal = async () => {
        var docRef = await (await db.collection("goal").doc("uniqueGoal").get()).data();
        // get 
        setTitle(docRef["goalObject"]["title"]);
        setMilestone(docRef["milestone"]["title"]);
        setTasks(docRef["milestone"]["tasks"]);

    }

    async function setTaskCompleted(taskIndex) {
        var goalDoc = db.collection("goal").doc("uniqueGoal");
        goalDoc.get().then((fields) => {
            if (fields.exists) {
                const goalDocTasks = fields.data()
                const goalDocMilestone = fields.data()["milestone"];
                goalDocMilestone.tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;


                goalDoc.update(
                    { "milestone.tasks": goalDocMilestone.tasks }
                )

            } else {
                console.log("No such document! Cannot change tasks");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    useEffect(() => {
        getGoal();
    }, [])
    return (
        <View style={tw`pt-13 bg-[#FAF0E4] h-100`}>
            <ScrollView>

                <Card>
                    <Card.Content style={tw`bg-[#E9C273] py-4`}>
                        <Title style={tw`text-black`}>{title}</Title>
                    </Card.Content>
                    <View style={tw`bg-orange-500 h-1`} />
                    <View style={tw`bg-red-500 h-1`} />
                    <View style={tw`bg-blue-500 h-1`} />
                </Card>
                <Text style={tw`text-xl pb-4 mx-5 mt-5`}>You share this goal with...</Text>
                <Text style={tw`text-xl font-bold pb-4 mx-5`}>Sarah Smith </Text>
                <View style={tw`bg-slate-300 h-1`} />
                {!toggleHistory ? <Card elevation={10}>
                    <Card.Content style={tw` py-4`}>
                        <Title style={tw`text-gray-400`}>Current Milestone</Title>
                        <Text style={tw`text-xl pb-4 mt-5 mb-3`}>{milestone}</Text>
                        <Title style={tw`text-black mb-3`}>Tasks</Title>

                        <View>
                            {tasks.map((task, index) => {
                                return <Checkbox.Item
                                    key={index}
                                    labelStyle={tw`${task.isCompleted ? "line-through" : ""} text-xl `}
                                    position="leading"
                                    mode="android"
                                    label={task.title}
                                    status={task.isCompleted ? "checked" : "unchecked"}
                                    onPress={() => {
                                        setTaskCompleted(index)
                                    }}
                                />
                            })}
                            <View style={tw`items-center ml-3 mt-5 flex-row`}>
                                <Button
                                    onPress={() => { setToggleHistory(!toggleHistory) }}
                                    mode="outlined"
                                    compact={false}
                                    color=""
                                    buttonColor="#5C82DC"
                                    labelStyle={{ color: "#5C82DC" }}
                                    style={tw` rounded-full py-2 mt-5  w-11/12  border-2 border-[#5C82DC]`}>
                                    Completed Milestone
                                </Button>
                            </View>
                        </View>
                    </Card.Content>

                </Card> : <View style={tw`items-center ml-3 mt-5 flex-row`}>
                    <Button
                        onPress={() => { navigation.navigate("createMilestone") }}
                        mode="outlined"
                        compact={false}
                        color=""
                        buttonColor="#5C82DC"
                        labelStyle={{ color: "#5C82DC" }}
                        style={tw` rounded-full py-2 mt-5  w-11/12  border-2 border-[#5C82DC]`}>
                        Create New Milestone

                    </Button>
                </View>
                }
                <View style={tw`bg-slate-300 h-1 mt-8`} />
                <Title style={tw`mx-5 mt-5`}>Milestone History</Title>
                {toggleHistory &&
                    <View>
                        <Card style={tw``} elevation={10}>
                            <Card.Content>
                                <View style={tw`flex flex-row justify between items-center`}>
                                    <Icon name="check" size={50} color="green" />

                                    <Text style={tw`text-3xl pb-4 mx-5 mt-6`}>{milestone}</Text>
                                </View>
                                <View style={tw`flex flex-col ml-18 `}>
                                    <Text style={tw`text-lg`}>Date: 19 October 2022</Text>
                                </View>
                            </Card.Content>
                        </Card >
                    </View >}

            </ScrollView >

        </View >
    )
};
export default GoalScreen;