import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

  const addTodo = () => {
    if (editMode) {
      const newTodos = [...todos];
      newTodos[editIndex].text = editedTodo;
      setTodos(newTodos);
      setEditMode(false);
      setEditIndex(null);
      setEditedTodo('');
    } else {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const editTodo = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setEditedTodo(todos[index].text);
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        {editMode ? (
          <TextInput
            style={styles.input}
            value={editedTodo}
            onChangeText={(text) => setEditedTodo(text)}
            placeholder="Edit the todo"
          />
        ) : (
          <TextInput
            style={styles.input}
            value={newTodo}
            onChangeText={(text) => setNewTodo(text)}
            placeholder="Add a new todo"
          />
        )}
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>
            {editMode ? 'Save Changes' : 'Add Todo'}
          </Text>
        </TouchableOpacity>
        {todos.map((todo, index) => (
          <View key={index} style={styles.todoContainer}>
            <TouchableOpacity onPress={() => markTodo(index)}>
              <Text
                style={{
                  ...styles.todoText,
                  textDecorationLine: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </Text>
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => editTodo(index)}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

export default TodoApp;

const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  todoText: {
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
  },
  actionText: {
    marginLeft: 10,
    color: 'blue',
  },
});
