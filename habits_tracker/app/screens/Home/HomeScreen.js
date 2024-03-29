import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { getUserInfo } from "../../services/users";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate, setSelectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <CalendarStrip
          scrollable={true}
          scrollerPaging={true}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            borderWidth: 2,
            borderHighlightColor: "white",
            duration: 300,
          }}
          style={styles.calendarStrip}
          calendarHeaderStyle={{ color: "white", fontSize: 20 }}
          dateNumberStyle={{ color: "white" }}
          dateNameStyle={{ color: "white" }}
          highlightDateNumberStyle={{ color: "white" }}
          highlightDateNameStyle={{ color: "white" }}
          selectedDate={selectedDate}
          onDateSelected={(date) => {
            setSelectedDate(date.toISOString().split("T")[0]);
          }}
        />
        <Text style={{ color: "white" }}>Welcome, {user.username}</Text>
        <Text style={{ color: "white" }}>Selected date: {selectedDate}</Text>
      </View>
    </View>
  );
}
