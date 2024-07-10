import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { storeData } from '../../utils/asyncStorage';
import { navigate } from '../../navigation/NavigationService';

const StartScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkUser = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        // navigation.navigate('Home');
      }
    };
    checkUser();
  }, [navigation]);

  const handleStart = async () => {
    if (username) {
      const userId = uuid.v4();
      await storeData('username', username);
      await storeData('userId', userId);
      navigate('Tabs');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
      />
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default StartScreen;