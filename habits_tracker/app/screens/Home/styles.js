import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#404040",
    
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
  },
  taskItem: {
    backgroundColor: "#363636",
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    
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
    backgroundColor: "#303030",
  },
});
