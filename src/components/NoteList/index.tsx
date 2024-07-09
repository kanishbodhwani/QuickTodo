// src/components/NoteList.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import NoteCard from '../NoteCard';

interface Note {
  id: string;
  text: string;
}

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {notes.map(note => (
        <NoteCard key={note.id} note={note} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default NoteList;