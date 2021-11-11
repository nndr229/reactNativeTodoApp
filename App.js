import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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
  AsyncStorage,
} from 'react-native';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';

export default function App() {
  const [todo, setTodo] = useState('');

  const [todos, setTodos] = useState(async () => {
    AsyncStorage.getItem('@MySuperStore:key')
      .then((value) => {
        if (value === null) {
          setTodos([]);
        } else {
          setTodos(JSON.parse(value));
        }
      })
      .done();

    // try {
    //   const value = await AsyncStorage.getItem('@MySuperStore:key');
    //   // We have data!!
    //   return JSON.parse(value)['rootTag'] === '#root' ? [] : JSON.parse(value);
    // } catch (error) {
    //   // Error retrieving data
    //   console.log(error);
    // }
  });
  useEffect(() => {});

  const addItem = (newTodo) => {
    if (newTodo.length === 0) {
      Alert.alert(
        'Enter a String',
        'You have entered a string with 0 characters',
        [{ text: 'Okay', style: 'default' }]
      );
    } else {
      // console.log(newTodo);
      let newTodos = [newTodo, ...todos];
      setTodo('');

      console.log(todos);
      _storeData(newTodos).then(_retrieveData);
      // setTodos(newTodos);
    }
  };

  const deleteTodo = (idx) => {
    setTodos(todos.filter((todo, id) => id !== idx));
  };

  const _storeData = async (value) => {
    AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(value))
      .then((value) => {})
      .done();
    // try {
    //   await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(value));
    // } catch (error) {
    //   // Error saving data
    //   console.log(error);
    // }
  };

  const _retrieveData = async () => {
    AsyncStorage.getItem('@MySuperStore:key')
      .then((value) => {
        if (value === null) {
          setTodos(JSON.parse(value));
        } else {
          console.log(JSON.parse(value));
          setTodos([...JSON.parse(value)]);
        }
      })
      .done();
    // try {
    //   const value = await AsyncStorage.getItem('@MySuperStore:key');
    //   if (value !== null) {
    //     // We have data!!
    //     setTodos(JSON.parse(value));
    //     console.log(value);
    //   }
    // } catch (error) {
    //   // Error retrieving data
    //   console.log(error);
    // }
  };

  function isPromise(p) {
    return p && Object.prototype.toString.call(p) === '[object Promise]';
  }

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
          {console.log(todos)}
          {console.log(todos['_U'] === 0)}
          {todos['_U'] === 0
            ? null
            : todos.map((todo, idx) => (
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
