import * as React from 'react';
import {useState} from 'react';
import {Button, Pressable, StyleSheet, TextInput} from 'react-native';
import {Text, View} from '../components/Themed';
import {ScrollView} from 'react-native-gesture-handler';

export type Task = {
  title: string
  completed: boolean
}

export default function TodoListScreen() {
  return (
    <View style={styles.container}>
      <Todo/>
    </View>
  );
}

function Task(props: { task: Task, index: number, onCompleted: (index: number) => void }) {
  return (
    <View style={styles.row}>
      <View style={styles.btnDone}>
        <Button onPress={() => (props.onCompleted(props.index))} title={props.task.completed ? "Undone" : "Done"}/>
      </View>
      <Text style={[{textDecorationLine: props.task.completed ? "line-through" : "none",}, styles.text]}>{props.task.title}</Text>💡
    </View>
  );
}

function Todo() {
  const [tasks, setTasks] = useState([
    {
      title: "Grab some Pizza",
      completed: true
    },
    {
      title: "Do your workout",
      completed: true
    },
    {
      title: "Hangout with friends",
      completed: false
    }
  ]);

  const addTask = (title: string) => {
    const newTasks = [...tasks, {title, completed: false}];
    setTasks(newTasks);
  };

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <View style={styles.treco}>
      <ScrollView style={styles.list}>
        {tasks.map((task, index) => (
          <Task
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

function CreateTask(props: { addTask: (value: string) => void }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    props.addTask(value);
    setValue("");
  }

  return (
    <View style={styles.btnAdd}>
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  list: {
    overflowY: scroll,
    maxHeight: 300,
    flex: 1,
    padding: 15,
  },
  text: {
    padding: 5
  },
  treco: {
    width: '90%'
  },
  btnAdd:{
    // width: '50%',
    // alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnDone: {
    width: 100,
    // justifyContent: 'center',
    alignContent: 'center',
  }
});
