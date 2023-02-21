import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View , Button, Modal, Pressable} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
// import profile from "../images/profile.png";
import camera from "../images/camera.png"
import upload from "../images/upload.png"
// Tab ICons...
import home from "../images/home.png";
import search from "../images/search.png";
import notifications from "../images/bell.png";
import settings from "../images/settings.png";
import logout from "../images/logout.png";
import bookmark from "../images/bookmark.png";
import edit from "../images/edit.png";
// Menu
import menu from "../images/menu.png";
import close from "../images/close.png";

// Photo
import photo from "../images/photo.jpg";
import HomeScreen2 from './HomeScreen2';

// import { setDefaultImage } from "../store/actions/userAction";
import { loaderStart } from "../store/actions/loaderAction";


const profile="require('../images/photo.jpg')";

export default function HomeNavi({navigation}) {
  const dispatch=useDispatch();
  const defaultImage=useSelector((state)=>state.image)
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required.');
      return;
    }
     
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    
    if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
        dispatch({type:'SET_DEFAULT_IMAGE',payload:result.assets[0].uri})
        toggleModal();
    }
    
  };

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
 
        {/* <Image source={photo} style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginTop: 50,
          alignItems: 'center',
          marginStart:45,
          zIndex:-1
        }}></Image> */}

      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
      {profileImage && (<Image source={{uri:profileImage}} style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginTop: 100,
          alignItems: 'center',
          marginStart:45,
        }}></Image>)
        // :
        // (<Image source={{require('../images/profile.png').}} style={{
        //   width: 100,
        //   height: 100,
        //   borderRadius: 50,
        //   marginTop: 50,
        //   alignItems: 'center',
        //   marginStart:45,
        // }}></Image>)
         }


       <Pressable onPress={toggleModal} >
       <Image source={camera} style={{
          width: 30,
          height: 20,
          borderRadius:5,
          marginTop:-25,
          alignItems: 'center',
          marginStart:120
        }}></Image></Pressable>

        
        <Modal visible={isModalVisible} onRequestClose={toggleModal} transparent={true}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text>Choose Profile Image:</Text>
              <Button title="Open Image Picker" onPress={handleImagePicker} />
              <Button title="Cancel" onPress={toggleModal} />
            </View>
          </View>
        </Modal>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20,
          alignItems: 'center',
          marginStart:40
        }}>Jenna Ezarik</Text>

       <Image source={edit} style={{
          width: 20,
          height: 20,
          marginTop: -25,
          marginStart:160
        }}></Image>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Wishlist", bookmark)}
          {TabButton(currentTab, setCurrentTab, "Upload Book", upload)}

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
        </View>

      </View>

      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <TouchableOpacity onPress={() => {
            // Do Actions Here....
            // Scaling the view...
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(offsetValue, {
              // YOur Random Value...
              toValue: showMenu ? 0 : 230,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            Animated.timing(closeButtonOffset, {
              // YOur Random Value...
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true
            })
              .start()

            setShowMenu(!showMenu);
          }}>

            <Image source={showMenu ? close : menu} style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginTop: 40,

            }}></Image>

          </TouchableOpacity>

          {
            currentTab==='Home'&&
            <HomeScreen2 navigation={navigation}/>
          }

          
        </Animated.View>

      </Animated.View>

    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (

    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        // Do your Stuff...
      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white",
          
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,107,255,255)',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop:100,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 200,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});