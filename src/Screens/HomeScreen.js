import {
  ActivityIndicator,
  Button,
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
import { AntDesign } from "@expo/vector-icons";

const menu = require("../Assets/icons/menu.png");
const face = require("../Assets/face.png");
const magnifying_glass = require("../Assets/icons/magnifying-glass.png");

const image_v_1 = require("../Assets/vehicles/v-1.png");
const image_v_2 = require("../Assets/vehicles/v-2.png");
const image_v_3 = require("../Assets/vehicles/v-3.png");
const image_v_4 = require("../Assets/vehicles/v-4.png");
const image_v_5 = require("../Assets/vehicles/v-5.png");

import data from "../dataset/vehicles.json";
import { useNavigation } from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const HomeScreen = ({ route }) => {
  console.log();
  const { isAdmin } = route.params;
  const { refreshedCars } = route.params;
  const navigation = useNavigation();
  const [cars, setCars] = useState(refreshedCars ? refreshedCars : []);
  const [filteredCars, setFilteredCars] = useState(cars);
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    const getAllCars = () => {
      setLoading(true);
      const url = "http://192.168.1.3:9000/api/admin/cars";
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setCars(json);
          setFilteredCars(json);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getAllCars();
  }, [refreshedCars]);

  const getImage = (id) => {
    if (id == 1) return image_v_1;
    if (id == 2) return image_v_2;
    if (id == 3) return image_v_3;
    if (id == 4) return image_v_4;
    if (id == 5) return image_v_5;
  };

  const searchCars = (keyword) => {
    const lowercasedKeyword = keyword.toLowerCase();

    const results = cars.filter((car) => {
      return (
        car.brand.toLowerCase().includes(lowercasedKeyword) ||
        car.type.toLowerCase().includes(lowercasedKeyword)
      );
    });

    setFilteredCars(results);
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
          <Image
            source={face}
            resizeMode="contain"
            style={styles.faceIconStyle}
          />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>Rent a Car</Text>
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
          <Text style={styles.headText}>Most Rented</Text>
          {/* <Button onPress={getAllCars} title="Refresh"></Button> */}

          {!loading ? (
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
          <View style={{ paddingBottom: 150 }}></View>
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
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
  },

  searchSection: {
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
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
    width: 275,
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
    marginRight: -10,
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
    width: "110%",
    height: 500,
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
