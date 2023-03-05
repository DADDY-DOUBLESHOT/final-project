import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text, Dimensions, ImageBackground, Modal, Pressable, ScrollView } from 'react-native';
// import * as ImagePicker from "react-native-image-picker";
// import DocumentPicker from 'react-native-document-picker';
import { useDispatch,useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import uploadimg from '../images/upload.png';
import backarrow from "../images/backarrow.png";
import { AntDesign } from '@expo/vector-icons';

import axios from 'axios';
// import { APP_IP } from "@env";
import uploadbackgrnd from "../images/uploadbackgrnd2.jpg";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

import { DEFAULT_IMAGE } from '../constants/constants';

   const UploadBook=({ navigation })=>{
    // const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    // const [image, setImage] = useState(uploadimg);
    // const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    
    
    const user = useSelector((state) => state.USER);


    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    useEffect(()=>{
      setImage(DEFAULT_IMAGE);
    },[])

    const handleImagePicker = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access media library is required.');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setImage(result.assets[0].uri);
       dispatchEvent({type:SET_DEFAULT_IMAGE,payload:result.assets[0].uri})
       toggleModal();
      }
      
    };
    

    // const handleSubmit = () => {
    //   // onSubmit(Image);
    //   onClose();
    // };


    const handleDocumentPicker = async () => {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
  
      if (result.type === 'success') {
        setSelectedFile(result);
      }
    };
  
    const handleUploadFile = async () => {
      if (!selectedFile || typeof selectedFile !== 'object') {
        return;
      }
  
      const data = new FormData();
      data.append('file', {
        uri: documentUri,
        type: '*/*',
        name: 'document',
      });
  
      try {
        const response = await axios.post('https://example.com/upload', data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View onPress={goBack} style={styles.closeIcon}>
         <TouchableOpacity onPress={goBack}>
            <Image source={backarrow} style={styles.closeIcon} />
          </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Upload New Book</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>Book Title:</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
      </View>
      <View>
      <Text style={styles.label}>Book Summary:</Text>
       <ScrollView>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Text"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            color='black'
            style={styles.textContainer}
          />
          </ScrollView>
        </View>
      <View >
         <Text style={styles.uploadbookcover} onPress={toggleModal}>Upload Book Cover</Text>
          <View style={{flexDirection:"row",marginTop:3}}>
          {
            <><Image source={{uri:((user && user.user && image && user.user.image)?  user.user.image : image)}}  style={styles.image} />
            {/* <Button  style={styles.button} title="Upload File"/> */}
            </>
          }
          </View>
      </View>

      <Modal visible={isModalVisible} onRequestClose={toggleModal} transparent={true}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text>Choose Profile Image:</Text>
              <Button title="Open Image Picker" onPress={handleImagePicker} />
              <Button title="Cancel" onPress={toggleModal} />
            </View>
          </View>
        </Modal>

      <View style={styles.titleContainer}>
        <Text style={styles.uploadbook} onPress={handleDocumentPicker}>Upload Book</Text>
        <View style={{flexDirection:"row",marginTop:10}}>
        {selectedFile && (
          <>
         <Text style={styles.uploadfile}> Selected File: {selectedFile.name}</Text>
          <Button  style={styles.button} title="Upload File"/>
          </>)}
          </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit"/>
      </View>
    </View>
    </ScrollView>
  );
}
   
  
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#144272',
    height:'100%',
    width:screenWidth,
    zIndex:-1,
    flex:1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical:10,
    marginTop:100,
    marginBottom:30,
    color:'white',
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
    width:200,
    marginHorizontal:100,
  },
  label:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:20,
    color:'white',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    marginHorizontal:25,
  },
  input: {
    height: 40,
    borderColor:'white',
    borderWidth: 1,
    width:screenWidth-50,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginHorizontal:20,
    backgroundColor:'white',
    color:'white',
    borderRadius:5,
  },
  titleContainer:{
    // flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop:1,
    color:'white',
  },
  textContainer:{
    height: 200,
    borderColor:'white',
    borderWidth: 1,
    width:screenWidth-50,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical:10,
    marginHorizontal:20,
    color:'black',
    backgroundColor:'white',
    borderRadius:5,
  },
  uploadfile:{
    backgroundColor:'white',
    color:'black',
    width:screenWidth-200,
    height:20,
    marginHorizontal:50,
    marginVertical:5,
    alignSelf:"center",
    marginRight:10,
    justifyContent:"center",
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '50%',
    marginTop:20,
    marginVertical:40,
  },
  button: {
    width: '100%',
    height:'50%',
    paddingHorizontal:20
  },
  closeIcon: {
    marginRight:2,
    // right:screenWidth-12,
    right:10,
    top:25,
    width:30,
    height:30,
    position:'absolute',
  },
  image: {
    marginTop:10,
    width:100, 
    height: 100, 
    paddingVertical:1,
    marginHorizontal:150,
    borderRadius:5,
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
  uploadbook:{
    height:40,
    width:'85%',
    alignSelf:'center',
    marginVertical:30,
    marginBottom:10,
    padding:10,
    alignContent:'center',
    marginHorizontal:20,
    paddingHorizontal:120,
    backgroundColor: '#2C74B3',
    color:'white',
    borderRadius:5,
    fontWeight: 'bold',
  },
  uploadbookcover:{
    height:40,
    width:'85%',
    alignSelf:'center',
    marginVertical:30,
    marginBottom:10,
    padding:10,
    alignContent:'center',
    marginHorizontal:20,
    paddingHorizontal:100,
    backgroundColor: '#2C74B3',
    color:'white',
    borderRadius:5,
    fontWeight: 'bold',
  },
  uploadbutton:{
    width:'50%',
  }
});
export default UploadBook;