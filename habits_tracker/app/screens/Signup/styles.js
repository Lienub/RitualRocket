import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#404040",
  },
  background: {
    flex: 1,
    width: "90%"
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
  footerView: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "white",
  },
  footerLink: {
    color: "#F2A94A",
    fontWeight: "bold",
    fontSize: 16,
  },
  divider: {
    flexDirection: "row",
    marginVertical: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "white",
  },
  dividerText: {
    marginHorizontal: 20,
    fontSize: 18,
    color: "white"
  },
  socialMedia: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialMediaIcon: {
    width: 40,
    height: 40,
  },
});
