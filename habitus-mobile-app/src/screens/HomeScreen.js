
import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView } from 'react-native';
import { db } from '../../firebase';
import { Button, Card, Title, Paragraph, Text, Checkbox } from 'react-native-paper';

import tw from 'twrnc';
import { colors } from "../assets/colors";
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const [docId, setDocId] = useState();
    const [photos, setPhotos] = useState([]);
    const [toggleLike, setToggleLike] = useState(true);
    const getGoalInfo = async () => {
        var docRef = await db.collection("goal").get();
        if (docRef != undefined) {
            setDocId(docRef.docs[0].id);
            var doc = db.collection("goal").doc("uniqueGoal");

            doc.get().then((fields) => {
                if (fields.exists) {
                    setTitle(fields.data()["goalObject"]["title"]);
                    setTasks(fields.data()["milestone"]["tasks"])
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }

    useEffect(() => {
        getGoalInfo();
    }, [tasks])


    useEffect(() => {
        getPhotos();
    }, [])
    const getPhotos = async () => {
        const photosInfo = await db.collection("photos").get();
        photosInfo.forEach(photoInfo => {
            const rawInfo = photoInfo.data();
            const singlePhoto = { rawInfo, id: photoInfo.id }
            setPhotos([...photos, singlePhoto]);
        });
    }

    const addLike = async (docID) => {
        const photoInfo = await (await db.collection("photos").doc(docID).get()).data();
        photoInfo["likes"] += 1;
        await db.collection("photos").doc(docID).set(photoInfo);
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

    return (
        <View style={tw`w-full bg-[#FAF0E4] h-300`}>

            <ScrollView style={{ flex: 1, padding: 10 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={tw`mt-15 mb-250`}>

                    <View style={tw`flex flex-row justify-between text-center items-center ml-5 mb-4`}>
                        <Text style={tw`text-xl font-bold pb-4`}>Hi There! 👋 </Text>
                        <Button style={tw``} icon="bell-badge" color="black" size={28} />
                    </View>

                    <Card style={tw`bg-[#FAF0E4]`} elevation={10}>
                        <View style={tw`w-full flex items-center text-center`}>
                            <Card.Title titleStyle={tw`font-bold text-center text-slate-500 `} title="Your Goal" />
                        </View>
                        <View style={tw`bg-orange-500 h-1`} />
                        <View style={tw`bg-red-500 h-1`} />
                        <View style={tw`bg-blue-500 h-1`} />
                        <Card.Content>
                            <Title style={tw`font-bold text-center py-8`}>{title}</Title>
                            <View style={tw`bg-slate-500 h-1  opacity-20`} />
                            <View>
                                <Text style={tw`text-xl pb-4 pt-2 items-center text-center`}> Todays Tasks: </Text>
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
                            </View>
                        </Card.Content>
                        <Card.Actions style={tw`justify-end pt-4`}>
                            <Button
                                style={tw``}
                                onPress={() => { setOpen(!open) }}>
                                <Icon name="chevron-right" size={24} color="black" />
                            </Button>
                        </Card.Actions>
                    </Card >
                    <Text style={tw`text-xl font-bold pb-4 mx-5 mt-6`}>Your Feed </Text>

                    <View style={tw`bg-yellow-200 p-3 `}>
                        {photos != [] &&
                            <>
                                {
                                    photos.map((photo, index) => {
                                        return (
                                            <View style={tw`my-5`} key={index}>
                                                <View style={tw`flex flex-row justify-between `}>
                                                    <Icon name="certificate" size={24} color="black" />
                                                    <View style={tw` ml-2`}>
                                                        <Text style={tw`text-lg  `}>{photo["rawInfo"]["userName"]} </Text>
                                                        <Text style={tw``}>Goal Partner: Sarah Smith </Text>
                                                        <Text style={tw`text-sm   text-slate-800`}>{photo["rawInfo"]["milestoneTitle"]} </Text>
                                                    </View>
                                                    <View style={tw`flex flex-col items-center mt-3`}>
                                                        <Icon name="heart" size={24} color={toggleLike ? "black" : "red"} />
                                                        <Text style={tw`text-lg  mx-5 `}>{photo["rawInfo"]["likes"]}</Text>
                                                    </View>
                                                </View>

                                                <Text style={tw`text-lg mx-5 mt-8 mb-4`}>Worked out today!! </Text>
                                                <Image
                                                    style={tw`h-100 mx-5 rounded-lg `}
                                                    source={{ uri: photo["rawInfo"]["uri"] }}
                                                />
                                                <View style={tw`items-end`}>
                                                    <Button labelStyle={tw`text-blue-400`} style={tw`rounded-lg mt-3 border-[#5C82DC] border-2 mx-5 mb-6 w-2/6`}
                                                        onPress={() => { if (toggleLike) { addLike(photo["id"]) } setToggleLike(!toggleLike) }}
                                                    >
                                                        Like
                                                    </Button>
                                                </View>
                                            </View>
                                        );

                                    })
                                }
                            </>
                        }
                    </View>
                    <View style={tw`bg-yellow-200 p-3 mb-10 mt-10`}>
                        <View style={tw`flex flex-row justify-between `}>
                            <Icon name="certificate" size={24} color="black" />
                            <View style={tw` ml-2`}>
                                <Text style={tw`text-lg  `}>John Smith </Text>
                                <Text style={tw``}>Goal Partner: Billie Parker </Text>
                                <Text style={tw`text-sm   text-slate-800`}>HIIT Workout - World Gym[45 Minutes] </Text>
                            </View>
                            <View style={tw`flex flex-col items-center mt-3`}>
                                <Icon name="heart" size={24} color="black" />
                                <Text style={tw`text-lg  mx-5 `}>30 </Text>
                            </View>
                        </View>

                        <Text style={tw`text-lg mx-5 mt-8 mb-4`}>Worked out today!! </Text>
                        <Image
                            style={tw`h-100 mx-5 rounded-lg `}
                            source={{ uri: 'https://images.unsplash.com/photo-1580261450046-d0a30080dc9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=709&q=80' }}
                        />
                        <View style={tw`items-end`}>
                            <Button labelStyle={tw`text-blue-400`} style={tw`rounded-lg mt-3 border-[#5C82DC] border-2 mx-5 mb-6 w-2/6`}>
                                Like
                            </Button>
                        </View>
                    </View>
                </View >
            </ScrollView >
        </View>
    )
};
export default HomeScreen;