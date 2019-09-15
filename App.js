import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const addInputHandler = (enteredText) => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { uid: Math.random().toString(), value: enteredText }
    ]);
    setIsAddMode(false); 
  };

  const deleteHandler = (itemId) => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.uid!=itemId);
    })
  }

  const cancelGoalHandler = () => {
      setIsAddMode(false);
  }
  return (
    <View style={styles.screen}>
      <GoalInput visible={isAddMode} onAddGoal={addInputHandler} onCancel={cancelGoalHandler} />
      <Button title="Add Goal" onPress={() => setIsAddMode(true)} />
      <View>
        <FlatList
          keyExtractor={(item, index) => item.uid}
          data={courseGoals}
          renderItem={itemData => (
            <GoalItem itemId={itemData.item.uid} title={itemData.item.value} deleteItem={deleteHandler} />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
