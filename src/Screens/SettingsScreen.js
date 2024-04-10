import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:1, justifyContent: "center", alignItems:"center"}}>
      <Button onPress={()=> navigation.replace("SignIn")} title='Sign Out'></Button>
    </View>
  )
}

export default SettingsScreen