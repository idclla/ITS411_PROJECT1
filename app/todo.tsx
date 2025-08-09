import React, { useEffect, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ToDoScreen() {
  const [userInput, setUserInput] = useState('');
  type Task = { id: string; title: string };
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {}, [userInput]);

  const addTask = () => {
    const trimmed = userInput.trim();
    if (!trimmed) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), title: trimmed }]);
    setUserInput('');
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.inputRow}>
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Enter a task..."
          placeholderTextColor="#888"
          style={styles.input}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask} activeOpacity={0.6}>
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginTop: 32, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Text style={styles.taskText}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.deleteText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet. Add one above!!!</Text>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 17,
    color: '#222',
    paddingVertical: 0,
  },
  addButton: {
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#555',
    fontWeight: '400',
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 14,
  },
  taskText: {
    fontSize: 17,
    color: '#222',
    flexShrink: 1,
  },
  deleteText: {
    fontSize: 18,
    color: '#FF0000',
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#bbb',
    marginTop: 48,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
