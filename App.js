import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
  TouchableWithoutFeedbackBase,
  ScrollView,
} from 'react-native';

// import SyncStorage from 'sync-storage';

export default function App() {
  const [todos, setTodos] = useState(['Hello']);
  const [todo, setTodo] = useState('');

  const addItem = (newTodo) => {
    if (newTodo.length === 0) {
      Alert.alert(
        'Enter a String',
        'You have entered a string with 0 characters',
        [{ text: 'Okay', style: 'default' }]
      );
    } else {
      console.log(newTodo);
      setTodos([newTodo, ...todos]);
      setTodo('');
    }
  };

  const deleteTodo = (idx) => {
    setTodos(todos.filter((todo, id) => id !== idx));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.outerContainer}>
        <Text style={styles.header}>TODO</Text>
        <View style={styles.container}>
          <TextInput
            placeholder='new todo'
            style={styles.input}
            value={todo}
            onChangeText={(text) => {
              setTodo(text);
            }}
          ></TextInput>
          <Button title='Add' onPress={() => addItem(todo)}></Button>
        </View>
        <ScrollView style={styles.scrollView}>
          {todos.map((todo, idx) => (
            <View style={styles.todo} key={idx}>
              <Text style={styles.todoText}>{todo}</Text>
              <View style={styles.delete}>
                <Button
                  color='red'
                  title='Delete'
                  onPress={() => deleteTodo(idx)}
                ></Button>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  todos: {
    flexDirection: 'row',
  },
  delete: {
    marginLeft: 'auto',
    // position: 'absolute',
    // right: 0,
  },
  todoText: {
    fontSize: 26,
    alignSelf: 'flex-start',
    flexShrink: 1,
  },
  todo: {
    marginLeft: '10%',
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 5,
    // justifyContent: 'flex-end',
    width: '80%',
  },
  input: {
    height: 40,
    width: 160,
    fontSize: 25,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginVertical: 20,
  },
  header: {
    marginTop: 80,
    marginBottom: 0,
    fontSize: 20,
  },
  container: {
    marginTop: '10%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainer: {
    marginTop: '10%',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  scrollView: {},
});
