import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Alert,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { addCarSuccess, updateCar, updateCarSuccess } from "../Redux/carSlice/carSlice";
import { useDispatch, useSelector } from "react-redux";

const allBrands = [
  { label: "MERCEDES", value: "MERCEDES" },
  { label: "BMW", value: "BMW" },
  { label: "AUDI", value: "AUDI" },
];

const models = [
  { label: "Aclass", value: "Aclass" },
  { label: "Sclass", value: "Sclass" },
  { label: "CClass", value: "CClass" },
  { label: "320d", value: "320d" },
  { label: "420d", value: "420d" },
];

const colors = [
  { label: "Black", value: "Black" },
  { label: "Silver", value: "Silver" },
  { label: "Red", value: "Red" },
  { label: "Blue", value: "Blue" },
  { label: "Crystal Gold", value: "Crystal Gold" },
  { label: "Chrome", value: "Chrome" },
];
const types = [
  { label: "SEDAN", value: "SEDAN" },
  { label: "SUV", value: "SUV" },
  { label: "HATCHBACK", value: "HATCHBACK" },
  { label: "COUPE", value: "COUPE" },
];

const transmissions = [
  { label: "Automatic", value: "Automatic" },
  { label: "Manual", value: "Manual" },
];

const back = require("../Assets/icons/left-arrow.png");

const EditScreen = ({ route }) => {
  const isUpdating = useSelector((state) => state.cars.isUpdating)
  const dispatch = useDispatch();
  const car = route.params?.car;
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [color, setColor] = useState(null);
  const [type, setType] = useState(null);
  const [transmission, setTransmission] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [year, setYear] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [adding, setAdding] = useState(false);

  const [image, setImage] = useState(null);
  const [refreshedCars, setRefreshedCars] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    if (car) {
      setBrand(car.brand);
      setColor(car.colour);
      setDescription(car.description);
      setImage(car.image);
      setModel(car.name);
      setType(car.type);
      setTransmission(car.transmission);
      setPrice(car.price);
      setYear(car.year);
    }
  }, [car]);

  const renderLabel = () => {
    if (brand || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };
  // const disabled = !(
  //   brand &&
  //   model &&
  //   color &&
  //   type &&
  //   transmission &&
  //   description &&
  //   price &&
  //   year
  // );



  const handleUpdateCar = (id) => {
    const newCar = {
      brand,
      colour: color,
      name: model,
      type,
      transmission,
      description,
      price,
      year,
      image,
    };

    dispatch(updateCar({ id, newCar }));
    setTimeout(() => {
      dispatch(updateCarSuccess());
      navigation.navigate("Initial");
    }, 1000);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets.mimeType == "image/jpeg") {
      base64Image = "data:image/jpeg;base64," + result.assets[0].base64;
    } else {
      base64Image = "data:image/png;base64," + result.assets[0].base64;
    }

    if (!result.canceled) {
      setImage(base64Image);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerSection}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.goBack("Initial")}
          activeOpacity={0.9}
        >
          <Image
            source={back}
            resizeMode="contain"
            style={styles.menuIconStyle}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Text className="flex-1 text-lg font-bold">Edit Car Details</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.container}>
          {/* {renderLabel()} */}
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={allBrands}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Select item" : "..."}
            searchPlaceholder="Search..."
            value={brand}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setBrand(item.value);
              setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? "blue" : "black"}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={models}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Select Model"}
            searchPlaceholder="Search..."
            value={model}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setModel(item.value);
              setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? "blue" : "black"}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={colors}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Select Colour"}
            searchPlaceholder="Search..."
            value={color}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setColor(item.value);
              setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? "blue" : "black"}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={types}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Select Type"}
            searchPlaceholder="Search..."
            value={type}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setType(item.value);
              setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? "blue" : "black"}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={transmissions}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"Select Type"}
            searchPlaceholder="Search..."
            value={transmission}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setTransmission(item.value);
              setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? "blue" : "black"}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />
        </View>
        <View className="flex items-center mx-4 space-y-4">
          <View className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput
              value={price}
              placeholder="Price"
              keyboardType="number-pad"
              placeholderTextColor={"gray"}
              onChangeText={(value) => setPrice(value)}
            />
          </View>
          <View className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput
              value={year}
              placeholder="Year"
              maxLength={4}
              keyboardType="number-pad"
              placeholderTextColor={"gray"}
              onChangeText={(value) => setYear(value)}
            />
          </View>
          <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
            <TextInput
              value={description}
              placeholder="Description"
              placeholderTextColor={"gray"}
              onChangeText={(value) => setDescription(value)}
              multiline={true}
            />
          </View>
        </View>
        <View className="flex-1 justify-center items-center p-5">
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {image && (
            <Button onPress={() => setImage(null)} title="Remove Image" />
          )}
        </View>
        <View className="px-10 flex-1 bg">
          <TouchableOpacity
            onPress={pickImage}
            className="w-full bg-blue-200 p-3 rounded-2xl mb-3"
          >
            <Text className="text-xl font-bold text-black text-center">
              Add Image
            </Text>
          </TouchableOpacity>
        </View>
        <View className="px-10 flex-1 mb-20">
          <TouchableOpacity
            disabled={ isUpdating}
            onPress={() => handleUpdateCar(car.id)}
            className="w-full bg-black p-3 rounded-2xl mb-3"
          >
            {!isUpdating ? (
              <Text className="text-xl font-bold text-white text-center">
                {"Update Car Details"}
              </Text>
            ) : (
              <ActivityIndicator size={26} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e7e7e7",
  },
  container: {
    // flex: 1,
    // backgroundColor: "white",
    padding: 16,
    gap: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "red",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  image: {
    borderRadius: 20,
    borderWidth: 1,
    width: 300,
    height: 200,
  },
  headerSection: {
    height: 75,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  menuIconStyle: {
    width: 25,
  },
});
