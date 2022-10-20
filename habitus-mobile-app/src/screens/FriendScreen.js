
import React from 'react'
import { View, ScrollView, } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const FriendScreen = ({ navigation }) => {

    return (
        <View style={tw`w-full bg-[#FAF0E4] h-300 pt-10 `}>
            <ScrollView style={tw``}>
                <View>
                    <View style={tw`flex flex-row justify-between text-center items-center`}>
                        <Text style={tw`text-3xl pb-4 mx-5 mt-6`}>Your Friends</Text>
                        <Button icon="bell-badge" color="black" size={32} />

                    </View>
                    <View style={tw`bg-orange-500 h-1`} />
                    <View style={tw`bg-red-500 h-1`} />
                    <View style={tw`bg-blue-500 h-1`} />
                </View>
                <View>
                    <Text style={tw`text-2xl pb-4 mx-5 mt-6`}>Your Habit Buddy!</Text>
                    <Card style={tw`bg-[#FAF0E4]`} elevation={10}>
                        <Card.Content>
                            <View style={tw`flex flex-row items-center`}>
                                <Icon name="certificate" size={45} color="black" />

                                <Text style={tw`text-3xl pb-4 mx-5 mt-6`}>Sarah Smith</Text>
                            </View>
                            <View style={tw`flex flex-col ml-14 `}>
                                <Text style={tw`text-lg`}>Completed the task</Text>
                                <Text style={tw``}>some task</Text>
                                <Text style={tw`text-sm`}>3 hours ago</Text>

                            </View>
                            <Button
                                style={tw`items-end ml-5`}
                                onPress={() => { navigation.navigate("text") }}>
                                <Icon name="chevron-right" size={24} color="black" />
                            </Button>

                        </Card.Content>
                        <Card.Actions style={tw`justify-center pt-4 flex-row`}>
                            <View style={tw`items-center flex-row`}>
                                <Button
                                    onPress={() => { navigation.navigate("text") }}
                                    mode="outlined"
                                    compact={false}
                                    color=""
                                    buttonColor="#D2651E"
                                    labelStyle={{ color: "#D2651E" }}
                                    style={tw` rounded-full py-2 mt-5  w-11/12  border-2 border-[#D2651E]`}>
                                    Encourage Sarah!
                                </Button>
                            </View>

                        </Card.Actions>
                    </Card >
                </View>
                <View>
                    <Text style={tw`text-lg pb-4 mx-5 mt-6`}>Other Friends</Text>
                    <Card style={tw`bg-[#FFE2BE]`} elevation={10}>
                        <Card.Content>
                            <View style={tw`flex flex-row  items-center`}>
                                <Icon name="certificate" size={30} color="#E9C273" />
                                <Icon name="certificate" size={30} color="#D2651E" />

                                <Text style={tw`text-3xl pb-4 mx-5 mt-6`}>John Smith + Billie Parker</Text>
                            </View>
                            <View style={tw`flex flex-col ml-14 `}>
                                <Text style={tw`text-lg`}>Completed their task for today</Text>
                                <Text style={tw``}>milestone name</Text>
                                <Text style={tw`text-sm`}>2 hours ago</Text>
                            </View>
                        </Card.Content>
                    </Card >
                </View>
                <View style={tw`mt-10 mb-140`}>
                    <Card style={tw`bg-[#FFE2BE]`} elevation={10}>
                        <Card.Content>
                            <View style={tw`flex flex-row  items-center`}>
                                <Icon name="certificate" size={30} color="#E9C273" />
                                <Icon name="certificate" size={30} color="#D2651E" />

                                <Text style={tw`text-3xl pb-4 mx-5 mt-6`}>Meghan Grange + Tilly Ruler</Text>
                            </View>
                            <View style={tw`flex flex-col ml-14 `}>
                                <Text style={tw`text-lg`}>Completed their task for today</Text>
                                <Text style={tw``}>milestone name</Text>
                                <Text style={tw`text-sm`}>5 hours ago</Text>
                            </View>
                        </Card.Content>
                    </Card >
                </View>
            </ScrollView>
        </View >
    )
}

export default FriendScreen;