import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text, Dimensions, ImageBackground, Modal, Pressable, ScrollView } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import backarrow from "../../images/backarrow.png";
import Carousel, {
  ParallaxImage,
} from "react-native-snap-carousel-expo-46-compatible";
import { Rating, AirbnbRating } from "react-native-ratings";
import Stars from "react-native-stars";
import romance from "../../../assets/romance.png";
import adult from "../../../assets/adult.png";
import bio from "../../../assets/bio.png";
import comics from "../../../assets/comics.png";
import fantasy from "../../../assets/fantasy.png";
import history from "../../../assets/history.png";
import horror from "../../../assets/horror.png";
import mystery from "../../../assets/mystery.png";
import science from "../../../assets/science.png";
import short from "../../../assets/short.png";
import study from "../../../assets/study.png";
import young from "../../../assets/young.png";

import axios from 'axios';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// import { DEFAULT_IMAGE } from '../../constants/constants';
const genre_data = [
  { id: 1, title: "Romance", img: romance },
  { id: 2, title: "Science Fiction", img: science },
  { id: 3, title: "Young Adult", img: young },
  { id: 4, title: "Adult Fiction", img: adult },
  { id: 5, title: "Mystery", img: mystery },
  { id: 6, title: "Fantasy", img: fantasy },
  { id: 7, title: "Short Stories", img: short },
  { id: 8, title: "Biography", img: bio },
  { id: 9, title: "Education", img: study },
  { id: 10, title: "Comics", img: comics },
  { id: 11, title: "Historical", img: history },
  { id: 12, title: "Horror", img: horror },
];

   const UploadBook=({ navigation })=>{
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const genreCarousel = React.useRef(null);
    
    
    
    const user = useSelector((state) => state.USER);


    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    // useEffect(()=>{
    //   setImage(DEFAULT_IMAGE);
    // },[])

    const handleImagePicker = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access media library is required.');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        setImage(result.assets[0].uri);
    //    dispatchEvent({type:SET_DEFAULT_IMAGE,payload:result.assets[0].uri})
       toggleModal();
      }
      
    };
    

    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const handleButtonPress = (index) => {
      setSelectedButtonIndex(index);
    };

    const renderButton = (item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => handleButtonPress(index)}
          style={[
            genre_styles.button,
            selectedButtonIndex === index && genre_styles.selectedButton,
          ]}
        >
          <ImageBackground
            blurRadius={2}
            source={item.img}
            style={[
              genre_styles.backgroundImage,
              selectedButtonIndex === index && genre_styles.selectedCard,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                genre_styles.buttonText,
                selectedButtonIndex === index && genre_styles.selectedButtonText,
              ]}
            >
              {item.title}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      );
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
  
    // const handleUploadFile = async () => {
    //   if (!selectedFile || typeof selectedFile !== 'object') {
    //     return;
    //   }
  
    //   const data = new FormData();
    //   data.append('file', {
    //     uri: documentUri,
    //     type: '*/*',
    //     name: 'document',
    //   });
  
    //   try {
    //     const response = await axios.post('https://example.com/upload', data);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.log(error in upload);
    //   }
    // }

    const handleUpload = async () => {
      
        const formData = new FormData();
        formData.append('title',title);
        formData.append('description',text);
        // formData.append('selectedFile', {
        //   uri: selectedFile.uri,
        //   type: '*/*',
        //   name: selectedFile.name
        // });
        // formData.append('image',{
        //   uri:image.uri,
        //   type:image.type,
        //   name:image.fileName,
        // })
        
  
      try{
        const response = await axios.postForm('http://localhost:5000/admin/book/new',formData);
  
        const data = await response.json();
  
        console.log(data);
      } catch (error) {
        console.error("file upload fail",error);
      }
    };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      {/* <View onPress={goBack} style={styles.closeIcon}>
         <TouchableOpacity onPress={goBack}>
            <Image source={backarrow} style={styles.closeIcon} />
          </TouchableOpacity>
      </View> */}
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


        <View style={genre_styles.container}>
            {genre_data.map((item, index) => renderButton(item, index))}
        </View>


      <View >
         <Text style={styles.uploadbookcover} onPress={toggleModal}>Upload Book Cover</Text>
          <View style={{flexDirection:"row",marginTop:3}}>
          {user && user.user && image &&
            <><Image source={{uri:((user.user.image)?  user.user.image : image)}}  style={styles.image} />
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
          <Button  style={styles.button} title="Upload File" color="#554994" />
          </>)}
          </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleUpload} color="#554994"/>
      </View>
    </View>
    </ScrollView>
  );
}
   
  
const styles = StyleSheet.create({
  // #144272
  container:{
    backgroundColor:'white',
    height:"100%",
    width:screenWidth,
    paddingTop:50,
    zIndex:-1,
    flex:1,
  },
  label:{
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft:20,
    color:'black',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 10,
    marginHorizontal:25,
  },
  input: {
    height: 40,
    borderColor:'#554994',
    borderWidth: 1,
    width:screenWidth-50,
    marginBottom: 20,
    paddingHorizontal: 10,
    marginHorizontal:20,
    backgroundColor:'white',
    color:'black',
    borderRadius:5,
  },
  titleContainer:{
    // flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop:1,
    color:'black',
  },
  textContainer:{
    height: 200,
    borderColor:'#554994',
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
    borderColor:'#554994',
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
    backgroundColor: '#554994',
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
    backgroundColor: '#554994',
    color:'white',
    borderRadius:5,
    fontWeight: 'bold',
  },
  uploadbutton:{
    width:'50%',
  }
});

const genre_styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    flexDirection:"row",
    flexWrap:"wrap",
  },
  button: {
    borderRadius: 12,
    backgroundColor: "#eee",
    overflow: "hidden",
    marginHorizontal: 5,
    width:"30%",
    height:30,
    marginVertical: 5,
    display:"flex",
  },
  selectedButton: {
    backgroundColor: "rgba(0,107,255,255)",
    zIndex: -1,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "800",
  },
  selectedButtonText: {
    color: "white",
    fontWeight: "800",
    zIndex: 1,
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  backgroundImage: {
    resizeMode: "cover",
    justifyContent: "center",
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 12,
  },
  selectedCard: {
    opacity: 0.2,
  },
  viewAll: {
    fontSize: 10,
    right: 0,
    textAlign: "right",
    marginTop: 5,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000",
  },
});

export default UploadBook;