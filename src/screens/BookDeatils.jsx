import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const bookDetails = {
    title: 'Book Title',
    author: 'Book Author',
    rating: 4.5,
    review: 'This is a great book!',
    synopsis: 'This is a synopsis of the book.',
    bookImage: 'https://unsplash.com/photos/xG5VJW-7Bio',
  };

  
const BookDetails = ({ navigation }) => {
  const { title, author, image } = navigation.params;
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.bookDetails, { opacity }]}>
        <Image style={styles.bookImage} source={{ uri: image }} onLoad={fadeIn} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{title}</Text>
          <Text style={styles.bookAuthor}>{author}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF'
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bookImage: {
    width: 250,
    height: 350,
    resizeMode: 'cover'
  },
  bookInfo: {
    marginTop: 20
  },
  bookTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bookAuthor: {
    fontSize: 16,
    textAlign: 'center'
  }
});

export default BookDetails;