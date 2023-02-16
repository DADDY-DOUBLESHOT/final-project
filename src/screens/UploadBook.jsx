import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text, Dimensions, ImageBackground } from 'react-native';
// import * as ImagePicker from "react-native-image-picker";
// import DocumentPicker from 'react-native-document-picker';
import uploadimg from '../images/upload.png';
import backarrow from "../images/backarrow.png";
import { AntDesign } from '@expo/vector-icons';
// import *  as ImagePicker from 'expo-image-picker';

import uploadbackgrnd from "../images/uploadbackgrnd2.jpg";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

   const UploadBook=({ navigation })=>{
    // const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(uploadimg);
    const [file, setFile] = useState(null);
    
    // const [hasGalleryPermission, setHasGAlleryPermission]=useState(null);


    

  // useEffect(()=>{
  //   (async ()=>{
  //     const gallerStatus=await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setHasGAlleryPermission(gallerStatus.status==='granted');
  //   })();
  // },[]);

  // const pickImage=async()=>{
  //   let result=await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes:ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing:true,
  //     aspect:[4,2],
  //     quality:1,
  //   });

  //   if(!result.canceled){
  //       setImage(result.assest[0].uri);
  //   }
  // };

  // if(hasGalleryPermission===false){
  //   return <Text>No access to Internal Storage</Text>
  // }

  const goBack = () => {
    // navigation.goBack();
  };


//    const pickImage=()=>{
//    ImagePicker.launchImageLibrary({ title: 'Select Image' }, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         setImage({uri:response.uri});
//       }
//     });
//   }

  


//   const pickFile = async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });
//       setFile(result.uri);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled document picker');
//       } else {
//         console.log('DocumentPicker Error: ', err);
//       }
//     }
//   };

  const handleSubmit = () => {
    // Handle form submission, including the uploaded image and file
  };

  return (
    <View style={styles.container}>
      <ImageBackground
                  style={[
                    {
                      height: 900,
                      width: screenWidth,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop:screenHeight-50
                      // opacity:0.5,
                    },
                  ]}
                  resizeMode="cover"
                  blurRadius={15}
                  source={uploadbackgrnd}> 
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
      <View>
      <Text style={styles.label}>Book Summary:</Text>
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
        </View>
      <View style={{marginRight:screenWidth-300,paddingVertical: 10,marginHorizontal:8,flexDirection: 'row'}}>
          <Text style={styles.label}>Upload Book Cover:</Text>
          <TouchableOpacity>
            <Image title="Select Image" source={uploadimg} style={{ width:50, height: 50, paddingVertical:10, marginHorizontal:8, tintColor:'white'}} />
          </TouchableOpacity>
      </View>
      {/* <View>
          <Button title='Pick image' onPress={()=>pickImage()} />
          {image && <Image source={{uri:image}} style={{flex:1/2}}/>}
      </View> */}
      <View style={styles.titleContainer}>
        <Text style={styles.label}>Upload Book:</Text>
        <TouchableOpacity >
          <Text style={styles.uploadfile}>{file ? file : 'Choose File'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} style={styles.button}/>
      </View>
      </ImageBackground>
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor:'rgba(0,107,255,255)',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'black',
    // borderWidth:1,
    height: screenHeight,
    marginTop:-50,
    zIndex:-1
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical:10,
    marginBottom:50,
    alignItems: 'center',
    // justifyContent: 'center',
    color:'white',
    // opacity:1,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    fontStyle:'italic',
  },
  label:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft:10,
    color:'white',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    marginHorizontal:8,
  },
  input: {
    height: 40,
    borderColor:'white',
    borderWidth: 1,
    width:screenWidth-120,
    marginLeft:10,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginHorizontal:10,
    color:'white',
  },
  titleContainer:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop:1,
  },
  textContainer:{
    height: 200,
    borderColor: 'white',
    borderWidth: 1,
    width:screenWidth-50,
    marginLeft:22,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical:10,
    marginHorizontal:10,
    marginRight:22,
  },
  uploadfile:{
    marginLeft:2,
    backgroundColor:'white',
    width:screenWidth-150,
    height:30,
    marginRight:20,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  button: {
    width: '100%',
  },
  closeIcon: {
    marginRight:2,
    // right:screenWidth-12,
    right:5,
    top:50,
    width:30,
    height:30,
    position:'absolute',
  },
});
export default UploadBook;