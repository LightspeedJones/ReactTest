import * as React from 'react';
import {useState, useEffect} from 'react';
import {Text, View} from '../components/Themed';
import Styles from '../constants/Styles';
import {Button, TextInput} from 'react-native';
import {Task} from '../model/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

function CreateTask(props: { addTask: (value: string) => void }) {
    const [value, setValue] = useState("");
  
    const handleSubmit = () => {
        if (!value) return;
        props.addTask(value);
        setValue("");
    }
  
    return (
        <View style={Styles.btnAdd}>
            <TextInput
                style={{backgroundColor: '#ffffff', padding: 10, color: '#000000'}}
                value={value}
                placeholder="Add a new task"
                onChangeText={e => setValue(e)}
            />
            <Button onPress={handleSubmit} title={"Add"}/>
        </View>
    );
}

function TaskRow(props: { task: Task, index: number, onCompleted: (index: number) => void, onDeleted: (index: number) => void }) {
    return (
        <View style={Styles.row}>
            <Text>💡</Text>
            <Text numberOfLines={1} style={[{textDecorationLine: props.task.completed ? "line-through" : "none",}, Styles.text]}>{props.task.title}</Text>
            <View style={Styles.btnDoneRemove}>
                <Button onPress={() => (props.onCompleted(props.index))} title={props.task.completed ? "Undone" : "Done"}/>
                <Button onPress={() => (props.onDeleted(props.index))} title="Remove"/>
            </View>
        </View>
    );
  }

 export function Todo() {
    const [tasks, setTasks] = useState([
        {
            title: "",
            completed: false
        }
    ])
  
    useEffect(() => {getTasks()}, [])
  
    const getTasks = async () => {
        const json = await AsyncStorage.getItem('tasks');
        let jsonObj = json != null ? JSON.parse(json) : null;
        setTasks(jsonObj);
    }
  
    const addTask = async (title: string) => {
        const newTasks = [...tasks, {title, completed: false}];
        saveTaskJson(newTasks);
    };
  
    const completeTask = async  (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        saveTaskJson(newTasks);
    };
  
    const removeTask = async (index: number) => {
        const taskList = [...tasks];
        taskList.splice(index, 1);
        saveTaskJson(taskList);
    }
  
    //seta o json para salvar as tarefas com asyncstorage
    const saveTaskJson = async (json: Task[]) => {
        setTasks(json)
        const jsonString = JSON.stringify(json)
        await AsyncStorage.setItem('tasks', jsonString)
    }
  
    return (
        <View style={Styles.listContainer}>
            <ScrollView style={Styles.list}>
                {tasks.map((task, index) => (
                    <TaskRow
                    onDeleted={removeTask}
                    onCompleted={completeTask}
                    task={task}
                    index={index}
                    key={index}
                    />
                ))}
            </ScrollView>
            <View>
                <CreateTask addTask={addTask}/>
            </View>
      </View>
    );
}