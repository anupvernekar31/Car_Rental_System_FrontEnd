import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, dispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const MyBookingsScreen = ({ route }) => {
  const cars = useSelector((state) => state.cars.cars);
  const { userId } = route.params;
  const [myBookings, setMyBookings] = useState([]);

  const getMyBookings = (userId) => {
    const url = `http://localhost:9000/api/customer/car/bookings/${userId}`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setMyBookings(res);
      });
  };

  useEffect(() => {
    getMyBookings(userId);
  }, []);

  const getCar = (carId) => {
    return cars.find((car) => car.id === carId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="items-center justify-center mb-7 flex-row">
        <Text className="text-lg font-bold">My Bookings</Text>
        <TouchableOpacity
          onPress={() => getMyBookings(userId)}
          style={{ justifyContent: "center", paddingLeft: 22 }}
        >
          {false ? (
            <ActivityIndicator size={26} color="white" />
          ) : (
            <Fontisto name="spinner-refresh" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      {/* <Button title="Click" onPress={() => getMyBookings(userId)} /> */}
      <View>
        {myBookings.map((item, index) => {
          const car = getCar(item.carId);
          return (
            <View key={index} style={styles.element}>
              <Image
                // source={require("../Assets/vehicles/v-1.png")}
                source={{ uri: car.image }}
                resizeMode="contain"
                style={styles.vehicleImage}
              />
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text className="text-sm font-bold ">{car.brand}</Text>
                <Text className="text-sm font-semibold">{car.name}</Text>
                <Text className="text-xs">
                  {new Date(item.fromDate).toDateString()}
                </Text>
              </View>

              <View
                style={{
                  paddingLeft: 20,
                  paddingVertical: 20,
                  justifyContent: "center",
                }}
              >
                {item.bookCarStatus === "PENDING" ? (
                  <Text className="text-green-700">PENDING</Text>
                ) : item.bookCarStatus === "APPROVED" ? (
                  <Text className="text-green-700">APPROVED</Text>
                ) : item.bookCarStatus === "REJECTED" ? (
                  <Text className="text-red-700">REJECTED</Text>
                ) : (
                  <Text className="text-BLUE-700">COMPLETED</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default MyBookingsScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // paddingHorizontal: 20,
  },
  element: {
    height: 100,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 13,
    marginHorizontal: 20,
  },
  imageArea: {
    flex: 1,
  },
  vehicleImage: {
    //position: "absolute",
    //top: -15,
    //left: -20,
    width: "40%",
    height: "120%",
    //marginRight: 20,
    // backgroundColor:"red"
  },
});
