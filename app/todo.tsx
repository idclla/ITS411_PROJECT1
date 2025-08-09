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
          placeholderTextColor="#666"
          style={styles.input}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask} activeOpacity={0.7}>
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        contentContainerStyle={{ marginTop: 24, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Text style={styles.taskText}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet. Add one above!!!</Text>}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    color: '#111',
    paddingVertical: 0,
  },
  addButton: {
    paddingHorizontal: 14,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 28,
    color: '#111',
    fontWeight: '300',
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#111',
    flexShrink: 1,
  },
  deleteText: {
    fontSize: 18,
    color: '#999',
    paddingHorizontal: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 40,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
