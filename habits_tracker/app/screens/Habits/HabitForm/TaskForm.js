import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Modal, Text } from "react-native";
import { TextInput, Button, Switch } from "react-native-paper";
import ModalSelector from "react-native-modal-selector";
import { Appbar } from "react-native-paper";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { DayPicker } from "react-native-picker-weekday";

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
import { on } from "events";

export default function TaskFormScreen({ navigation, route }) {
  const iconNames = [
    "coffee",
    "star",
    "heart",
    "rocket",
    "user",
    "bell",
    "camera",
    "globe",
    "music",
    "home",
  ];

  const { habitId, categoryId, habitTitle } = route.params;
  const [repeat, setRepeat] = useState("none");
  const [user, setUser] = useState({});
  const [name, setName] = useState(habitTitle);
  const [description, setDescription] = useState("");
  const [iconType, setIconType] = useState("");
  const [color, setColor] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reminder, setReminder] = useState(false);
  const [sound, setSound] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showModalColor, setShowModalColor] = useState(false);
  const [repeatDays, setRepeatDays] = useState("");
  const [selectedDays, setSelectedDays] = useState([-1]);

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

  const onChangeEndDate = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {}
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async () => {
    try {
      const taskData = {
        name,
        description,
        iconType,
        color,
        repeat,
        repeatDays: selectedDays
        .filter(dayIndex => dayIndex !== -1)
        .map(dayIndex => {
          const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
          return daysOfWeek[dayIndex];
        })
        .join(","),
        repeatWeeks: "",
        repeatMonths: "",
        endDate,
        reminder,
        sound,
        is_completed: isCompleted,
        habitId,
        categoryId,
        userId: user.userId,
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
      navigation.goBack();
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
          label="Name"
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
                  padding: 15,
                  borderColor: "white",
                  borderWidth: 2,
                  borderRadius: 40,
                  margin: 10,
                  width: 60,
                  height: 60,
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
          <ModalSelector
            style={{
              alignSelf: "center",
              padding: 15,
              margin: 10,
              fontWeight: "bold",
              color: "white",
            }}
            data={[
              { key: "none", label: "None" },
              { key: "daily", label: "Daily" },
              { key: "weekly", label: "Weekly" },
              { key: "monthly", label: "Monthly" },
            ]}
            selectedKey={repeat}
            textStyle={{ color: "white" }}
            initValue="Select Repeat"
            selectTextStyle={{ color: "white", fontSize: 20 }}
            onChange={(option) => onRepeatChange(option.key)}
          />
          <RNDateTimePicker
            style={styles.dateTimePicker}
            value={endDate ? new Date(endDate) : new Date()}
            mode="date"
            display="compact"
            accentColor="white"
            textColor="white"
            dateFormat="YYYY-MM-DD"
            onChange={(event, date) => onChangeEndDate(date)}
          />
        </View>
        <DayPicker
          weekdays={selectedDays}
          setWeekdays={setSelectedDays}
          activeColor="violet"
          textColor="white"
          inactiveColor="grey"
        />

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
