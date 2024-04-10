import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import data from "../dataset/vehicles.json";
import { MaterialIcons } from "@expo/vector-icons";

const back = require("../Assets/icons/left-arrow.png");
const dots = require("../Assets/icons/dots.png");

const image_v_1 = require("../Assets/vehicles/v-1.png");
const image_v_2 = require("../Assets/vehicles/v-2.png");
const image_v_3 = require("../Assets/vehicles/v-3.png");
const image_v_4 = require("../Assets/vehicles/v-4.png");

const InfoScreen = ({ route, navigation }) => {
  const [favCars, setFavCars] = useState([]);
  const [refreshedCars, setRefreshedCars] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const vehicle = route.params.car;
  const { isAdmin } = route.params;
  console.log("ddddeeeellllll", deleting);
  const getImage = (id) => {
    if (id == 1) return image_v_1;
    if (id == 2) return image_v_2;
    if (id == 3) return image_v_3;
    if (id == 4) return image_v_4;
  };

  const favouritePressed = (car) => {
    const isFav = favCars.findIndex((item) => item.id === car.id);
    console.log(")))))))))", car.name, isFav);
    if (isFav !== -1) {
      const fav = favCars;
      const res = fav.filter((item) => item.id !== car.id);
      console.log("<<<<<<<<<<", res.length);
      setFavCars(res);
    } else {
      const fav = favCars;
      fav.push(car);
      console.log("<<<<<<<<fav>>>>>>>>", fav.length);
      setFavCars(fav);
    }
  };

  const getAllCars = () => {
    const url = "http://192.168.1.3:9000/api/admin/cars";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        navigation.navigate("Initial", { refreshedCars: json });
        setRefreshedCars(json);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    setDeleting(true);
    const url = `http://192.168.1.3:9000/api/admin/car/${vehicle.id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response)
      .then((json) => {
        if (json.status == 200) {
          // navigation.navigate("Initial");
        } else {
          Alert.alert("Something went wrong");
        }
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      getAllCars();
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image
              source={back}
              resizeMode="contain"
              style={styles.menuIconStyle}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => favouritePressed(car)}
            style={{
              zIndex: 1,
              paddingLeft: 20,
              marginBottom: -10,
              height: 30,
            }}
          >
            {<AntDesign name="heart" size={20} color="black" />}
          </TouchableOpacity> */}
          {isAdmin && (
            <TouchableOpacity
              disabled={deleting}
              onPress={handleDelete}
              activeOpacity={0.9}
            >
              {!deleting ? (
                <MaterialIcons name="delete" size={30} color="black" />
              ) : (
                <ActivityIndicator size="small" color="#0000ff" />
              )}
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.imageSection}>
          <Image
            source={{ uri: vehicle.image }}
            resizeMode="contain"
            style={styles.vehicleImage}
          />
        </View>

        <View style={styles.headSection}>
          <View style={styles.topTextArea}>
            <Text style={styles.makemodelText}>
              {vehicle.brand} {vehicle.name}
            </Text>
            <Text style={styles.price}>
              <Text style={styles.amount}>${vehicle.price}</Text> /day
            </Text>
          </View>
          <Text style={styles.typetranText}>
            {vehicle.type}-{vehicle.transmission}
          </Text>
        </View>

        <Text style={styles.descriptionText}>
          {
            "Discover the PEUGEOT SUV 3008 with its unique design with innovative SUV codes. Its characteristic and original design combines power and elegance with dynamism and flowing lines."
          }
        </Text>
        <Text style={styles.propertiesText}>Properties</Text>

        <View style={styles.propertiesArea}>
          <View style={styles.level}>
            <Text style={styles.propertyText}>
              Motor power:
              <Text style={styles.valueText}> {"120"} hp</Text>
            </Text>
            <Text style={styles.propertyText}>
              Engine capacity:
              <Text style={styles.valueText}> {"1560"} cc</Text>
            </Text>
          </View>
          <View style={styles.level}>
            <Text style={styles.propertyText}>
              Fuel:
              <Text style={styles.valueText}> {"Diesel"}</Text>
            </Text>

            <Text style={styles.propertyText}>
              Traction:
              <Text style={styles.valueText}> {"4x2"}</Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.rentButton}>
          <Text style={styles.rentButtonText}>Rent a Car</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingRight: 35,
    paddingLeft: 35,
  },
  headerSection: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIconStyle: {
    width: 25,
  },
  HeaderText: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "500",
  },
  faceIconStyle: {
    width: 30,
  },

  imageSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleImage: {
    width: 300,
    height: 300,
  },

  headSection: {},
  topTextArea: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  makemodelText: {
    fontSize: 20,
    fontWeight: "500",
  },
  price: {
    fontWeight: "400",
  },
  amount: {
    fontWeight: "bold",
  },
  typetranText: {
    marginTop: 1,
    color: "#696969",
    fontWeight: "600",
    fontSize: 12,
  },
  descriptionText: {
    marginTop: 30,
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 18,
    color: "#696969",
    fontWeight: "500",
  },
  propertiesText: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "500",
  },
  propertiesArea: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  level: {
    marginRight: 30,
  },
  propertyText: {
    fontSize: 12,
    color: "#696969",
  },
  valueText: {
    fontSize: 12,
    color: "black",
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
  rentButtonText: {
    color: "white",
    fontWeight: "500",
  },
});
