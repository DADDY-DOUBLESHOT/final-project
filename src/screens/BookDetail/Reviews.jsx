import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    ImageBackground,
  } from "react-native";
import photo from "../../images/photo.jpg";
import backarrow from "../../images/backarrow.png";
 
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;




const Reviews=({navigation})=>{

    const bookDetails = {
        "_id": "63f504f55012860157ab8c99",
        "book_id": 1,
        "goodreads_book_id": 2767052,
        "best_book_id": 2767052,
        "work_id": 2792775,
        "books_count": 272,
        "isbn": 9780439023480,
        "authors": "Suzanne Collins",
        "original_publication_year": 2008,
        "original_title": "The Hunger Games",
        "title": "The Hunger Games (The Hunger Games, #1)",
        "language_code": "eng",
        "average_rating": 4.34,
        "description": "WINNING MEANS FAME AND FORTUNE.LOSING MEANS CERTAIN DEATH.THE HUNGER GAMES HAVE BEGUN. . . .In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and once girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.Sixteen-year-old Katniss Everdeen regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.",
        "ratings_count": 4780653,
        "work_ratings_count": 4942365,
        "work_text_reviews_count": 155254,
        "ratings_1": 66715,
        "ratings_2": 127936,
        "ratings_3": 560092,
        "ratings_4": 1481305,
        "ratings_5": 2706317,
        "image_url": "https://images.gr-assets.com/books/1447303603m/2767052.jpg",
        "small_image_url": "https://images.gr-assets.com/books/1447303603s/2767052.jpg",
        "ratings": 3.5,
        "numOfReviews": 2,
        "user": "63f4fe97cbf3c8a2d53d6421",
        "reviews": [
            {
                "user": "640a0b6de1cf3e3898724a84",
                "name": "Pratham",
                "rating": 4,
                "comment": "Great product",
                "_id": "6415ede25980c3120df7108f"
            },
            {
                "user": "63ebc185554480c3e6135c4d",
                "name": "Pratham",
                "rating": 3,
                "comment": "Best book ever",
                "_id": "6415ee685980c3120df71099"
            },
            {
              "user": "63ebc185554480c3e6135c4d",
              "name": "Pratham",
              "rating": 3,
              "comment": "Best book ever",
              "_id": "6415ee685980c3120df71099"
            },
            {
              "user": "63ebc185554480c3e6135c4d",
              "name": "Pratham",
              "rating": 3,
              "comment": "Best book ever",
              "_id": "6415ee685980c3120df71099"
            },
            {
              "user": "63ebc185554480c3e6135c4d",
              "name": "Pratham",
              "rating": 3,
              "comment": "Best book ever",
              "_id": "6415ee685980c3120df71099"
            }
        ],
        };

        const goBack = () => {
            navigation.goBack();
        };   

  return (
    <View>
        <View>
          <TouchableOpacity onPress={goBack}>
              <Image source={backarrow} style={styles.closeIcon} />
            </TouchableOpacity>
        </View>
        <Text style={{fontSize:20,marginTop:20,fontWeight:"500",alignSelf:'center'}}>THE HUNGER GAMES</Text>
        <Text style={{alignSelf:'center',fontSize:15}}>Suzanne Collins</Text>
        <ScrollView style={{marginVertical:20,marginHorizontal:10,height:'100%'}}>
            <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'white',width:screenWidth-130}}>
                  
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[0].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[0].comment}</Text>  
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[1].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[2].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
              <View style={styles.usercontainer}>
                <Image source={photo} style={styles.profileImg}/>
                <View style={{display:'flex', flexDirection:"column",
                borderColor:'black',width:screenWidth-130}}>
                  <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[3].name}</Text>
                  <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[1].comment}</Text>
                </View>
              </View>
          </ScrollView>  
    </View>
  )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor:'white',
      color:'white',
      // #FFFBEB,#495579,#263159
    },
    image: {
      width: screenWidth-250,
      height: screenHeight-550,
      marginBottom: 10,
      marginTop:5,
      zIndex:1,
      marginHorizontal:10,
      alignSelf:'center',
      zIndex:1,
      opacity:1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      // marginHorizontal:25,
      marginTop:20,
      color:'white',
      alignItems:'center',
      justifyContent:'center'
    },
    author: {
      fontSize: 16,
      marginBottom: 10,
      // marginHorizontal:28,
      marginTop:1,
      color:'white',
      alignItems:'center',
      justifyContent:'center'
    },
    rating: {
      fontSize: 16,
      marginBottom: 10,
      marginHorizontal:25,
      marginRight:60,
    },
    review: {
      fontSize: 16,
      marginBottom: 10,
      borderWidth:0.2,
      borderColor:'#554994',
      marginHorizontal:22,
      marginVertical:20,
      // height:230,
      width:screenWidth-40,
      borderRadius:5,
      color:'black',
      // backgroundColor:'#554994'
    },
    synopsis: {
      fontSize: 14,
      marginBottom: 20,
      marginVertical:20,
      borderColor:'#554994',
      borderWidth:1,
      width:screenWidth-40,
      marginHorizontal:20,
      height:150,
      borderRadius:5,
      color:'black',
      paddingVertical:5,
      paddingHorizontal:10,
      overflow:"scroll"
    },
    bookmarkIcon: {
      top:5,
      marginTop:25,
      marginRight:8,
      right:10,
      width:20,
      height:30,
      position:'absolute',    
    },
    TextInput:{
      width:screenWidth-110,
      borderWidth:1,
      borderColor:'#554994',
      marginHorizontal:21,
      color:'black',
      padding:10,
    },
    reviewConatiner:{
      display:"flex",
      flexDirection:"row",
      marginHorizontal:4,
      marginBottom:15,
      borderRadius:5
    },
    button:{
     paddingHorizontal:8,
     paddingVertical:20,
     textAlignVertical:'center',
    },
    start:{
      marginTop:30,
      alignItems:'center',
      justifyContent:'center',
      width:"90%",
      height:50,
      paddingVertical:11,
      color:'white',
      textAlign:'center',
      marginBottom:20,
      backgroundColor:"#554994",
      borderRadius:5,
      fontSize:20
    },
    profileImg:{
      width:50,
      height:50,
      borderRadius:100,
      alignItems: 'center',
      marginStart:12,
      borderColor:'black',
      marginTop:10,
    },
    usercontainer:{
      display:"flex",
      flexDirection:"row",
      // borderColor:'black',
      // borderWidth:1,0
      margin:10,
      backgroundColor:'#554994',
      borderRadius:10,
      color:'white',
    },
    closeIcon:{
      top:5,
      marginTop:28,
      left:10,
      width:50,
      height:25,
      position:'absolute',
      tintColor:'#554994',
    },
    pdfstyle:{
      flex: 1,
      height:screenHeight-350,
      backgroundColor:'white',
      margin:10,
      width:screenWidth-100,
    }
  
  });

export default Reviews;