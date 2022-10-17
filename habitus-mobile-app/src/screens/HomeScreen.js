
import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native';
import { useForm, Controller, set } from 'react-hook-form';
import { db } from '../../firebase';
import { Avatar, Button, Card, Title, Paragraph, Text, Checkbox } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const [docId, setDocId] = useState();

    const getGoalInfo = async () => {
        var docRef = await db.collection("goal").get();
        setDocId(docRef.docs[0].id);
        var doc = db.collection("goal").doc(docId);

        doc.get().then((fields) => {
            if (fields.exists) {
                setTitle(fields.data()["milestone"]["title"]);
                setTasks(fields.data()["milestone"]["tasks"])
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    useEffect(() => {
        getGoalInfo();
    }, [tasks])

    async function setTaskCompleted(taskIndex) {
        var goalDoc = db.collection("goal").doc(docId);
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
        <View>
            <Card>
                <Card.Title title="The Goal" />
                <Card.Content>
                    <Title>{title}</Title>
                    <View>
                        {tasks.map((task, index) => {
                            return <Checkbox.Item
                                key={index}
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
                <Card.Actions>
                    <Button icon="chevron-right" onPress={() => {
                        navigation.navigate('create-goal-screen');

                    }} />
                </Card.Actions>
            </Card>
        </View>
    )
};
export default HomeScreen;