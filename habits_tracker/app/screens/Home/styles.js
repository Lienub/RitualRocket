import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/constants/colors";

export const getStyles = (mode) => {
  const colors = mode === 'dark' ? COLORS.dark : COLORS.light; 

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      
    },
    block: {
      height: 300,
      width: "100%",
      flex:1,
    },
    calendarStrip: {
      height: 100,
      marginTop: 20,
      width: "100%",
    },
    taskList: {
      marginTop: 20,
      marginBottom: 100,
    },
    title: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "500",
      alignSelf: "center",
      marginTop: 20,
    },
    taskItem: {
      backgroundColor: colors.background,
      borderRadius: 10,
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.text,
      
    },
    taskIcon: {
      marginRight: 4,
      flexDirection: "row",
    },
    description: {
      fontWeight: "400",
      fontSize: 20,
      marginTop: 5,
    },
    taskName: {
      fontSize: 20,
      fontWeight: "bold",
    },
    noTasks: {
      fontSize: 18,
      color: "gray",
      textAlign: "center",
      marginTop: 20,
    },
    appbar: {
      flexDirection: "row-reverse",
      width: "100%",
      backgroundColor: colors.primary,
    },
    
  });
  
} 