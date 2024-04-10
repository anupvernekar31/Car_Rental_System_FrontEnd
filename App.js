import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/Screens/HomeScreen";
import MapScreen from "./src/Screens/MapScreen";
import SavedScreen from "./src/Screens/SavedScreen";
import SettingsScreen from "./src/Screens/SettingsScreen";
import InfoScreen from "./src/Screens/InfoScreen";
import SignIn from "./src/Screens/SignIn";
import SignUp from "./src/Screens/SignUp";
import AddCarScreen from "./src/Screens/AddCarScreen";
import EditScreen from "./src/Screens/EditScreen";

const homeIcon_active = require("./src/Assets/icons/home-active.png");
const homeIcon = require("./src/Assets/icons/home.png");
const compass_active = require("./src/Assets/icons/compass-active.png");
const compass = require("./src/Assets/icons/compass.png");
const savedIcon_active = require("./src/Assets/icons/saved-active.png");
const savedIcon = require("./src/Assets/icons/saved.png");
const settingsIcon_active = require("./src/Assets/icons/settings-active.png");
const settingsIcon = require("./src/Assets/icons/settings.png");
const addIcon = require("./src/Assets/icons/add.png");

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack({ route }) {
  const { isAdmin } = route.params;
  console.log(">>>>>>", isAdmin);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Initial"
        component={HomeScreen}
        initialParams={{ isAdmin }}
      />
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}

function BottomStack({ route }) {
  const { isAdmin } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? homeIcon_active : homeIcon;
          } else if (route.name === "Map") {
            iconName = focused ? compass_active : compass;
          } else if (route.name === "Saved") {
            iconName = focused ? savedIcon_active : savedIcon;
          } else if (route.name === "AddCar") {
            iconName = focused ? addIcon : addIcon;
          } else {
            iconName = focused ? settingsIcon_active : settingsIcon;
          }
          return (
            <Image
              source={iconName}
              resizeMode="contain"
              style={styles.footerIcon}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderRadius: 50,
          padding: 10,
          position: "absolute",
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        initialParams={{ isAdmin }}
      />
      {/* <Tab.Screen name="Map" component={MapScreen} /> */}
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function BottomStackAdmin({ route }) {
  const { isAdmin } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? homeIcon_active : homeIcon;
          } else if (route.name === "Saved") {
            iconName = focused ? savedIcon_active : savedIcon;
          } else if (route.name === "AddCar") {
            iconName = focused ? addIcon : addIcon;
          } else {
            iconName = focused ? settingsIcon_active : settingsIcon;
          }
          return route.name == "AddCar" ? (
            <MaterialIcons
              name="add-circle-outline"
              size={28}
              color={focused ? "white" : "gray"}
            />
          ) : (
            <Image
              source={iconName}
              resizeMode="contain"
              style={styles.footerIcon}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderRadius: 50,
          padding: 10,
          position: "absolute",
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        initialParams={{ isAdmin }}
      />
      <Tab.Screen name="AddCar" component={AddCarScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Bottom" component={BottomStack} />
        <Stack.Screen name="AdminHome" component={BottomStackAdmin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  footerIcon: {
    height: 20,
    width: 20,
  },
});
