import React from 'react'
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text, Dimensions, ImageBackground, Modal, Pressable, ScrollView } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const UploadedBooks=()=>{
  
    const data = [
        {
          title: "The Hunger Games (The Hunger Games, #1)",
          rating: "4.34",
          imgUrl: "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
          author: "Suzanne Collins",
        },
        {
          title: "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)",
          rating: "4.44",
          imgUrl: "https://images.gr-assets.com/books/1474154022m/3.jpg",
          author: "J.K. Rowling, Mary GrandPré",
        },
        {
          title: "Twilight (Twilight, #1)",
          rating: "3.57",
          imgUrl: "https://images.gr-assets.com/books/1361039443m/41865.jpg",
          author: "Stephenie Meyer",
        },
        {
          title: "To Kill a Mockingbird",
          rating: "4.25",
          imgUrl: "https://images.gr-assets.com/books/1361975680m/2657.jpg",
          author: "Harper Lee",
        },
        {
          title: "The Great Gatsby",
          rating: "3.89",
          imgUrl: "https://images.gr-assets.com/books/1490528560m/4671.jpg",
          author: "F. Scott Fitzgerald",
        },
    ]

  return (
    <View>
        {/* <Text style={{alignSelf:'center'}}>UploadedBooks</Text> */}
        <View style={styles.usercontainer}>
                <Image source={{uri:data[0].imgUrl}} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'black'}}>{data[0].title}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'black'}}>{data[0].author}</Text>
                </View>
        </View>
        <View style={styles.usercontainer}>
                <Image source={{uri:data[1].imgUrl}} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'black'}}>{data[1].title}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'black'}}>{data[1].author}</Text>
                </View>
        </View>
        <View style={styles.usercontainer}>
                <Image source={{uri:data[2].imgUrl}} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'black'}}>{data[2].title}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'black'}}>{data[2].author}</Text>
                </View>
        </View>
        <View style={styles.usercontainer}>
                <Image source={{uri:data[3].imgUrl}} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'black'}}>{data[3].title}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'black'}}>{data[3].author}</Text>
                </View>
        </View>
        <View style={styles.usercontainer}>
                <Image source={{uri:data[4].imgUrl}} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'black'}}>{data[4].title}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'black'}}>{data[4].author}</Text>
                </View>
        </View>
    </View>
  )
 };
  
  const styles = StyleSheet.create({
    usercontainer:{
        display:"flex",
        flexDirection:"row",
        // borderColor:'black',
        // borderWidth:1,0
        margin:10,
        backgroundColor:'white',
        borderRadius:10,
        color:'black',
      },
    profileImg:{
        width:100,
        height:100,
        alignItems: 'center',
        marginStart:12,
        borderColor:'black',
        marginVertical:10,
    },
    })

export default UploadedBooks;