import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { confirmBooking } from "../Redux/Booking/bookingSlice";

const AllBookingItem = ({ item }) => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const cars = useSelector((state) => state.cars.cars);
  const getCar = (carId) => {
    return cars.find((car) => car.id === carId);
  };

  const handleBooking = (status) => {
    dispatch(confirmBooking({ status, item }));
  };

  const car = getCar(item.carId);
  if (!car) return null;

  const fromDate = new Date(item.fromDate).toDateString();
  const toDate = new Date(item.toDate).toDateString();

  return (
    <View style={styles.container}>
      <Image
        // source={require("../Assets/vehicles/v-1.png")}
        source={{ uri: car.image }}
        resizeMode="contain"
        style={styles.vehicleImage}
      />
      <View style={styles.carName}>
        <Text className="text-lg font-bold ">{car.brand} </Text>
        <Text className="text-lg font-semibold">{car.name}</Text>
      </View>
      <View style={styles.userDetails}>
        <View style={{ flexDirection: "row" }}>
          <Text className="text-sm font-semibold justify-center items-center">
            Username:{" "}
          </Text>
          <Text className="text-sm justify-center items-center">
            {item.username}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text className="text-sm font-semibold justify-center items-center">
            Email:{" "}
          </Text>
          <Text className="text-sm justify-center items-center">
            {item.email}
          </Text>
        </View>
      </View>
      <View style={styles.userDetails}>
        <View style={{ flexDirection: "row" }}>
          <Text className="text-sm font-semibold justify-center items-center">
            From:{" "}
          </Text>
          <Text className="text-sm justify-center items-center">
            {fromDate}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text className="text-sm font-semibold justify-center items-center">
            To:{" "}
          </Text>
          <Text className="text-sm justify-center items-center">{toDate}</Text>
        </View>
      </View>
      <View style={styles.userDetails}>
        <View style={{ flexDirection: "row" }}>
          <Text className="text-sm font-semibold justify-center items-center">
            Days:{" "}
          </Text>
          <Text className="text-sm justify-center items-center">
            {item.days}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text className="text-sm font-semibold justify-center items-center">
            Price:{" "}
          </Text>
          <Text className="text-sm justify-center items-center">
            {item.price}
          </Text>
        </View>
      </View>
      {item.bookCarStatus === "PENDING" && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => handleBooking("Rejected")}
            className="bg-red-400 rounded-3xl px-5 w-30 h-10 justify-center items-center"
          >
            <Text className="text-sm font-semibold">Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleBooking("Approved")}
            className="bg-green-400 rounded-3xl px-5 w-30 h-10 justify-center items-center"
          >
            <Text className="text-sm font-semibold">Approve</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.bookCarStatus !== "COMPLETED" && <TouchableOpacity
        onPress={() => handleBooking("Completed")}
        className="bg-blue-200 rounded-3xl px-5 w-30 h-10 justify-center items-center"
      >
        <Text className="text-sm font-semibold">Completed</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default AllBookingItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  element: {
    height: 300,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    // flexDirection: "row",
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
    width: "60%",
    height: "50%",
    // marginRight: 20,
    // padding: 20,
    // backgroundColor:"red"
  },
  carName: {
    flexDirection: "row",
    marginBottom: 10,
  },
  userDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
  },
  Buttons: {
    paddingVertical: 5,
    backgroundColor: "red",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    marginBottom: 20,
  },
});
