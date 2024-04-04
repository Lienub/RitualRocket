import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, TouchableOpacity, Modal, Text, Animated, Keyboard, TouchableWithoutFeedback, ActivityIndicator, FlatList, Alert, useColorScheme } from "react-native";
import { TextInput, Button, Switch } from "react-native-paper";
import ModalSelector from "react-native-modal-selector";
import { Appbar } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { DayPicker } from "react-native-picker-weekday";
import { iconNames } from "../../../utils/constants/icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NiceModal, NiceTextInput, StyleContainer } from "../../../components/index"
import { COLORS } from "../../../utils/constants/colors";

import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
  useColorPickerContext,
  colorKit,
} from "reanimated-color-picker";

import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserInfo } from "../../../services/users";
import { createTask, createHabit } from "../../../services/habits";
import { getStyles } from "./styles";
import { on } from "events";
import { SafeAreaView } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function TaskFormScreen({ navigation, route }) {
  const { habitId, categoryId, habitTitle } = route.params;
  const [repeat, setRepeat] = useState("none");
  const [user, setUser] = useState({});
  const [name, setName] = useState(habitTitle);
  const [description, setDescription] = useState("");
  const [iconType, setIconType] = useState("coffee");
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
  const [searchIcon, setSearchIcon] = useState("");
  const [loadingIcons, setLoadingIcons] = useState(true);
  const [originalIcons, setOriginalIcons] = useState([]);
  const [icons, setIcons] = useState([]);
  const scheme = useColorScheme();
  const styles = useMemo(() => getStyles(scheme));

  const customSwatches = new Array(6).fill('#fff').map(() => colorKit.randomRgbColor().hex());
  const selectedColor = useSharedValue(customSwatches[0]);
  const [color, setColor] = useState(customSwatches[0]);

  const onColorSelect = (color) => {
    'worklet';
    selectedColor.value = color.hex;
    
  };


  // Generate icon components on component mount
  useEffect(() => {
    const initIcons = async () => {
      try {
        const iconComponents = await generateIconComponents(iconNames);
        setIcons(iconComponents);
        setOriginalIcons(iconComponents); // Save the original list of icons
      } catch (error) {
        console.error("Error generating icons:", error);
      } finally {
        setLoadingIcons(false);
      }
    };

    initIcons();
  }, []);

  // Generate icon components
  const generateIconComponents = async (iconNames) => {
    /* 
      Map the icon names to an object with a key and the icon component
      The key is the icon name and the icon component is a TouchableOpacity
      that displays the icon and calls the handleIconSelection function
      when pressed

      We use a key to identify the icon component in the FlatList, so we can
      optimize the rendering of the list
    */
    return iconNames.map((iconName) => ({
      key: iconName,
      iconComponent: (
        <TouchableOpacity
          key={iconName}
          onPress={() => handleIconSelection(iconName)}
          onLongPress={() => Alert.alert("Nom de l'icone", iconName)}
          style={styles.btnSelectIcon}
        >
          <Icon
            name={iconName}
            size={60}
            style={{ margin: 10 }}
            color={styles.iconButton.borderColor}
          />
        </TouchableOpacity>
      )
    }));
  };

  const handleIconSelection = (iconName) => {
    setSelectedIcon(iconName);
    setIconType(iconName);
    setModalVisible(false);
  };
  const onColorChange = () => {
    setColor(selectedColor.value);
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
      if (rappelTime == time) { return; }
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

  const handleIconSearch = (text) => {
    setSearchIcon(text.toLowerCase());
    // Filter the original icons based on the search text
    const filteredIcons = originalIcons.filter((icon) =>
      icon.key.toLowerCase().includes(text.toLowerCase())
    );
    // Update the displayed icons based on the filtered result
    setIcons(filteredIcons);
  };

  const resetIconList = () => {
    setSearchIcon("");
    setIcons(originalIcons);
  };

  const handleDayPress = (day, mode) => {
    if (selectedInput === "startDate") {
      handleStartDateChange(day.dateString);
    } else if (selectedInput === "endDate") {
      handleEndDateChange(day.dateString);
    }
    setShowCalendar(false);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async () => {
    try {
      console.log("rappelTime", rappelTime);
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

      console.log("taskData", taskData);

      const taskResponse = await createTask(taskData);
      navigation.goBack();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (loadingIcons) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#F1A44A" />
      </View>
    );
  }

  return (
    /* 
      TouchableWithoutFeedback is used to dismiss the keyboard 
      when the user taps outside of the input fields or modals
    */

    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      setShowCalendar(false);
      setShowModalColor(false);
      setModalVisible(false);
    }}>
      {/* The main container */}
      <View style={styles.container}>
        {/* Modals Section */}
        {/* Icon selection modal */}
        <NiceModal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Text style={styles.modalTitle}>Sélectionnez une icône</Text>
          {/* Search bar */}
          <NiceTextInput
            label="Rechercher"
            onChangeText={(text) => handleIconSearch(text)}
          />
          {/* List for the icons */}
          <FlatList
            style={styles.modalSelectIcons}
            data={icons}
            renderItem={({ item }) => item.iconComponent}
            keyExtractor={(item) => item.key}
            horizontal={true}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.btnSelectIcon}
          >
            <Icon
              name="close"
              size={30}
              color={styles.btnSelectIcon.color}
              style={{ alignSelf: "flex-end", padding: 4 }}
            />
          </TouchableOpacity>
        </NiceModal>
        {/* Color selection modal */}
        <NiceModal
          visible={showModalColor}
          onRequestClose={() => {
            setShowModalColor(false);
          }}
        >
          <ColorPicker
            style={styles.colorPicker}
            value={selectedColor.value}
            onChange={onColorSelect}
          >
            <Panel1 />
            <HueSlider />
            <Swatches />
          </ColorPicker>
          <TouchableOpacity
            onPress={() => onColorChange()}
            style={styles.btnSelectIcon}
          >
            <Icon
              name="done"
              size={30}
              color={styles.btnSelectIcon.color}
              style={{ alignSelf: "flex-end", padding: 4 }}
            />
          </TouchableOpacity>
        </NiceModal>
        {/* Appbar */}
        <Appbar.Header style={styles.appbar}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color={styles.appbarBackaction.color} />
          <Appbar.Content title={"Habitude"} titleStyle={styles.appbarTitle} />
          <Appbar.Content
            onPress={handleSubmit}
            color="#fff"
            titleStyle={styles.saveBtn}
            title="Sauvegarder"
          />
        </Appbar.Header>
        <Text style={styles.title}>Créez une nouvelle habitude !</Text>
        {/* Title and description inputs */}
        <StyleContainer
          label="Quelques informations concernant cette habitude"
        >
          <NiceTextInput
            label="Titre de l'habitude"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <NiceTextInput
            label="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline
          />
        </StyleContainer>
        {/* Icon and color selection */}
        <StyleContainer
          label="Personnalisez l'icône et la couleur de votre habitude"
          row
        >
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.selectElement}
          >
            {selectedIcon ? (
              <Icon
                name={selectedIcon}
                size={40}
                color={styles.iconButton.borderColor}
                style={styles.iconButton}
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
        </StyleContainer>
        {/* Date, Time & stuff */}
        <StyleContainer
          label="Gestion du temps"
        >
        </StyleContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}

{ /*
 <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View 
      onPress={() => Keyboard.dismiss()}
      style={ styles.container }
    >
      {showCalendar && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          /> 
        )}
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
        {showCalendar && (
          <View
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "row",
            zIndex: 2,
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 20,
          }}
        >
          <TouchableOpacity onPress={() => setShowCalendar(false)} style={{ position: "absolute", top: "20%", right: 10 }}>
            <Icon name="close" size={30} color={"white"} />
          </TouchableOpacity>
          <View style={{ width: "80%", height: 300 }}>
            <Calendar
              style={ styles.calendar }
              onDayPress={handleDayPress}
              minDate={new Date().toISOString().split("T")[0]}
              markingType={"period"}
              markedDates={{
                [startDate]: { startingDay: true, color: "blue" },
                [endDate]: { endingDay: true, color: "blue" },
              }}
            />
          </View>
        </View>
        )}

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
              inputMode="none"
              pointerEvents="box-only"
              onPressIn={() => handleShowCalendar("startDate")}
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
              inputMode="none"
              pointerEvents="box-only"
              onPressIn={() => handleShowCalendar("endDate")}
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
    </View>
    </TouchableWithoutFeedback>
*/}