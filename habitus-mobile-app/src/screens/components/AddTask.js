import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const AddTask = ({ startView }) => {
    const [taskView, setTaskView] = useState(startView);

    return (
        <Provider>
            <View>
                <Portal>
                    <Dialog visible={taskView} onDismiss={() => { setTaskView(!taskView) }}>
                        <Dialog.Title>Alert {taskView}</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>This is simple dialog</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => { setTaskView(!taskView) }}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
};

export default AddTask;