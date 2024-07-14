import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import { AntDesign } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { createUser } from '../../services/replicache';

const UsernameScreen = () => {
  const [name, setName] = useState<string>('');

  const [Manrope] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  const handleSubmit = async () => {
    if (!name) return;
  
    try {
      const response = await fetch('http://localhost:8000/api/next-mutation-id');
      if (!response.ok) {
        throw new Error('Failed to fetch next mutation ID');
      }
      const { mutationID } = await response.json();
  
      const id = uuid.v4(); // Generate a unique ID for the user
      const clientID = uuid.v4(); // Generate a unique client ID
  
      await createUser(id.toString(), name, clientID.toString(), mutationID);
  
      // Navigate user to the Home screen
      // Example: navigation logic
      // navigation.navigate('Home');
  
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  if(!Manrope) return null;
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Your Name...👀"
        numberOfLines={2}
        multiline={true}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={{...styles.submit, backgroundColor: name ? '#39A3E8' :'#6ABDF1'}}>
        <AntDesign name="check" size={24} color="#eee" />
      </TouchableOpacity>
    </View>
  );
};

export default UsernameScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 0,
    borderRadius: 10,
    height: 100,
    textAlignVertical: 'top',
    textAlign: 'center',
    fontFamily: 'Manrope_500Medium',
    fontSize: 30,
    marginTop: 10,
    color: '#686868',
  },
  submit: {
    borderRadius: 50,
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
