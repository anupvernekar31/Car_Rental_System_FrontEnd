import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getCarsFetch } from "../Redux/carSlice/carSlice";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const menu = require("../Assets/icons/menu.png");
const magnifying_glass = require("../Assets/icons/magnifying-glass.png");

const HomeScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const reduxcars = useSelector((state) => state.cars.cars);
  const isloading = useSelector((state) => state.cars.isLoading);

  const { isAdmin } = route.params;
  const [filteredCars, setFilteredCars] = useState(reduxcars);

  useEffect(() => {
    dispatch(getCarsFetch());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCars(reduxcars.filter((item) => item.booked !== true));
  }, [reduxcars]);

  const searchCars = (keyword) => {
    const lowercasedKeyword = keyword.toLowerCase();

    const searchResults = reduxcars.filter((car) => {
      return (
        car.booked == false &&
        (car.brand.toLowerCase().includes(lowercasedKeyword) ||
          car.type.toLowerCase().includes(lowercasedKeyword))
      );
    });

    setFilteredCars(searchResults);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <Image
            source={menu}
            resizeMode="contain"
            style={styles.menuIconStyle}
          />
          {/* <Image
            source={face}
            resizeMode="contain"
            style={styles.faceIconStyle}
          /> */}
          <View
            style={{
              backgroundColor: "white",
              width: 40,
              height: 40,
              // borderRadius: "100",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="person" size={24} color="gray" />
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>Rent a Car</Text>
          <TouchableOpacity
            onPress={() => dispatch(getCarsFetch())}
            style={{ justifyContent: "center", paddingLeft: 22 }}
          >
            {isloading ? (
              <ActivityIndicator size={26} color="white" />
            ) : (
              <Fontisto name="spinner-refresh" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchPallet}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search a Car"
              onChangeText={(text) => searchCars(text)}
            />
            <View style={styles.searchIconArea}>
              <Image
                source={magnifying_glass}
                resizeMode="contain"
                style={styles.magnifyingIconStyle}
              />
            </View>
          </View>
        </View>

        <View style={styles.typesSection}>
          <TouchableOpacity onPress={() => searchCars("")}>
            <Text style={styles.typesTextActive}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => searchCars("SUV")}>
            <Text style={styles.typesTextActive}>SUV</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => searchCars("SEDAN")}>
            <Text style={styles.typesTextActive}>SEDAN</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => searchCars("COUPE")}>
            <Text style={styles.typesTextActive}>COUPE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          {filteredCars.length > 0 && (
            <Text style={styles.headText}>Most Rented</Text>
          )}

          {!isloading ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.elementPallet}
            >
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => {
                  return (
                    <TouchableOpacity
                      onLongPress={() =>
                        isAdmin
                          ? navigation.navigate("Edit", {
                              car: car,
                              isEdit: true,
                            })
                          : null
                      }
                      style={styles.element}
                      key={car.id}
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate("Info", { car: car, isAdmin })
                      }
                    >
                      <View style={styles.infoArea}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.infoTitle}>
                            {car.brand} {car.name}
                          </Text>
                        </View>
                        <Text style={styles.infoSub}>
                          {car.type}-{car.transmission}
                        </Text>
                        <Text style={styles.infoPrice}>
                          <Text style={styles.infoAmount}>${car.price} </Text>
                          /day
                        </Text>
                      </View>
                      <View style={styles.imageArea}>
                        <Image
                          source={{ uri: car.image }}
                          resizeMode="contain"
                          style={styles.vehicleImage}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View
                  style={{
                    height: 400,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text className="text-lg font-semibold">
                    Oops...No cars available
                  </Text>
                </View>
              )}
            </ScrollView>
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator size={30} color={"black"} />
            </View>
          )}
          <View style={{ paddingBottom: 120 }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e7e7e7",
  },
  container: {
    flex: 1,
    paddingRight: 35,
    paddingLeft: 35,
  },
  headerSection: {
    // flex:1,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIconStyle: {
    width: 30,
  },
  faceIconStyle: {
    width: 40,
  },

  titleSection: {
    marginTop: 15,
    flexDirection: "row",
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
  },

  searchSection: {
    marginTop: 15,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
  searchPallet: {
    paddingLeft: 15,
    paddingVertical: 10,
    flexDirection: "row",
    borderRadius: 50,
    height: 50,
    backgroundColor: "white",
  },
  searchInput: {
    width: 235,
    height: 30,
    fontSize: 20,

    backgroundColor: "white",
  },
  searchIconArea: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  magnifyingIconStyle: {
    width: 24,
    height: 24,
    marginRight: -20,
  },

  typesSection: {
    // flex: 1,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typesTextActive: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  typesText: {
    fontSize: 15,
    marginRight: 33,
    fontWeight: "500",
    color: "#696969",
  },

  listSection: {
    marginTop: 25,
    marginBottom: 50,
    height: "85%",
  },
  headText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  elementPallet: {
    marginLeft: -15,
    // paddingLeft: 15,
    // paddingRight: 15,
    paddingHorizontal: 10,
    width: "110%",
    height: 500,
    marginBottom: 50,
  },
  element: {
    height: 100,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginBottom: 13,
  },
  infoArea: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  infoSub: {
    fontSize: 11,
    fontWeight: "600",
    color: "#696969",
  },
  infoPrice: {
    position: "absolute",
    bottom: 0,
    fontSize: 10,
    color: "#696969",
    fontWeight: "bold",
  },
  infoAmount: {
    fontSize: 12,
    color: "black",
    fontWeight: "600",
  },
  imageArea: {
    flex: 1,
  },
  vehicleImage: {
    position: "absolute",
    top: -15,
    left: -20,
    width: "140%",
    height: "140%",
  },
});
