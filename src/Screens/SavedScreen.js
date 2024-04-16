import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const SavedScreen = ({ route }) => {
  const { isAdmin } = route.params;
  const cars = useSelector((state) => state.cars.cars);

  const favouriteCars = cars.filter((car) => car.favourite === true);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.listSection}>
          <Text className="text-center" style={styles.headText}>
            Saved Cars
          </Text>

          {
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.elementPallet}
            >
              {favouriteCars.length > 0 ? (
                favouriteCars.map((car) => {
                  return (
                    <TouchableOpacity
                      style={styles.element}
                      key={car.id}
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate("SavedInfo", { car, isAdmin })
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
                    Oops...You have no favourites!!
                  </Text>
                </View>
              )}
            </ScrollView>
          }
          <View style={{ paddingBottom: 120 }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SavedScreen;

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
