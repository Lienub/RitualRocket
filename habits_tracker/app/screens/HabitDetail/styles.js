import { StyleSheet } from "react-native";
import { COLORS } from "../../utils/constants/colors";
export const getStyles = (mode) => {
  const colors = mode === 'dark' ? COLORS.dark : COLORS.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      flexDirection: "row",
      width: "100%",
      backgroundColor: colors.primary,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    name: {
      fontSize: 25,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
    },
    description: {
      fontSize: 20,
      color: colors.text,
      fontWeight: "200",
      textAlign: "center",
      marginTop: 20,
    },
    icon: {
      width: 100,
      height: 100,
      alignSelf: "center",
      marginTop: 20,
      backgroundColor: colors.background,
      borderRadius: 20,
    },
    repeatDays: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 20,
      fontSize: 20,
      color: colors.text,
      fontWeight: "200",
      textAlign: "center",
      marginTop: 20,
    },
    statsContainer: {
      flexDirection: "column",
      marginTop: 20,
      backgroundColor: colors.background,
      height: 400,
    },
    infoContainer: {
      backgroundColor: colors.background,
      borderEndStartRadius: 80,
      borderEndEndRadius: 80,
      padding: 10,
    },
    blockFollowing: {
      color:  colors.text,
      justifyContent: "center",
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: colors.primary,
      borderRadius: 20,
      flexDirection: "row",
      borderWidth: 2,
      borderColor: colors.secondary,
    },
    followingText: {
      color: "black",
      fontSize: 15,
      fontWeight: "400",
    },
    followingEmojy: {
      fontSize: 40,
      color: colors.text,
      fontWeight: "500",
    },
    blockStats: {
      flexDirection: "column",
      justifyContent: "space-around",
      marginTop: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
    },
    itemInfo: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 20,
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderLeftWidth: 0.2,
      borderTopWidth: 0.2,
    },
    statsTitle: {
      color: "#000",
      fontSize: 14,
      textAlign: "center",
      fontWeight: "bold",
    },
    statsValue: {
      color: "#000",
      fontSize: 14,
      width: 100,
      textAlign: "center",
      fontWeight: "400",
      marginTop: 5,
      justifyContent: "center",
    },
  })
};
