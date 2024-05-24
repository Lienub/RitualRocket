import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Button,
} from "react-native";
import { Stopwatch } from "react-native-stopwatch-timer";
import { useTheme } from "../Theme";
import { getOptions, getStyles } from "./style";
const TimerView = ({ setTimer, task, visible, setCloseModal }) => {
  const [stopwatchStart, setStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const { theme } = useTheme();
  const styles = useMemo(() => getStyles(theme));
  const options = getOptions(theme);

  const onTimeChange = () => {
    setSeconds(0);
    setCloseModal(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
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
              let seconds = time.split(":");
              let totalSeconds = parseInt(seconds[1]) * 60 + parseInt(seconds[2]);
              setTimer(totalSeconds);
            }}
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={{ ...styles.button }}
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
              style={{ ...styles.button }}
              onPress={() => {
                setStopwatchStart(false);
                setResetStopwatch(true);
              }}
            >
              <Text style={styles.buttonText}>RESET</Text>
            </TouchableHighlight>
          </View>
          <Button style={styles.highlight} title="Close" onPress={onTimeChange} />
        </View>
      </View >
    </Modal >
  );
};

export default TimerView;
