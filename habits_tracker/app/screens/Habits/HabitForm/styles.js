import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#404040",
  },
  btnSelectIcon: {
    borderRadius: 10,
  },
  modalSelectIcons: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  input: {
    width: "95%",
    padding: 4,
    backgroundColor: "#303030",
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 10,
    color: "#fff",
    fontSize: 20,
  },
  modal: {
    padding: 20,
    borderRadius: 20,
    width: "100%", 
    height: "25%", 
    position: 'absolute', 
    bottom: 0,
  },
  btnSelectIcon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
  },
  viewModal: {
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    backgroundColor: "#303030",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    borderTopColor: "#fff",
    borderTopWidth: 2,
  },
  selectedIcon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 10,
    alignSelf: "center",
  },
  selectElement: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  modalColor: {
    marginTop: 100,
    width: "60%",
  },
  dateTimePicker: {
    fontSize: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  appbar: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#303030",
  },
  saveBtn: {
    fontSize: 20,
    alignSelf: "flex-end",
  },
});
