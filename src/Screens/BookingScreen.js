import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { getCarsFetch } from "../Redux/carSlice/carSlice";
import { useSelector, useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";

const BookingScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [whichDate, setWhichDate] = useState(null);

  const userId = route.params.userId;
  const carId = route.params.car.id;

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleBook = () => {
    const bookingDates = {
      fromDate,
      toDate,
      userId,
      carId,
    };
    const url = "http://localhost:9000/api/customer/car/book";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(bookingDates),
    })
      .then((res) => res)
      .then((res) => {
        if (res.status === 400)
          Alert.alert("Oops!!!", "Car already booked by someone else!!");
        dispatch(getCarsFetch());
        navigation.goBack();
      });
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        if (whichDate === "from") setFromDate(currentDate);
        else setToDate(currentDate);
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = (whichDate) => {
    if (whichDate === "from") {
      setFromDate(date);
    } else {
      setToDate(date);
    }

    toggleDatePicker();
  };

  const fromDatePickerPressed = () => {
    toggleDatePicker();
    setWhichDate("from");
  };
  const toDatePickerPressed = () => {
    toggleDatePicker();
    setWhichDate("to");
  };

  return (
    <View style={styles.container}>
      <View className="bg-black/5 p-5 rounded-2xl w-full flex-row">
        <TextInput
          className="text-sm font-bold justify-center items-center"
          style={{ flex: 1 }}
          placeholder="From Date"
          placeholderTextColor={"gray"}
          onChangeText={setFromDate}
          value={fromDate?.toDateString()}
          editable={false}
          // onPressIn={toggleDatePicker}
        />
        {!showPicker && (
          <Pressable
            style={{ justifyContent: "flex-end" }}
            onPress={fromDatePickerPressed}
          >
            <Entypo name="calendar" size={24} color="gray" />
          </Pressable>
        )}
      </View>

      <View className="bg-black/5 p-5 rounded-2xl w-full flex-row">
        <TextInput
          className="text-sm font-bold justify-center items-center"
          style={{ flex: 1 }}
          placeholder="To Date"
          placeholderTextColor={"gray"}
          onChangeText={setToDate}
          value={toDate?.toDateString()}
          editable={false}
          // onPressIn={toggleDatePicker}
        />
        {!showPicker && (
          <Pressable disabled={!fromDate} onPress={toDatePickerPressed}>
            <Entypo name="calendar" size={24} color="gray" />
          </Pressable>
        )}
      </View>

      {showPicker && (
        <DateTimePicker
          mode="date"
          themeVariant="light"
          display="inline"
          value={date}
          onChange={onChange}
          minimumDate={fromDate ? new Date(fromDate) : new Date()}
        />
      )}
      {showPicker && Platform.OS === "ios" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: 20,
          }}
        >
          <TouchableOpacity
            className="rounded-xl p-2 bg-gray-300 w-20 justify-center items-center"
            onPress={toggleDatePicker}
          >
            <Text className="text-sm font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl p-2 bg-blue-300 w-20 justify-center items-center"
            onPress={() => confirmIOSDate(whichDate)}
          >
            <Text className="text-sm font-semibold">Set</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        disabled={!(fromDate && toDate)}
        onPress={handleBook}
        style={[
          styles.rentButton,
          !(fromDate && toDate) && { backgroundColor: "gray" },
        ]}
      >
        <Text style={styles.rentButtonText}>BOOK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  rentButtonText: {
    color: "white",
    fontWeight: "500",
  },
  rentButton: {
    marginTop: 50,
    height: 40,
    // padding: 10,
    alignSelf: "center",
    width: 250,
    backgroundColor: "black",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
