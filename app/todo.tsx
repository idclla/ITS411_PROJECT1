import React, { useEffect, useState } from 'react';
import {
  ScrollView,
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
    console.log('Simple todo loaded');
  }, []);

  const addTask = () => {
    if (!userInput.trim()) {
      console.log('Please enter a task');
      return;
    }
    
    // Check if task already exists
    const taskExists = tasks.some(task => 
      task.title.toLowerCase() === userInput.toLowerCase().trim()
    );
    
    if (taskExists) {
      console.log('Task already exists!');
      return;
    }
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: userInput.trim(),
      completed: false,
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    setUserInput('');
  };

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const removeTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Todo List</Text>
        <View style={styles.taskCount}>
          <Text style={styles.countText}>{tasks.length}</Text>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Add a new task..."
          style={styles.textInput}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[
            styles.addButton,
            !userInput.trim() && styles.addButtonDisabled
          ]}
          onPress={addTask}
          disabled={!userInput.trim()}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Tasks List */}
      <View style={styles.tasksContainer}>
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
          </View>
        ) : (
          <ScrollView style={styles.tasksList}>
            {tasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    task.completed && styles.checkboxCompleted
                  ]}
                  onPress={() => toggleTask(task.id)}
                >
                  {task.completed && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                
                <Text style={[
                  styles.taskText,
                  task.completed && styles.taskTextCompleted
                ]}>
                  {task.title}
                </Text>
                
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeTask(task.id)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  taskCount: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  countText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  textInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  tasksContainer: {
    flex: 1,
  },
  tasksList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888888',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#888888',
    textAlign: 'center',
  },
});