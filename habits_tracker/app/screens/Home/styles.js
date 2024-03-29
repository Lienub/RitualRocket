import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#404040",
    paddingHorizontal: 20,
  },
  block: {
    height: 300,
    width: "100%",
    flex:1,
  },
  calendarStrip: {
    height: 100,
    marginTop: 80,
    width: "100%",
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 16,
  },
  noTasks: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});
