import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Appbar } from "react-native-paper";
import { getCategories } from "../../../services/habits";

export default function CategoryListScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((categories) => setCategories(categories))
      .catch((error) => console.error("Error loading categories:", error));
  }
  , []);
  
  const navigateToHabitsList = (categoryId, title) => {
    navigation.navigate("HabitsList", { categoryId, categoryTitle: title });
  };

  return (
    <View style={styles.container}>
          <Appbar.Header style={styles.appbar} >
          <Appbar.Action
          icon={() => <Ionicons name="close" size={30} color="#fff" />} 
          onPress={() => navigation.navigate("Home")}
        />
        <Appbar.Content title="Choisis une nouvelle" titleStyle={styles.title} />
      </Appbar.Header>

      <FlatList
      style={styles.categoryList}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToHabitsList(item.id, item.name)} style={styles.categoryBlock}>
            <Text style={styles.categoryTitle}>{item.name}</Text>
            <Text style={styles.categoryDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
