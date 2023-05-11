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
  import { Entypo } from '@expo/vector-icons'; 




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
  const [reply,setReply]=useState({
    commentId:'',
    content:'',
  });
  const [showReply, setShowReply] = useState("");
  const [showRepliesForCommentId, setShowRepliesForCommentId] = useState(null);

  useEffect(() => {
    fetchBookdetails(route.params.id);
    // console.log(route.params.id);
    fetchComments(route.params.id);
  }, []);

  
  const fetchBookdetails = async () => {
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

  const fetchComments = async (id) => {
    // 
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${BASE_URL}comments/${id}`,
      headers: {},
    };

    try {
      await axios(config)
        .then(function (response) {
          console.log("comments are:",response.data)
          setComments(response.data);
          console.log("comments  after are:",response.data)
          console.log(response.data[0]._id)
          console.log(response.data[1]._id)
          console.log(response.data[2]._id)
          // console.log(response.data[2].replies[1].content);
        })
        .catch(function (error) {
          console.log("Unable to show comment", error);
        });
    } catch (error) {
      console.log("Unable to show comment here", error);
    }
    console.log(comments);
  };


  const addReply=async()=>{
    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: `${BASE_URL}/add-reply`,
      headers: {},
      data:{
        commentId:showReply,
        content:reply.content
      }
    };

    try {
      const response=await axios.post(config.url,config.data)
      setReply({commentId:'',content:''});
      console.log("reply sent",response.data);
      // console.log("response", response.data.reply);                
    } catch (error) {
      console.log(reply);
      console.log(showReply);
      console.error('Error in reply:', error);
    }
  }  

 

  return (
    <View style={{flex:1,flexDirection:"column"}}>
        <View style={styles.container}>
            <Text style={{marginLeft:15,fontSize:24,fontWeight:'600'}}>Discussion Forum</Text>
            <Text style={{marginLeft:15,fontSize:18,fontWeight:'600',color:'grey'}}>{data.title}</Text>
            
        </View>
        {/* <View style={{height:screenHeight,margin:10,width:screenWidth,position:"absolute",display:"flex",flex:1}}> */}
        <ScrollView  style={{height:screenHeight-120}}>
        {comments.map((comment,index)=>{
          return(
            <View style={styles.usercontainer} key={index}>
              <View style={{
                display: "flex",
                flexDirection: "column",
                borderColor: "black",
                width:"100%"
              }}>
              <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>{comment._id}</Text>
              <Text style={{
                    height: 40,
                    marginStart: 10,
                    paddingVertical: 5,
                    color: "black",
                    }}>{comment.content}
              </Text>
              <Text>{comments.replies}</Text>
                  <TouchableOpacity onPress={()=>setShowReply(showReply===comment._id?"":comment._id)}>
                      <View style={{flexDirection:"row",marginTop:-5,marginVertical:5,marginLeft:280}}>
                        <Entypo name="reply" size={18} color="grey" style={{marginVertical:5,display:"flex"}}/>
                        <Text  style={{borderRadius:20,marginHorizontal:5,color:"grey",marginVertical:5}}>Reply</Text>
                      </View>  
                  </TouchableOpacity>
                  {showReply === comment._id &&(
                    <View style={{height:50,width:screenWidth-50,borderWidth:1,marginHorizontal:10,backgroundColor:"purple",flexDirection:"row",marginVertical:10}}>
                    <TextInput onChangeText={(text)=>{setReply({...reply,content:text})}} value={reply.content} style={{width:'80%',marginLeft:20}}/>
                    <Text style={{fontWeight:'600',marginTop:10}} onPress={()=>addReply(comment._id)}>Send</Text>
                    </View>
                  )
                  }
                  <TouchableOpacity onPress={()=>setShowRepliesForCommentId(showRepliesForCommentId === comment._id ? null : comment._id)}>
                    <View style={{flexDirection:"row",marginTop:-5,marginVertical:5,marginLeft:280}}>
                      <Text  style={{borderRadius:20,marginHorizontal:5,color:"grey",marginVertical:5}}>{comment.replies.length} View</Text>
                    </View>  
                  </TouchableOpacity>
                  {comment._id === showRepliesForCommentId && comment.replies.map((reply)=>(
                    <View style={{marginLeft: 10}}>
                      {/* {comment.replies.map((reply, index) => ( */}
                        <View style={styles.reply}>
                        <View style={{
                          display: "flex",
                          flexDirection: "column",
                          borderColor: "black",
                          width: screenWidth - 50,
                        }}>
                        <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 5</Text>
                        <Text style={{
                              height: 40,
                              marginStart: 10,
                              paddingVertical: 5,
                              color: "black",
                              }}>{reply.content}</Text>
                      </View>
                    </View>
                      {/* // ))} */}
                    </View>)
                  )}
            </View>
            

           </View>
          )
          })
        }
            </ScrollView>
        {/* </View> */}

        {/* <View>
          <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id.toString()}
          />
        </View> */}
       
        {/* <View>
        <ScrollView style={{height:screenHeight-120}}>
           <View style={styles.usercontainer}>
              <View style={{
                display: "flex",
                flexDirection: "column",
                borderColor: "black",
                width:"100%"
              }}>
              <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 1</Text>
              <Text style={{
                    height: 40,
                    marginStart: 10,
                    paddingVertical: 5,
                    color: "black",
                    }}>This is some awesome thinking!</Text>
                    <View style={{flexDirection:"row",marginTop:-5,marginVertical:5,marginLeft:280}}>
                      <Entypo name="reply" size={18} color="grey" style={{marginVertical:5,display:"flex"}}/><Text style={{borderRadius:20,marginHorizontal:5,color:"grey",marginVertical:5}}>Reply</Text>
                    </View>  
            </View>
           </View> */}
           {/* reply */}
                  {/* <View style={styles.reply}>
                      <View style={{
                        display: "flex",
                        flexDirection: "column",
                        borderColor: "black",
                        width: screenWidth - 130,
                      }}>
                      <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 5</Text>
                      <Text style={{
                            height: 40,
                            marginStart: 10,
                            paddingVertical: 5,
                            color: "black",
                            }}>You’ve shown so much growth!</Text>
                    </View>
                  </View>
                  <View style={styles.reply}>
                      <View style={{
                        display: "flex",
                        flexDirection: "column",
                        borderColor: "black",
                        width: screenWidth - 130,
                      }}>
                      <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 8</Text>
                      <Text style={{
                            height: 40,
                            marginStart: 10,
                            paddingVertical: 5,
                            color: "black",
                            }}>What a powerful argument!!</Text>
                    </View>
                  </View>
                  <View style={styles.reply}>
                      <View style={{
                        display: "flex",
                        flexDirection: "column",
                        borderColor: "black",
                        width: screenWidth - 130,
                      }}>
                      <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 6</Text>
                      <Text style={{
                            height: 40,
                            marginStart: 10,
                            paddingVertical: 5,
                            color: "black",
                            }}>This is very perceptive!</Text>
                    </View>
                  </View>
                  


           <View style={styles.usercontainer}>
              <View style={{
                display: "flex",
                flexDirection: "column",
                borderColor: "black",
                width:"100%",
              }}>
              <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 2</Text>
              <Text style={{
                    height: 40,
                    marginStart: 10,
                    paddingVertical: 5,
                    color: "black",
                    }}>Keep up the incredible work!</Text>
               <View style={{flexDirection:"row",marginTop:-5,marginVertical:5,marginLeft:280}}>
                      <Entypo name="reply" size={18} color="grey" style={{marginVertical:5,display:"flex"}}/><Text style={{borderRadius:20,marginHorizontal:5,color:"grey",marginVertical:5}}>Reply</Text>
                </View>  
            </View>
           </View>

           <View style={styles.usercontainer}>
              <View style={{
                display: "flex",
                flexDirection: "column",
                borderColor: "black",
                width: "100%",
              }}>
              <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 6</Text>
              <Text style={{
                    height: 40,
                    marginStart: 10,
                    paddingVertical: 5,
                    color: "black",
                    }}>This is fascinating information!</Text>
                     <View style={{flexDirection:"row",marginTop:-5,marginVertical:5,marginLeft:280}}>
                      <Entypo name="reply" size={18} color="grey" style={{marginVertical:5,display:"flex"}}/><Text style={{borderRadius:20,marginHorizontal:5,color:"grey",marginVertical:5}}>Reply</Text>
                    </View>  
            </View>
           </View> */}
           {/* reply */}
                  {/* <View style={styles.reply}>
                      <View style={{
                        display: "flex",
                        flexDirection: "column",
                        borderColor: "black",
                        width: screenWidth - 130,
                      }}>
                      <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 9</Text>
                      <Text style={{
                            height: 40,
                            marginStart: 10,
                            paddingVertical: 5,
                            color: "black",
                            }}>This is very well thought out!</Text>
                    </View>
                  </View>
                  <View style={styles.reply}>
                      <View style={{
                        display: "flex",
                        flexDirection: "column",
                        borderColor: "black",
                        width: screenWidth - 130,
                      }}>
                      <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 6</Text>
                      <Text style={{
                            height: 40,
                            marginStart: 10,
                            paddingVertical: 5,
                            color: "black",
                            }}>This is very perceptive!</Text>
                    </View>
                  </View>

           <View style={styles.usercontainer}>
              <View style={{
                display: "flex",
                flexDirection: "column",
                borderColor: "black",
                width: "100%",
              }}>
              <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 3</Text>
              <Text style={{
                    height: 40,
                    marginStart: 10,
                    paddingVertical: 5,
                    color: "black",
                    }}>What an astounding observation!</Text>
               <View style={{flexDirection:"row",marginTop:-5,marginVertical:5,marginLeft:280}}>
                      <Entypo name="reply" size={18} color="grey" style={{marginVertical:5,display:"flex"}}/><Text style={{borderRadius:20,marginHorizontal:5,color:"grey",marginVertical:5}}>Reply</Text>
              </View>  
            </View>
           </View>
           
           <View style={styles.usercontainer}>
              <View style={{
                display: "flex",
                flexDirection: "column",
                borderColor: "black",
                width:"100%",
              }}>
              <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 4</Text>
              <Text style={{
                    height: 40,
                    marginStart: 10,
                    paddingVertical: 5,
                    color: "black",
                    }}>This is very well thought out!</Text>
               <View style={{flexDirection:"row",marginTop:-5,marginVertical:5,marginLeft:280}}>
                      <Entypo name="reply" size={18} color="grey" style={{marginVertical:5,display:"flex"}}/><Text style={{borderRadius:20,marginHorizontal:5,color:"grey",marginVertical:5}}>Reply</Text>
                </View>  
            </View>
           </View>

           <View style={styles.usercontainer}>
              <View style={{
                display: "flex",
                flexDirection: "column",
                borderColor: "black",
                width: "100%",
              }}>
              <Text style={{ marginStart: 10, marginTop: 10, color: "black" }}>User 5</Text>
              <Text style={{
                    height: 40,
                    marginStart: 10,
                    paddingVertical: 5,
                    color: "black",
                    }}>This is very well thought out!</Text>
               <View style={{flexDirection:"row",marginTop:-5,marginVertical:5,marginLeft:280}}>
                      <Entypo name="reply" size={18} color="grey" style={{marginVertical:5,display:"flex"}}/><Text style={{borderRadius:20,marginHorizontal:5,color:"grey",marginVertical:5}}>Reply</Text>
               </View>  
            </View>
           </View>
           </ScrollView>
        </View>
       */}
        

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
    backgroundColor: "#CCCCFF",
    borderRadius: 10,
    color: "black",
    borderTopLeftRadius:0,
    borderTopColor:"#554994",
    borderLeftColor:"#554994",
    borderBottomColor:"#E6E6FA",
    borderRightColor:"#E6E6FA",
    borderWidth:0.5
  },
  reply:{
    marginLeft:50,
    display: "flex",
    width:screenWidth-65,
    flexDirection: "row",
    backgroundColor: "#E6E6FA",
    borderRadius: 10,
    color: "black",
    marginRight:10,
    marginTop:10,
    borderTopLeftRadius:0,
    borderBottomColor:"#E6E6FA",
    borderTopColor:"#554994",
    borderLeftColor:"#554994",
    borderRightColor:"#E6E6FA",
    borderWidth:0.5
  }
  
});

export default DiscussionForum;
