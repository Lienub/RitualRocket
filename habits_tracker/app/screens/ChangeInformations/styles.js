import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#404040",
  },
  title: {
    color: "white",
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
  background: {
    flex: 1,
  },
  title: {},
  logo: {
    height: 150,
    width: 150,
    alignSelf: "center",
    margin: 20,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#F1A44A",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  textError: {
    color: "red",
    fontSize: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 10,
  },
});
