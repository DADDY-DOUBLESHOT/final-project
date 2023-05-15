import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal
} from "react-native";
import axios from "axios";
import PDFReader from "rn-pdf-reader-js";
import WebView from "react-native-webview";
// import Animated, {
//     interpolate, withTiming, runOnJS,
//     useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, useAnimatedScrollHandler,
//   } from 'react-native-reanimated';
import "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons'; 
// import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import {MaterialIcons} from '@expo/vector-icons';
import { BASE_URL } from "@env";
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


// const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />


// const PdfReader=({pdfUrl})=>(
//   <WebView
//   javaScriptEnabled={true}
//   source={{uri:pdfUrl}}
//   scalesPageToFit={true}
//   style={{ flex: 1,height:screenHeight-100,width:screenWidth }}
// />
// )


const ReadBook = ({ route, navigation }) => {
  const uri=route.params.pdfUrl; 
  const [data, setData] = useState({
    title: "",
    author: "",
    coverImg: null,
    description: "",
    pdfUrl: "",
  });
  // const [selectedValue, setSelectedValue] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchBookdetails(route.params.id);
  }, []);

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
          // console.log("response is", response.data);
          setData({
            title: response.data.book.title,
            author: response.data.book.author,
            coverImg: response.data.book.coverImg,
            description: response.data.book.description,
            pdfUrl: response.data.book.pdfUrl,
          });
          console.log("pdf:",response.data.book.pdfUrl)
        })
        .catch(function (error) {
          console.log("Unable to show Book", error);
        });
    } catch (error) {
      console.log("Unable to show Book", error);
    }
  };


  return (
    // <View style={{
    //       flex: 1,
    //       justifyContent: "flex-start",
    //       alignItems: "center",
    //       marginHorizontal: 10,
    //       marginVertical:100
    //     }}>
    //    {data.pdfUrl && <PdfReader url={data.pdfUrl} />}
    // </View>
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: 10,
      }}
    >
      {/* <FontAwesome5 name="headphones-alt" size={24} color="black" /> */}
      <View style={styles.pdfstyle}>
        <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"white"}}>
            <Ionicons name="arrow-back" size={24} color="black" style={{ marginTop: 30,marginHorizontal:5,marginVertical:20}} onPress={()=>{navigation.goBack()}}/>
            <Text style={{ fontSize: 18, fontWeight: "500", marginTop: 30,color:"black",marginVertical:20}}>
              {data.title}
            </Text>

            <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="md-menu-outline" size={24} color="black" style={{ marginTop: 30,marginHorizontal:5,marginVertical:20}} />
              </TouchableOpacity>
              <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={{  justifyContent:'flex-end',width:100,margin:5,marginTop:55,alignSelf:"flex-end"}}>
                  <View style={{ backgroundColor: '#F0F0F0', padding: 15, opacity:0.95}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:2}}><FontAwesome5 name="headphones-alt" size={20} color="black"  style={{marginHorizontal:2}}/><Text style={{fontWeight:"800",marginLeft:4}}>Listen</Text></View>
                    
                    <View  style={{flexDirection:"row",justifyContent:"space-between",marginTop:8}}><FontAwesome name="pause" size={20} color="black"  style={{marginHorizontal:2}}/><Text style={{fontWeight:"800",marginLeft:4}}>Pause</Text></View>

                    <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:8}}><FontAwesome name="stop" size={20} color="black" style={{marginHorizontal:2}}/><Text style={{fontWeight:"800",marginRight:5}}>Stop</Text></View>
                    
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:8}}>
                      <FontAwesome name="close" size={20} color="black" style={{marginHorizontal:2}}/><Text style={{fontWeight:"800",marginLeft:8}}>Close</Text>
                      </View> 
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              </>
        </View>
        {/* <PdfReader url="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"/> */}
        <PDFReader
          source={{
            uri: "https://api.printnode.com/static/test/pdf/multipage.pdf",
            // "https://ictactjournals.in/upload/Journal-Template.pdf"
            // uri: data.pdfUrl
            // 
            // data.pdfUrl
          }}
          style={styles.pdfstyle}
          withPinchZoom="True"
          onError={(error)=>{console.log("error:",error)}}
          customStyle={{
            readerContainerDocument:{
               backgroundColor:"#554994",
               height:screenHeight-120,
               marginTop:30,   
            },
            readerContainerNumbers:{
              backgroundColor:"#554994",
              marginBottom:50,
              paddingTop:20,
              fontSize:30
            },
            readerContainerNavigate:{
                backgroundColor:"#554994",
                marginBottom:50,
            },
            readerContainerNavigateArrow:{
                 height:50,
                 width:50,
                 borderRadius:25,
                 backgroundColor:"grey",
                //  marginVertical:20,
                //  alignItems:"center"
            },
            readerContainerZoomContainer:{
               marginBottom:150
            },
            readerContainerNumbersContent:{
              fontSize:18,
              height:25
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pdfstyle: {
    flex: 1,
    height: screenHeight,
    // marginVertical: 40,
    backgroundColor: "black",
    // marginHorizontal:20,
    width: screenWidth,
  },
  // container: {
  //   position: 'absolute',
  //   top: 16,
  //   right: 16,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // label: {
  //   marginRight: 8,
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  // picker: {
  //   width: 120,
  // },
  container: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  label: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    width: 120,
    // marginTop:50,
    backgroundColor:"grey",
    hieght:50
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
  },
});

export default ReadBook;



{
  /* <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}> */
}
{
  /* <Pdf  trustAllCerts={false}
          source={{
            uri: 'https://api.printnode.com/static/test/pdf/multipage.pdf',
          }}
          page={1}
          minScale={0.5}
          maxScale={3.0}
          renderActivityIndicator={() => (
            <ActivityIndicator color="black" size="large" />
          )}
          enablePaging={true}
        onLoadProgress={(percentage) => console.log(`Loading :${percentage}`)}
        onLoadComplete={() => console.log('Loading Complete')}
        onPageChanged={(page, totalPages) => console.log(`${page}/${totalPages}`)}
        onError={(error) => console.log(error)}
        onPageSingleTap={(page) => alert(page)}
        onPressLink={(link) => Linking.openURL(link)}
        onScaleChanged={(scale) => console.log(scale)}
        // singlePage={true}
        spacing={10}
        // horizontal
        style={{flex: 1, width: Dimensions.get('window').width}}
        /> */
}
{
  /* </View> */
}

{
  /* <View style={styles.pdfstyle}> */
}
{
  /* <PdfReader url="http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"/> */
}
{
  /* <PDFReader
          source={{ uri:"https://api.printnode.com/static/test/pdf/multipage.pdf"
         }}
         style={{flex: 1, width: Dimensions.get('window').width}}
        />
        </View> */
}
//  </View>
