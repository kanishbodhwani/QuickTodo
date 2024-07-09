import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import Tags from '../../components/Tags';
import NoteList from '../../components/NoteList';

interface Note {
  id: string;
  text: string;
  category: string;
}

const HomeScreen: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const notes: Note[] = [
    { id: '1', text: 'Meeting with team', category: 'Work' },
    { id: '2', text: 'Buy groceries', category: 'Personal' },
    { id: '3', text: 'Gym session', category: 'Fitness' },
    // Add more notes as needed
  ];

  const filteredNotes = notes.filter(note => selectedTag === 'All' || note.category === selectedTag);

  const navigation = useNavigation();

  const handleAddNote = () => {
    // navigate to todo
  };

  return (
    <ScrollView style={styles.container}>
      <Header userName="John Doe" />
      <Tags selectedTag={selectedTag} onTagSelect={setSelectedTag} />
      <View style={styles.noteSection}>
        <Text style={styles.sectionTitle}>#{selectedTag.toLowerCase()}</Text>
        <View style={styles.divider} />
        <NoteList notes={filteredNotes} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  noteSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#6200ea',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;