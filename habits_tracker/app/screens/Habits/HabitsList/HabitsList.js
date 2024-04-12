import React, { useState, useEffect, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, useColorScheme } from "react-native";
import { Appbar } from "react-native-paper";
import { getStyles } from "./styles";
import { getHabitsByCategory } from "../../../services/habits";
import { StyleContainer, NiceTextButton } from "../../../components";


export default function HabitsListScreen({ navigation, route }) {
  const { categoryId, categoryTitle } = route.params;
  const [habits, setHabits] = useState([]);
  const scheme = useColorScheme();
  const styles = useMemo(() => getStyles(scheme));

  useEffect(() => {
    getHabitsByCategory(categoryId)
      .then((habits) => setHabits(habits))
      .catch((error) => console.error("Error loading habits:", error));
  }, [categoryId]);
  
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar} >
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title={categoryTitle} titleStyle={styles.title} />
      </Appbar.Header>
      <StyleContainer
        label="Tu ne trouves pas ton bonheur ?"
      >
        <NiceTextButton
          text="Réalise ta propre habitude !"
          onPress={() => navigation.navigate("TaskForm",{ habitId: null, categoryId: null, habitTitle: null})}
        />
      </StyleContainer>
      <FlatList
        style={styles.habitList}
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate("TaskForm", { habitId: item.id, categoryId, habitTitle: item.name})}
            style={styles.habitBlock}
          >
            <Text style={styles.habitName}>{item.name}</Text>
            <Text style={styles.habitDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
