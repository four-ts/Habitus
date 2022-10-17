
import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { db } from '../../firebase';
import { Avatar, Button, Card, Title, Paragraph, Text, Checkbox } from 'react-native-paper';

const GoalScreen = ({ navigation }) => {
    const [title, setTitle] = useState("");
    const [partner, setPartner] = useState("");
    const [milestone, setMilestone] = useState("");

    const getGoal = async () => {
        var docRef = await db.collection("goal").get();
        var docId = docRef.docs[0].id
        // get 
        var doc = db.collection("goal").doc(docId);

        doc.get().then((doc) => {
            if (doc.exists) {
                setTitle(doc.data()["title"]);
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    useEffect(() => {
        getGoal();
    }, [])
    return (
        <View>
            <Card>
                <Card.Title title="The Goal" />
                <Card.Content>
                    <Title>{title}</Title>
                </Card.Content>
                <Card.Actions>
                    <Button icon="chevron-right" onPress={() => {
                        getGoal();
                    }} />
                </Card.Actions>
            </Card>
        </View>
    )
};
export default HomeScreen;