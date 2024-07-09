import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface TodoScreenProps extends NativeStackScreenProps<any, 'Todo'> {}

const TodoScreen: React.FC<TodoScreenProps> = ({ route, navigation }) => {
  const { todo } = route.params || {};
  const [text, setText] = useState(todo ? todo.text : '');

  const handleSave = () => {
    // Handle saving the todo (create or update)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Todo</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Enter todo text"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#6200ea',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TodoScreen;