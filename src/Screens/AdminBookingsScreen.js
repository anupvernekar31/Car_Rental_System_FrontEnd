import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import AllBookingItem from "../components/AllBookingItem";
import { useSelector, useDispatch } from "react-redux";
import { getBookings } from "../Redux/Booking/bookingSlice";
import { Fontisto } from '@expo/vector-icons';

const AdminBookingsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const isLoading = useSelector((state)=>state.bookings.isLoading);
  const { userId } = route.params;

  const [allBookings, setAllBookings] = useState([]);

  const getAdminBookings = () => {
    dispatch(getBookings());
  };

  useEffect(() => {
    getAdminBookings();
  }, []);

  useEffect(() => {
    setAllBookings(bookings);
  }, [bookings]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
          flexDirection: "row",
        }}
      >
        <Text className="text-lg font-bold">BOOKINGS</Text>
        <TouchableOpacity
          onPress={() => dispatch(getBookings())}
          style={{ justifyContent: "center", paddingLeft: 22 }}
        >
          {isLoading ? (
            <ActivityIndicator size={26} color="black" />
          ) : (
            <Fontisto name="spinner-refresh" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 1900 }}>
        {allBookings.map((item, index) => {
          return <AllBookingItem key={index} item={item} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminBookingsScreen;

const styles = StyleSheet.create({});
