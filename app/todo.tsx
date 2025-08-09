import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Task interface
interface Task {
  id: string; 
  title: string;
  completed?: boolean;
}

export default function ToDoScreen() {
  const [userInput, setUserInput] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    console.log('Effective todo loaded');
  }, []);

  const addTask = () => {
    if (!userInput.trim()) return;
    
    const taskExists = tasks.some(task => 
      task.title.toLowerCase() === userInput.toLowerCase().trim()
    );
    
    if (taskExists) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: userInput.trim(),
      completed: false,
    };
    
    setTasks(prev => [...prev, newTask]);
    setUserInput('');
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskRow}>
      <TouchableOpacity
        style={[styles.check, item.completed && styles.checked]}
        onPress={() => toggleTask(item.id)}
      >
        {item.completed && <Text style={styles.checkText}>✓</Text>}
      </TouchableOpacity>
      
      <Text style={[styles.taskLabel, item.completed && styles.doneTask]}>
        {item.title}
      </Text>
      
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteIcon}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Quick Stats */}
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          {pendingTasks.length} pending
          {completedTasks.length > 0 && ` • ${completedTasks.length} done`}
        </Text>
      </View>

      {/* Add Task - Priority Focus */}
      <View style={styles.inputRow}>
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Add task..."
          style={styles.input}
          onSubmitEditing={addTask}
          returnKeyType="done"
          autoFocus={tasks.length === 0}
        />
        <TouchableOpacity
          style={[styles.addBtn, !userInput.trim() && styles.disabled]}
          onPress={addTask}
          disabled={!userInput.trim()}
        >
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      </View>

      {/* Task List - Optimized */}
      {tasks.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Start by adding a task above</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      )}

      {/* Quick Actions */}
      {completedTasks.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={clearCompleted}>
          <Text style={styles.clearText}>Clear {completedTasks.length} completed</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 50,
  },
  stats: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  statsText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    color: '#1e293b',
  },
  addBtn: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#cbd5e1',
  },
  addText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  list: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  checkText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskLabel: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 20,
  },
  doneTask: {
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteIcon: {
    fontSize: 20,
    color: '#ef4444',
    fontWeight: '300',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  clearBtn: {
    backgroundColor: '#fef2f2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#fee2e2',
  },
  clearText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});