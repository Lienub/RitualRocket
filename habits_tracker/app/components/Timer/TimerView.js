import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Button,
} from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";

const TimerView = ({ setTimer, task, visible, setCloseModal }) => {
  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const onTimeChange = () => {
    let floorSeconds = Math.floor(seconds);
    setTimer(floorSeconds);
    setSeconds(0);
    setCloseModal(true);
  };

  const options = {
    container: {
      backgroundColor: "#566573",
      padding: 5,
      borderRadius: 5,
      width: 300,
      height: 300,
      alignItems: "center",
      borderRadius: 150,
      justifyContent: "center",
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible} // Utilisez la variable d'état visible ici
      onRequestClose={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{task.name}</Text>
          <Stopwatch
            laps
            msecs
            start={stopwatchStart}
            reset={resetStopwatch}
            options={options}
            getTime={(time) => {
              const timeArray = time.split(":");
              const hours = parseInt(timeArray[0]);
              const minutes = parseInt(timeArray[1]);
              const seconds = parseInt(timeArray[2]);
              const milliseconds = parseInt(timeArray[3]);
              const totalTimeInSeconds =
                hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
              setSeconds(totalTimeInSeconds);
            }}
          />

          <TouchableHighlight
            style={{ ...styles.button, backgroundColor: "#2196F3" }}
            onPress={() => {
              setStopwatchStart(!stopwatchStart);
              setResetStopwatch(false);
            }}
          >
            <Text style={styles.buttonText}>
              {!stopwatchStart ? "START" : "STOP"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.button, backgroundColor: "#2196F3" }}
            onPress={() => {
              setStopwatchStart(false);
              setResetStopwatch(true);
            }}
          >
            <Text style={styles.buttonText}>RESET</Text>
          </TouchableHighlight>
          <Button title="Close" onPress={onTimeChange} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 200,
  },
  modalView: {
    backgroundColor: "white",
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
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  button: {
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
});

export default TimerView;
