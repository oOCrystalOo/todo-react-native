import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default function App() {
  const [ task, setTask ]   = useState( "" );
  const [ tasks, setTasks ] = useState( [] );
  const [ editIndex, setEditIndex ] = useState( -1 );

  const handleAddTask = () => {
    if ( task ) {
      if ( editIndex !== -1 ) {
        const updatedTasks = [ ...tasks ];
        updatedTasks[editIndex] = task;
        setTasks( updatedTasks );
        setEditIndex( -1 );
      } else {
        setTasks( [ ...tasks, task ] );
      }
      setTask( '' );
    }
  }

  const handleEditTask = ( index ) => {
    const taskToEdit  = tasks[index];
    setTask( taskToEdit );
    console.log( taskToEdit );
    setEditIndex( index );
  }

  const handleDeleteTask = ( index ) => {
    const updatedTasks = [ ...tasks ];
    updatedTasks.splice( index, 1 );
    setTasks( updatedTasks );
  }

  const renderItem = ( { item, index } ) => {
    return ( <View style={styles.task}>
      <Text style={styles.itemList}>{item}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={ () => handleEditTask( index) }>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleDeleteTask( index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View> )
  }

  useEffect( () => {
    console.log( tasks );
  }, [ tasks ] );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo App</Text>
      <StatusBar style="auto" />
      <TextInput style={styles.input} placeholder="Enter Task" value={task} onChangeText={ ( text ) => setTask( text )} />
      <TouchableOpacity style={styles.addButton} onPress={ handleAddTask }>
        <Text style={styles.addButtonText}>{ editIndex !== -1 ? 'Update Task' : 'Add Task' }</Text>
      </TouchableOpacity>
      {
        !tasks.length &&
          <View style={styles.addTasks}>
            <Text style={styles.addTasksText}>Add Your First Task</Text>
          </View>
      }
      <FlatList 
          data={tasks} 
          renderItem={ ( item, index ) => ( renderItem( item, index ) )} 
          keyExtractor={(item, index) => index.toString()} 
      /> 
    </View>
  );
}

const styles = StyleSheet.create( {
  container: { 
    flex: 1, 
    padding: 40, 
    marginTop: 40, 
  }, 
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
  }, 
  heading: { 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 7, 
    color: "green", 
  }, 
  input: { 
    borderWidth: 3, 
    borderColor: "#ccc", 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 10, 
    fontSize: 18, 
  }, 
  addButton: { 
    backgroundColor: "green", 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10, 
  }, 
  addButtonText: { 
    color: "white", 
    fontWeight: "bold", 
    textAlign: "center", 
    fontSize: 18, 
  }, 
  task: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 15, 
    fontSize: 18, 
  }, 
  itemList: { 
    fontSize: 19
  }, 
  taskButtons: { 
    flexDirection: "row", 
  }, 
  editButton: { 
    marginRight: 10, 
    color: "green", 
    fontWeight: "bold", 
    fontSize: 18, 
  }, 
  deleteButton: { 
    color: "red", 
    fontWeight: "bold", 
    fontSize: 18, 
  },
  addTasks: {
    
  },
  addTasksText: {
    textAlign: 'center'
  }
} );
