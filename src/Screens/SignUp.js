import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const SignUp = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const signUpData = {
      name,
      email,
      password,
    };

    const url = "http://192.168.1.7:9000/api/auth/signup";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(signUpData),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.id) {
            navigation.replace("Bottom", json);
        }
        else {
            Alert.alert("Something Went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("../Assets/login/background.png")}
      />

      {/* LIGHTS */}
      <View className="flex-row justify-around w-full absolute">
        <Image
          className="h-[255] w-[90] "
          source={require("../Assets/login/light.png")}
        />

        <Image
          className="h-[160] w-[65] "
          source={require("../Assets/login/light.png")}
        />
      </View>

      <View className="h-full w-full flex justify-around pt-40 pb-10">
        <View className="flex items-center">
          <Text className="text-white font-bold tracking-wider text-5xl pt-10">
            Sign Up
          </Text>
        </View>

        <View className="flex items-center mx-4 space-y-4">
          <View className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput
              placeholder="Name"
              placeholderTextColor={"gray"}
              onChangeText={(value) => setName(value)}
            />
          </View>
          <View className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput
              placeholder="Email"
              placeholderTextColor={"gray"}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <View className="w-full">
            <TouchableOpacity
              onPress={handleSignup}
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
            >
              <Text className="text-xl font-bold text-white text-center">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace("SignIn")}>
              <Text className="text-sky-600">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
