import React,{useEffect} from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UploadBook from "./UploadBook";
import UploadedBooks from "./UploadedBooks";
import { Ionicons } from '@expo/vector-icons'; 
import { View,TouchableOpacity,Text} from "react-native";
import {uploadedBooksList} from "../../store/actions/booksAction"

const Tab = createMaterialTopTabNavigator();

const UploadNavigator=({ navigation })=>{

    return(
      <>
      <View style={{height:60,flexDirection:"row",paddingTop:18}}>
        <TouchableOpacity onPress={(()=>{navigation.goBack()})}>
        <Ionicons name="arrow-back" size={24} color="black" style={{marginLeft:15,marginTop:5}}/>
        </TouchableOpacity>
        <Text style={{fontSize:24,marginLeft:80,fontWeight:"bold"}}>UPLOAD BOOK</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Upload Book" component={UploadBook} />
        <Tab.Screen name="Uploaded Books" component={UploadedBooks} />
      </Tab.Navigator>
      </>
    )
}

export default UploadNavigator;