import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
      <ScrollView>
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
              placeholder="Add a new todo here..."
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
                    textDecorationLine: todo.completed
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  {todo.text}
                </Text>
              </TouchableOpacity>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => editTodo(index)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(index)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default TodoApp;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#18180E',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#CEBCB8',
  },
  todoText: {
    fontSize: 18,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
  },
  editText: {
    marginLeft: 10,
    color: '#007aff',
    fontWeight: 'bold',
    color: '#7B89AE',
  },
  deleteText: {
    marginLeft: 10,
    color: '#007aff',
    fontWeight: 'bold',
    color: '#b9080e',
  },
});
