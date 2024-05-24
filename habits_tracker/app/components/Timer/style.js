import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/constants/colors";
export const getStyles = (mode) => {
  const colors = mode === 'dark' ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
      centeredView: {
        marginTop: 200,
      },
      modalView: {
        backgroundColor: colors.tertiary,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "90%",
        alignSelf: "center",
        justifySelf: "center"
      },
      title: {
        color: colors.text,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        padding: 20,
      },
      buttonContainer: {
        flexDirection: "row",
        gap: 50,
        marginBottom: 20
      },
      button: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
      },
      buttonText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      highlight: {
        color: colors.primary,

      }
  });
}

export const getOptions = (mode) => {
    const colors = mode === 'dark' ? COLORS.dark : COLORS.light;
  
    return {
        container: {
            backgroundColor: colors.primary,
            padding: 5,
            borderRadius: 5,
            width: 300,
            height: 100,
            alignItems: "center",
            borderRadius: 150,
            justifyContent: "center",
            marginBottom: 30
          },
          text: {
            fontSize: 39,
            color: "#fff",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
          },
    };
  }