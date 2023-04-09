import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UploadBook from "./UploadBook";
import UploadedBooks from "./UploadedBooks";

const Tab = createMaterialTopTabNavigator();

const UploadNavigator=()=>{
    return(
      <Tab.Navigator>
        <Tab.Screen name="Upload Book" component={UploadBook} />
        <Tab.Screen name="Uploaded Books" component={UploadedBooks} />
      </Tab.Navigator>
    )
}

export default UploadNavigator;