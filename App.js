import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import TodoApp from './components/Todo';

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TodoApp />
      </KeyboardAvoidingView>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#18180E',
  },
});
