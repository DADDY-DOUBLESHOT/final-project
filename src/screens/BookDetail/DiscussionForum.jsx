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
    FlatList
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
    };

    try {
      const response=await axios.post(config.url,commentText)
      setCommentText('')
      console.log("response", response.data);
                  
    } catch (error) {
      console.log(commentText);
      console.error('Error in comment:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/comments');
      setComments(response.data.comments);
      console.log(response.data);
      console.log(comments.length);
      console.log(response.data.comments[0].id);
      console.log(response.data.comments[0].body);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.usercontainer}>
    <View style={{
      display: "flex",
      flexDirection: "column",
      borderColor: "black",
      width: screenWidth - 130,
    }}>
      <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>Book ID: {item.id}</Text>
      <Text style={{
                   height: 40,
                   marginStart: 10,
                   paddingVertical: 5,
                   color: "black",
                  }}>Comment: {item.body}</Text>
    </View>
    </View>
  );


  return (
    <View style={{flex:1,flexDirection:"column"}}>
        <View style={styles.container}>
            <Text style={{marginLeft:15,fontSize:24,fontWeight:'600'}}>Discussion Forum</Text>
            <Text style={{marginLeft:15,fontSize:18,fontWeight:'600',color:'grey'}}>{data.title}</Text>
            
        </View>
        <View style={{height:screenHeight,margin:10,width:screenWidth,position:"absolute",display:"flex",flex:1}}>
        {/* {comments.map((comment,index)=>{
                <View key={index}>
                  <Text style={styles.comment}>Book ID:{comment.id}</Text>
                  <Text style={styles.comment}>Comment:{comment.body}</Text>
                  <View style={styles.usercontainer}>
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
                          {comment.id}
                        </Text>
                        <Text
                          style={{
                            height: 40,
                            marginStart: 10,
                            paddingVertical: 5,
                            color: "white",
                          }}
                        >
                        {comment.body}
                        </Text>  
                      </View>
                   </View>
                </View>
                console.log(comment.id);
                console.log(comment.body);
             })
            } */}
        </View>

        <View>
          <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.commentSection}>
        <TextInput placeholder="type comment here ..." onChangeText={(text)=>{setCommentText({...commentText,content:text})}} value={commentText.content}  style={{width:'80%',marginLeft:20}}/>
        <Text style={{marginRight:30,fontWeight:'600'}} onPress={handleSubmit}>Send</Text>
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
  },
  comment:{
    fontSize:14,
    backgroundColor:'grey',
    color:'black',
    borderWidth:2,
    borderRadius:5,
    height:50,
    // width:"50%",
  },
  usercontainer: {
    display: "flex",
    flexDirection: "row",
    // borderColor:'black',
    // borderWidth:1,0
    margin: 10,
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    color: "black",
  },
  
});

export default DiscussionForum;
