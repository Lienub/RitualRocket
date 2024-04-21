import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#404040",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: 20,
  },
  appbar: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#303030",
  },
  button: {
    backgroundColor: "#303030",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignSelf: "center",
  },
  buttonRemove: {
    backgroundColor: "#EC2C35",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
