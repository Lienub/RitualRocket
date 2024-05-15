import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Modal, Text } from "react-native";
import { TextInput, Button, Switch } from "react-native-paper";
import ModalSelector from "react-native-modal-selector";
import { Appbar } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { DayPicker } from "react-native-picker-weekday";
import { iconNames } from "../../../utils/constants/icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";

import Icon from "react-native-vector-icons/FontAwesome";
import { getUserInfo } from "../../../services/users";
import { createTask, createHabit } from "../../../services/habits";
import styles from "./styles";

export default function TaskFormScreen({ navigation, route }) {
  const { habitId, categoryId, habitTitle, user } = route.params;
  const [repeat, setRepeat] = useState("none");
  const [name, setName] = useState(habitTitle);
  const [description, setDescription] = useState("");
  const [iconType, setIconType] = useState("coffee");
  const [color, setColor] = useState("red");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("coffee");
  const [modalVisible, setModalVisible] = useState(false);
  const [showModalColor, setShowModalColor] = useState(false);
  const [repeatDays, setRepeatDays] = useState("");
  const [selectedDays, setSelectedDays] = useState([-1]);
  const [selectedInput, setSelectedInput] = useState(null);
  const [rappelTime, setRappelTime] = useState(new Date().toISOString().split("T")[1].split(".")[0]);
  const [showRappel, setShowRappel] = useState(false);

  const handleIconSelection = (iconName) => {
    setSelectedIcon(iconName);
    setIconType(iconName);
    setModalVisible(false);
  };
  const onColorChange = ({ hex }) => {
    setColor(hex);
    setShowModalColor(false);
  };

  const onRepeatChange = (key) => {
    setRepeat(key ?? repeat);
  };

  const handleStartDateChange = (text) => {
    setStartDate(text);
  };

  const handleEndDateChange = (text) => {
    setEndDate(text);
  };
  const handleRappelChange = (event, selectedTime) => {
    if (selectedTime !== undefined && selectedTime !== null) {
      let time = selectedTime.toISOString().split("T")[1].split(".")[0];
      if(rappelTime == time) { return;}
      setRappelTime(time);
      setShowRappel(false);
      return;
    }
    setShowRappel(true);
  };

  const handleShowCalendar = (mode) => {
    setSelectedInput(mode);
    setShowCalendar(true);
  };

  const handleDayPress = (day, mode) => {
    if (selectedInput === "startDate") {
      handleStartDateChange(day.dateString);
    } else if (selectedInput === "endDate") {
      handleEndDateChange(day.dateString);
    }
    setShowCalendar(false);
  };

  const handleSubmit = async () => {
    try {
      const taskData = {
        name,
        description,
        iconType,
        color,
        repeat,
        repeatDays: selectedDays
          .filter((dayIndex) => dayIndex !== -1)
          .map((dayIndex) => {
            const daysOfWeek = [
              "sunday",
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
            ];
            return daysOfWeek[dayIndex];
          })
          .join(","),
        repeatWeeks: "",
        repeatMonths: "",
        endDate,
        reminder,
        is_completed: isCompleted,
        habitId,
        categoryId,
        userId: user.userId,
        startDate,
        rappelTime,
      };

      if (habitTitle !== name) {
        const habitResponse = await createHabit({
          name,
          description,
          categoryId,
          userId: user.userId,
        });
        taskData.habitId = habitResponse.id;
      }

      const taskResponse = await createTask(taskData);
      navigation.navigate('TabNavigation');
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content title={"Habitude"} titleStyle={styles.title} />
        <Appbar.Content
          onPress={handleSubmit}
          color="#F1A44A"
          titleStyle={styles.saveBtn}
          title="Sauvegarder"
        />
      </Appbar.Header>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.input}
          label="Titre de l'habitude"
          value={name}
          onChangeText={(text) => setName(text)}
          textColor="#fff"
        />
        <TextInput
          style={styles.input}
          label="Description"
          value={description}
          selectTextStyle={{ color: "white" }}
          onChangeText={(text) => setDescription(text)}
          textColor="#fff"
          multiline
        />
        <View style={styles.selectElement}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.selectElement}
          >
            {selectedIcon ? (
              <Icon
                name={selectedIcon}
                size={40}
                color="white"
                style={{
                  alignSelf: "center",
                  padding: 15,
                  borderColor: "white",
                  borderWidth: 2,
                  borderRadius: 40,
                  margin: 10,
                }}
              />
            ) : (
              <Text
                style={{
                  alignSelf: "center",
                  padding: 15,
                  borderColor: "white",
                  borderWidth: 1,
                  margin: 10,
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Select Icon
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowModalColor(true)}
            style={styles.selectElement}
          >
            {color ? (
              <View
                style={{
                  backgroundColor: color,
                  alignSelf: "center",
                  borderColor: "white",
                  borderWidth: 2,
                  borderRadius: 40,
                  margin: 10,
                  width: 70,
                  height: 70,
                }}
              />
            ) : (
              <Text
                style={{
                  alignSelf: "center",
                  padding: 15,
                  borderColor: "white",
                  borderWidth: 1,
                  margin: 10,
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Select Color
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <ModalSelector
          style={{
            alignSelf: "center",
            padding: 15,
            margin: 10,
            fontWeight: "bold",
            color: "white",
          }}
          data={[
            { key: "none", label: "Répéter: 1 seule fois" },
            { key: "daily", label: "Répéter: Tous les jours" },
          ]}
          selectedKey={repeat}
          textStyle={{ color: "white" }}
          initValue="Select Repeat"
          selectTextStyle={{ color: "white", fontSize: 20 }}
          onChange={(option) => onRepeatChange(option.key)}
        />
        <View style={{ flexDirection: "column" }}>
          <View>
            <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
              Date de début
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Date de début"
              value={startDate}
              onChangeText={handleStartDateChange}
              textColor="#fff"
              onFocus={() => handleShowCalendar("startDate")}
            />
          </View>

          <View>
            <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
              Date de fin
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Date de fin"
              value={endDate}
              onChangeText={handleEndDateChange}
              textColor="#fff"
              onFocus={() => handleShowCalendar("endDate")}
            />
          </View>
          <View>
            <Text style={{ color: "white", fontSize: 20, marginLeft: 10 }}>
              Rappel
            </Text>
            <TouchableOpacity
              style={{alignSelf: "flex-start", backgroundColor: "#F1A44A", padding: 10, borderRadius: 10, margin: 10, width: 100, alignItems: "center"}}
              textColor="#fff"
              onPress={handleRappelChange}
            >
              <Text style={{ color: "white" }}>{rappelTime}</Text>
            </TouchableOpacity>
            {
              showRappel && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  onChange={handleRappelChange}
                />
              )
            }
          </View>
          {showCalendar && (
            <Calendar
              onDayPress={handleDayPress}
              minDate={new Date()}
              markingType={"period"}
              markedDates={{
                [startDate]: { startingDay: true, color: "blue" },
                [endDate]: { endingDay: true, color: "blue" },
              }}
            />
          )}
        </View>

        <View style={{ flexDirection: "column" }}>
          {repeat === "daily" ? (
            <Text style={{ color: "white", fontSize: 20 }}>
              Répéter tous les jours
            </Text>
          ) : null}
          {repeat === "daily" ? (
            <DayPicker
              weekdays={selectedDays}
              setWeekdays={setSelectedDays}
              activeColor="violet"
              textColor="white"
              inactiveColor="grey"
            />
          ) : null}
        </View>
        <Modal
          visible={showModalColor}
          animationType="slide"
          style={styles.modalColor}
          transparent
        >
          <ColorPicker
            value="red"
            onComplete={onColorChange}
            style={{
              marginTop: 100,
              width: "80%",
              alignSelf: "center",
              backgroundColor: "#303030",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Preview />
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches />
          </ColorPicker>

          <Button title="Ok" onPress={() => setShowModalColor(false)} />
        </Modal>
        <Modal
          style={styles.modal}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setShowModalColor(false);
          }}
          transparent
        >
          <View style={styles.viewModal}>
            <ScrollView style={styles.modalSelectIcons} horizontal={true}>
              {iconNames.map((iconName, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleIconSelection(iconName)}
                  style={styles.btnSelectIcon}
                >
                  <Icon
                    name={iconName}
                    size={60}
                    style={{ margin: 10 }}
                    color={"white"}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.btnSelectIcon}
            >
              <Icon
                name="close"
                size={30}
                color={"white"}
                style={{ alignSelf: "flex-end", padding: 4 }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
