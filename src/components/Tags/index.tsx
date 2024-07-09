// src/components/Tags.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface TagsProps {
  selectedTag: string;
  onTagSelect: (tag: string) => void;
}

const Tags: React.FC<TagsProps> = ({ selectedTag, onTagSelect }) => {
  const tags = ['All', 'Work', 'Personal', 'Fitness'];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagContainer}>
      {tags.map(tag => (
        <TouchableOpacity key={tag} onPress={() => onTagSelect(tag)}>
          <Text style={[styles.tag, selectedTag === tag && styles.selectedTag]}>#{tag}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    paddingVertical: 16,
  },
  tag: {
    marginRight: 16,
    fontSize: 16,
    color: 'gray',
  },
  selectedTag: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Tags;