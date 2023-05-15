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
    ToastAndroid,
  } from "react-native";
  import axios from "axios";


const handleAddToWishlist = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}whishlist/add`,
      headers: {},
    };
    axios.post(config.url,{bookId:route.params.id})
      .then(response => {
        setWishlist(response.data.wishlist);
        console.log("added to wishlist:",response.data.wishlist)
        setIsBookmarked(true);
      })
      .catch(error => console.error("cannot add to wishlist",error));
  };

  const handleRemoveFromWishlist = () => {
    // let config = {
    //   method: "patch",
    //   maxBodyLength: Infinity,
    //   url: `${BASE_URL}whishlist/remove`,
    //   headers: {},
    // };
    // axios.patch(config.url,id)
    //   .then(response => {
    //     setWishlist(response.data.wishlist);
    //     console.log("removed from wishlist:",response.data.wishlist)
    //     setIsBookmarked(false);
    //   })
    //   .catch(error => console.error("cannot remove from wishlist",error));
    console.log("removed from wishlist");
  };


  const handleBookmarkPress = () => {
    if (isBookmarked) {
      handleRemoveFromWishlist();
    } else {
      handleAddToWishlist();
    }
    setIsBookmarked(!isBookmarked);
  };

  const renderBookmarkIcon = () => {
    if (isBookmarked) {
      return (
        <TouchableOpacity onPress={handleBookmarkPress}>
          <Ionicons name="bookmark" size={24} color="#554994" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={handleBookmarkPress}>
          <Ionicons name="bookmark-outline" size={24} color="#554994" />
        </TouchableOpacity>
      );
    }
  };