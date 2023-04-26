import React,{useState,useEffect} from 'react';
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
import { BASE_URL } from "@env";
import axios from "axios";
 
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;




const Reviews=({route,navigation})=>{
  // const id=route.params.id;
  // console.log("id is:",route.params.id);
        const [data, setData] = useState({
          title: "",
          author: "",
        });
        const [reviews,getReviews]=useState([]);

        useEffect(() => {
          fetchBookdetails(route.params.id);
          bookReviews(route.params.id);
        }, []);


        //fetch book details
        const fetchBookdetails = async (id) => {
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${BASE_URL}book/${id}`,
            headers: {},
          };

          try {
            await axios(config)
              .then(function (response) {
                console.log("response is", response.data);
                setData({
                  title: response.data.book.title,
                  author: response.data.book.author,
                });
              })
              .catch(function (error) {
                ToastAndroid.show(
                  `Unable to fecth book ${error.message}`,
                  ToastAndroid.SHORT
                  );
                  dispatch(loaderStop());
                  console.log("Unable to show Book", error);
                  navigation.replace("homenavi");
              });
          } catch (error) {
            ToastAndroid.show(
            `Unable to fecth book ${error.message}`,
            ToastAndroid.SHORT
            );
            dispatch(loaderStop());
            console.log("Unable to show Book", error);
            navigation.replace("homenavi");
          }
        };

        //fetch book reviews
        const bookReviews=async(id)=>{
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${BASE_URL}reviews/?id=${id}`,
            headers: {},
          };

        try {
          await axios(config)
            .then(function (response) {  
              getReviews(
                response.data.reviews
              );
              console.log("review response is:",response.data.reviews);
              })
              .catch(function (error) {
                console.log("Unable to fetch reviews", error);
              });
          } catch (error) {
            console.log("Unsuccessful fetching", error);
          }
      };

    
        const goBack = () => {
            navigation.goBack();
        };   

  return (
    <View>
      <View style={{display:"flex"}}>
          <View style={{zIndex:1}}>
            <TouchableOpacity onPress={goBack}  >
              <View style={{backgroundColor:'#E5E4E2',
                borderRadius:50,
                zIndex:-1,borderWidth:1,borderColor:'#E5E4E2', top:5,
                marginTop:18,
                left:10,
                width:40,
                height:40}}>
                <Image source={backarrow} style={styles.closeIcon} />
              </View>
            </TouchableOpacity>
              
          </View>
          <View style={{borderBottomColor:"grey",borderBottomWidth:2,width:"100%",zIndex:-1,margin:0,position:"absolute"}}>
          <Text style={{fontSize:16,marginTop:20,fontWeight:"500",alignSelf:'center',zIndex:1}}>{data.title}</Text>
          <Text style={{alignSelf:'center',fontSize:12,marginBottom:20}}>{data.author}</Text>
          </View>
        </View>
        <ScrollView style={{marginVertical:20,marginHorizontal:10,height:'100%'}}>   
            {reviews.map((review,index)=>(
                   <View style={styles.usercontainer} key={index} >
                   <Image source={photo} style={styles.profileImg} />
                
                   <View
                     style={{
                       display: "flex",
                       flexDirection: "column",
                       borderColor: "white",
                       width: screenWidth - 130,
                     }}
                   >  
                     <Text 
                       style={{ marginStart: 10, marginTop: 10, color: "white" }}>
                       {review.name}
                     </Text>
                     <Text 
                       style={{
                         height: 40,
                         marginStart: 10,
                         paddingVertical: 5,
                         color: "white",
                       }}
                     >
                       {review.comment}
                     </Text>  
                   </View>
                 </View>
            ))
               }   
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
      top:6,
      left:2,
      width:40,
      height:25,
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


            //  <View style={styles.usercontainer}>
            //     <Image source={photo} style={styles.profileImg}/>
            //     <View style={{display:'flex', flexDirection:"column",
            //     borderColor:'white',width:screenWidth-130}}>
                  
            //       <Text style={{marginStart:10,marginTop:10,color:'white'}}>{bookDetails.reviews[0].name}</Text>
            //       <Text style={{height:40,marginStart:10,paddingVertical:5,color:'white'}}>{bookDetails.reviews[0].comment}</Text>  
            //     </View>
            //   </View>