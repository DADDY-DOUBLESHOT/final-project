import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from "react-native-image-picker"
import DocumentPicker from 'react-native-document-picker';
import cameraIcon from '../images/camera.png';
import backarrow from "../images/backarrow.png";
import { AntDesign } from '@expo/vector-icons';

function UploadBook() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(cameraIcon);
  const [file, setFile] = useState(null);

  const goBack = () => {
    // navigation.goBack();
  };


   const pickImage=()=>{

   ImagePicker.launchImageLibrary({ title: 'Select Image' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage({uri:source.uri});
      }
    });
  }

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(result.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
  };

  const handleSubmit = () => {
    // Handle form submission, including the uploaded image and file
  };

  return (
    <View style={styles.container}>
      <View onPress={goBack} style={styles.closeIcon}>
         <TouchableOpacity onPress={goBack}>
            <Image source={backarrow} style={styles.closeIcon} />
          </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Upload New Book</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>Book Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
      </View>
      <Text style={styles.label}>Book Summary</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Text"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            color='white'
            style={styles.textContainer}
          />
      <View>
          <TouchableOpacity onPress={pickImage}>
            <Image source={{image}} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>Upload Book:</Text>
        <TouchableOpacity onPress={pickFile}>
          <Text style={styles.uploadfile}>{file ? file : 'Choose File'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} style={styles.button}/>
      </View>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,107,255,255)',
    alignItems: 'flex-start',
    justifyContent: 'center',
    color:'white',
    marginTop:0,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
    marginLeft:100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    color:'white',
  },
  label:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:12,
    color:'white',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    width:250,
    marginLeft:20,
    marginBottom: 20,
    paddingHorizontal: 10,
    color:'white',
  },
  titleContainer:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textContainer:{
    height: 200,
    borderColor: 'white',
    borderWidth: 1,
    width:350,
    marginLeft:22,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical:10,
  },
  uploadfile:{
    marginLeft:20,
    backgroundColor:'white',
    width:250,
    height:25,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  button: {
    width: '100%',
  },
  closeIcon: {
    top:5,
    marginTop:15,
    marginRight:5,
    right:10,
    width:30,
    height:30,
    position:'absolute',
  },
});
export default UploadBook;