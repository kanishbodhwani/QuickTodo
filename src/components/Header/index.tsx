import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.row}>
        <Ionicons name="person-circle" size={32} color="black" />
        <Text style={styles.userName}>{userName}</Text>
        <TextInput style={styles.searchInput} placeholder="Search..." />
        <Ionicons name="notifications" size={24} color="black" />
      </View>
      <View style={styles.row}>
        <Text style={styles.heading}>Your Notes</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6200ea',
    padding: 8,
    borderRadius: 50,
  },
});

export default Header;