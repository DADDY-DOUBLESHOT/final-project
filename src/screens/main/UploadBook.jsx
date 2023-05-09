import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text, Dimensions, ImageBackground, Modal, Pressable, ScrollView,ToastAndroid} from 'react-native';
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
import { BASE_URL } from "@env";

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
    const [author,setAuthor]=useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    
    
    
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
    

  const getLabelStyle = (genre) => {
    if (selectedGenres.includes(genre)) {
      return styles.selectedLabel;
    }
    return styles.genrelabel;
  };

  const toggleGenreSelection = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
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
  

    const handleUpload = async () => {
      
        const formData = new FormData();
        formData.append('title',title);
        formData.append('author',author)
        formData.append('description',text);
        formData.append('genres',selectedGenres)
        formData.append('selectedFile', {
          uri: selectedFile.uri,
          type: '*/*',
          name: selectedFile.name
        });
        formData.append('image',{
          uri:image,
          type:'image/jpeg',
          name:image.name,
        })
        

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${BASE_URL}/admin/book/new`,
          data:formData,
          headers: {"Content-type":"multipart/form-data" },
        };
        try {
          await axios(config)
            .then(function () {
              console.log("response is", title,text,selectedFile.uri,selectedFile.name);
              console.log("author:",author);
              console.log("genres:",selectedGenres);
              console.log("image sent",image.uri,image.name)
              console.log("response sent");
              ToastAndroid.show(
                `Book Uploaded`,
                ToastAndroid.SHORT
              );
            })
            .catch(function (error) {
              console.log("Unable to upload Book", error);
              ToastAndroid.show(
                `Error in Book Uploaded ${error.message}`,
                ToastAndroid.SHORT
              );
            });
          } catch (error) {
            console.log("Unable to upload Book", error);
            ToastAndroid.show(
              `Error in Book Uploaded ${error.message}`,
              ToastAndroid.SHORT
            );
          }

          setAuthor('');
          setTitle('');
          setText('');
          setImage(null);
          setSelectedFile('');
          setSelectedGenres([]);
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
      <View style={styles.titleContainer}>
        <Text style={styles.label}>Author:</Text>
        <TextInput style={styles.input} value={author} onChangeText={setAuthor} placeholder="Author" />
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

      {/* genre selections */}
      <View>
      <View style={{flexDirection:"row",flexWrap:"wrap",marginHorizontal:25,marginVertical:20}}>
       {genre_data.map((item)=>{
         return(
          <View key={item.id}>
          <TouchableOpacity  key={item.id}
          style={[styles.checkbox, selectedGenres.includes(`${item.title}`) && styles.selectedCheckbox]}
          onPress={() => toggleGenreSelection(`${item.title}`)}
          >
            <Text style={getLabelStyle(`${item.title}`)} key={item.id}>{item.title}</Text>
          </TouchableOpacity>
        </View>
         );
       })}

        {/* Add more TouchableOpacity components for other genres */}
      </View>
        {/* Add more switches for other genres */}
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
  },

  checkbox: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 10
  },
  selectedCheckbox: {
    marginLeft: 8,
    backgroundColor: 'blue',
    borderWidth:1,
    width:150,
    alignItems:'center',
    // justifyContent:'center',
    paddingHorizontal:15,
    borderRadius:20
  },
  genrelabel: {
    marginLeft: 8,
    fontSize: 14,
    borderWidth:1,
    width:150,
    alignItems:'center',
    alignContent:"center",
    // justifyContent:'center',
    paddingHorizontal:15,
    borderRadius:20
  },
  selectedLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: 'white',
    // paddingHorizontal:15,
    fontWeight: 'bold',  
  }
  

});


export default UploadBook;