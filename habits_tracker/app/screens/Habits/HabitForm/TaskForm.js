import React, { useState, useEffect, useMemo } from "react";
import { View, TouchableOpacity, Text, Keyboard, TouchableWithoutFeedback, ActivityIndicator, FlatList, Alert, useColorScheme } from "react-native";
import { Appbar } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { iconNames } from "../../../utils/constants/icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NiceModal, NiceTextInput, NiceTextButton, StyleContainer } from "../../../components/index"
import DropDownPicker from 'react-native-dropdown-picker';
import { DayPicker } from 'react-native-picker-weekday'
import ColorPicker, {
  Panel1,
  Swatches,
  HueSlider,
  colorKit,
} from "reanimated-color-picker";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserInfo } from "../../../services/users";
import { createTask, createHabit } from "../../../services/habits";
import { getStyles } from "./styles";
import { useSharedValue } from "react-native-reanimated";

function convertDays(arr) {
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  const res = arr.filter((dayIndex) => dayIndex !== -1)
    .map((dayIndex) => {
      return daysOfWeek[dayIndex - 1];
    })
    .join(",")

  return res;
}

export default function TaskFormScreen({ navigation, route }) {
  const { habitId, categoryId, habitTitle } = route.params;
  const [repeat, setRepeat] = useState(new Date());
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
  const [showFreqModal, setShowFreqModal] = useState(false);
  const [selectedInput, setSelectedInput] = useState(null);
  const [rappelTimeAsDate, setRappelTimeAsDate] = useState(new Date());
  const [rappelTime, setRappelTime] = useState(new Date().toISOString().split("T")[1].split(".")[0]);
  const [rappelHint, setRappelHint] = useState(false);
  const [searchIcon, setSearchIcon] = useState("");
  const [isWeekly, setIsWeekly] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [loadingIcons, setLoadingIcons] = useState(true);
  const [originalIcons, setOriginalIcons] = useState([]);
  const [timeToSpendAsDate, setTimeToSpendAsDate] = useState(new Date());
  const [timeToSpend, setTimeToSpend] = useState(new Date().toISOString().split("T")[1].split(".")[0])
  const [icons, setIcons] = useState([]);
  const scheme = useColorScheme();
  const styles = useMemo(() => getStyles(scheme));
  const [openFreq, setOpenFreq] = useState(false);
  const [valueFreq, setValueFreq] = useState(null);
  const itemsFreq = [
    { label: 'Une seule fois', value: 'none' },
    { label: 'Une fois par semaine', value: 'weekly' },
    { label: 'Une fois par mois', value: 'monthly' },
    { label: 'Autre', value: 'daily' }
  ]
  const [weekdays, setWeekdays] = useState([-1])

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

  const handleStartDateChange = (text) => {
    setStartDate(text);
  };

  const handleEndDateChange = (text) => {
    setEndDate(text);
  };
  const handleRappelChange = (event, selectedTime) => {
    const current = selectedTime || new Date();
    let time = current.toISOString().split("T")[1].split(".")[0];
    if (rappelTime == time) { return; }
    setRappelTime(time);
    setRappelTimeAsDate(selectedTime)
  };

  const handleShowCalendar = (mode) => {
    setSelectedInput(mode);
    setShowCalendar(true);
  };

  const handleTimeToSpend = (selectedTime) => {
    const current = selectedTime || new Date();
    console.log(current);
    let time = current.toISOString().split("T")[1].split(".")[0];
    if (rappelTime == time) { return; }
    setRappelTime(time);
    setRappelTimeAsDate(selectedTime)
  }

  const handleIconSearch = (text) => {
    setSearchIcon(text.toLowerCase());
    // Filter the original icons based on the search text
    const filteredIcons = originalIcons.filter((icon) =>
      icon.key.toLowerCase().includes(text.toLowerCase())
    );
    // Update the displayed icons based on the filtered result
    setIcons(filteredIcons);
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
    if (startDate === "" || endDate === "") {
      Alert.alert("Erreur", "Veuillez sélectionner une date de début et une date de fin");
      return;
    }

    try {
      const taskData = {
        name,
        description,
        iconType,
        color,
        repeat,
        repeatDays: convertDays(weekdays),
        repeatWeeks: isWeekly,
        repeatMonths: isMonthly,
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
        {/* Date selection modal */}
        <NiceModal
          visible={showCalendar}
          onRequestClose={() => {
            setShowModalColor(false);
          }}
        >
          <Calendar
            theme={styles.calendar}
            onDayPress={handleDayPress}
            minDate={new Date().toISOString().split("T")[0]}
            markingType={"period"}
            markedDates={{
              [startDate]: { startingDay: true, color: "blue" },
              [endDate]: { endingDay: true, color: "blue" },
            }}
          />
          <TouchableOpacity
            onPress={() => setShowCalendar(false)}
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
        {/* Frequency selection modal */}
        <NiceModal
          visible={showFreqModal}
          onRequestClose={() => {
            setShowFreqModal(false);
          }}
        >
          <Text >Choisissez les jours de rappel</Text>
          <DayPicker
            weekdays={weekdays}
            setWeekdays={setWeekdays}
            activeColor='orange'
            textColor='white'
            inactiveColor='grey'
            itemStyles={{ margin: 5 }}
          />
          {rappelHint && <Text style={{ color: 'red' }}>Vous devez choisir au moins un jour de la semaine !</Text>}
          <StyleContainer
            label="Heure"
          >
            <DateTimePicker
              value={rappelTimeAsDate}
              mode="time"
              onChange={handleRappelChange}
            />
          </StyleContainer>
          <View style={{ flexDirection: 'row', gap: 30 }}>
            <TouchableOpacity
              onPress={() => {
                setRappelHint(false);
                setShowFreqModal(false);
                setValueFreq(null);

                setWeekdays([-1]);
              }}
              style={styles.btnSelectIcon}
            >
              <Icon
                name="close"
                size={30}
                color={styles.btnSelectIcon.color}
                style={{ alignSelf: "flex-end", padding: 4 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (weekdays.length == 1 && weekdays[0] == -1) {
                  setRappelHint(true);
                } else {
                  setRappelHint(false);
                  return setShowFreqModal(false);
                }


              }}
              style={styles.btnSelectIcon}
            >
              <Icon
                name="done"
                size={30}
                color={styles.btnSelectIcon.color}
                style={{ alignSelf: "flex-end", padding: 4 }}
              />
            </TouchableOpacity>
          </View>
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
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {/* Start date, End date*/}
            <View>
              <StyleContainer
                label="Début"
              >
                <NiceTextButton
                  text={startDate ? startDate : "YYYY-MM-DD"}
                  onChangeText={handleStartDateChange}
                  onPressIn={() => handleShowCalendar("startDate")}
                />
              </StyleContainer>
              <StyleContainer
                label="Fin"
              >
                <NiceTextButton
                  text={endDate ? endDate : "YYYY-MM-DD"}
                  onChangeText={handleEndDateChange}
                  onPressIn={() => handleShowCalendar("endDate")}
                />

              </StyleContainer>
            </View>
            {/* Time per day */}
            <StyleContainer
              label="Temps par jour"
            >
              <DateTimePicker
                value={timeToSpendAsDate}
                mode="time"
                onChange={handleTimeToSpend}
              />
            </StyleContainer>
          </View>
          {/* Frequency selector */}
          <StyleContainer
            label="Fréquence"
          >
            <DropDownPicker
              open={openFreq}
              value={valueFreq}
              items={itemsFreq}
              setOpen={setOpenFreq}
              setValue={setValueFreq}
              onSelectItem={(item) => {
                if (item.value == 'daily') {
                  setShowFreqModal(true);
                  setIsWeekly(false);
                  setIsMonthly(false);
                } else if (item.value == 'weekly') {
                  setIsWeekly(true);
                  setIsMonthly(false);
                  setWeekdays([-1]);
                } else if (item.value == 'monthly') {
                  setIsMonthly(true);
                  setIsWeekly(false);
                  setWeekdays([-1]);
                } else {
                  setIsMonthly(false);
                  setIsWeekly(false);
                  setWeekdays([-1]);
                }
              }}
            />
            {
              convertDays(weekdays) && rappelTime &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                <Text style={styles.text}>{convertDays(weekdays)}</Text>
                <Text style={styles.text}>{rappelTime}</Text>
              </View>
            }
          </StyleContainer>
        </StyleContainer>
      </View>
    </TouchableWithoutFeedback>
  );
}