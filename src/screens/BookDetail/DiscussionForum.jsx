import React, { useEffect, useState, useRef } from "react";
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
  } from "react-native";
  import axios from "axios";
  import { BASE_URL } from "@env";



  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  


const DiscussionForum=({route,navigation})=>{
  const [data,setData]=useState({
    title: "",
    author:"",
  })
  const [commentText, setCommentText]=useState({
    bookId:route.params.id,
    content:'',
  });
  const [comments,setComments]=useState([]);

  useEffect(() => {
    fetchBookdetails(route.params.id);
    console.log(route.params.id);
    fetchComments();
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
          setData({
            title: response.data.book.title,
            author: response.data.book.author,
          });
        })
        .catch(function (error) {
          console.log("Unable to show Book here", error);
        });
    } catch (error) {
      console.log("Unable to show Book", error);
    }
  };

  const handleSubmit = async () => {

    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/add-comment`,
      headers: {},
      // body: JSON.stringify({
      //   data:{
      //     content: commentText,
      //   }
        
      // }),
    };

    try {
      const response=await axios.post(config.url,commentText)
          console.log("response", response.data);
                  
    } catch (error) {
      console.log(commentText);
      console.error('Error in comment:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://example.com/api/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const renderComment = ({ item }) => (
    <View>
      <Text>Book ID: {item.bookId}</Text>
      <Text>Comment: {item.content}</Text>
    </View>
  );


  return (
    <View style={{flex:1,justifyContent:'space-between',flexDirection:"column"}}>
        <View style={styles.container}>
            <Text style={{marginLeft:15,fontSize:24,fontWeight:'600'}}>Discussion Forum</Text>
            <Text style={{marginLeft:15,fontSize:18,fontWeight:'600',color:'grey'}}>{data.title}</Text>
        </View>
        {/* <View>
          <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
          />
        </View> */}
        <View style={styles.commentSection}>
        <TextInput placeholder="type comment here ..." onChangeText={(text)=>setCommentText({...commentText,content:text})} value={commentText.content} style={{width:'80%',marginLeft:20}}/>
        <Text style={{marginRight:10,fontWeight:'600'}} onPress={handleSubmit}>Send</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:100,
    flexDirection:"column",
    borderBottomWidth:0.5,
    borderBottomColor:'#8e8e8e',
    alignItems:'flex-start',
    paddingTop:30
  },
  commentSection:{
    width:'100%',
    height:60,
    position:'absolute',
    bottom:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#fff',
  }
  
});

export default DiscussionForum;
