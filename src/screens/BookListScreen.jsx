import React from "react";
import { View, Pressable } from "react-native";
import Animated, {
  interpolate,
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedProps,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import * as Haptics from "expo-haptics";

import Text from "../components/Text";
import BookList from "../components/BookList";
import { useBooksState } from "../BookStore";

const studies = require("../anims/landscape.json");

const LottieViewAnimated = Animated.createAnimatedComponent(LottieView);

// Get morning, afternoon, evening
const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return "Good Morning";
  }
  if (hours >= 12 && hours <= 17) {
    return "Good Afternoon";
  }
  return "Good Evening";
};

// home screen
function BookListScreen({ navigation }) {
  const { dark, width, colors, margin, navbar, normalize, ios } = useTheme();
  const HEADER = normalize(300, 400);
  const scrollY = useSharedValue(0);
  const loaded = useSharedValue(0);
  // const { books } = useBooksState();
  const books = [
    {
      imageUrl:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1548428073i/39338454._SY75_.jpg",
      bookId: "39338454",
      workId: "60976615",
      bookUrl: "/book/show/39338454-the-bride-test",
      from_search: true,
      from_srp: true,
      qid: "nc2eZs3HOO",
      rank: 1,
      title: "The Bride Test (The Kiss Quotient, #2)",
      bookTitleBare: "The Bride Test",
      numPages: 296,
      avgRating: "3.86",
      ratingsCount: 138837,
      author: {
        id: 17147855,
        name: "Helen Hoang",
        isGoodreadsAuthor: true,
        profileUrl:
          "https://www.goodreads.com/author/show/17147855.Helen_Hoang",
        worksListUrl:
          "https://www.goodreads.com/author/list/17147855.Helen_Hoang",
      },
      kcrPreviewUrl: null,
      description: {
        html: "Khai Diep has no feelings. Well, he feels irritation when people move his things or contentment when ledgers balance down to the penny, but not big, important emotions—like gr…",
        truncated: true,
        fullContentUrl:
          "https://www.goodreads.com/book/show/39338454-the-bride-test",
      },
    },
    {
      imageUrl:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1364166270i/12391521._SX50_.jpg",
      bookId: "12391521",
      workId: "14262366",
      bookUrl: "/book/show/12391521-the-psychopath-test",
      from_search: true,
      from_srp: true,
      qid: "nc2eZs3HOO",
      rank: 2,
      title: "The Psychopath Test: A Journey Through the Madness Industry",
      bookTitleBare:
        "The Psychopath Test: A Journey Through the Madness Industry",
      numPages: 275,
      avgRating: "3.95",
      ratingsCount: 140889,
      author: {
        id: 1218,
        name: "Jon Ronson",
        isGoodreadsAuthor: false,
        profileUrl: "https://www.goodreads.com/author/show/1218.Jon_Ronson",
        worksListUrl: "https://www.goodreads.com/author/list/1218.Jon_Ronson",
      },
      kcrPreviewUrl: null,
      description: {
        html: "In this madcap journey, a bestselling journalist investigates psychopaths and the industry of doctors, scientists, and everyone else who studies them. \u003cbr/\u003e\u003cbr/\u003eThe Psychopath Test is a…",
        truncated: true,
        fullContentUrl:
          "https://www.goodreads.com/book/show/12391521-the-psychopath-test",
      },
    },
    {
      imageUrl:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388205477i/7442._SY75_.jpg",
      bookId: "7442",
      workId: "208153",
      bookUrl: "/book/show/7442.The_Electric_Kool_Aid_Acid_Test",
      from_search: true,
      from_srp: true,
      qid: "nc2eZs3HOO",
      rank: 3,
      title: "The Electric Kool-Aid Acid Test",
      bookTitleBare: "The Electric Kool-Aid Acid Test",
      numPages: 416,
      avgRating: "3.92",
      ratingsCount: 73280,
      author: {
        id: 3083854,
        name: "Tom Wolfe",
        isGoodreadsAuthor: false,
        profileUrl: "https://www.goodreads.com/author/show/3083854.Tom_Wolfe",
        worksListUrl: "https://www.goodreads.com/author/list/3083854.Tom_Wolfe",
      },
      kcrPreviewUrl: null,
      description: {
        html: "Tom Wolfe\u0026apos;s much-discussed kaleidoscopic non-fiction novel chronicles the tale of novelist Ken Kesey and his band of Merry Pranksters. In the 1960s, Kesey led a group of psych…",
        truncated: true,
        fullContentUrl:
          "https://www.goodreads.com/book/show/7442.The_Electric_Kool_Aid_Acid_Test",
      },
    },
    {
      imageUrl:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1363452191i/13326831._SY75_.jpg",
      bookId: "13326831",
      workId: "18534001",
      bookUrl: "/book/show/13326831-the-testing",
      from_search: true,
      from_srp: true,
      qid: "nc2eZs3HOO",
      rank: 4,
      title: "The Testing (The Testing, #1)",
      bookTitleBare: "The Testing",
      numPages: 325,
      avgRating: "4.05",
      ratingsCount: 69784,
      author: {
        id: 4027380,
        name: "Joelle Charbonneau",
        isGoodreadsAuthor: false,
        profileUrl:
          "https://www.goodreads.com/author/show/4027380.Joelle_Charbonneau",
        worksListUrl:
          "https://www.goodreads.com/author/list/4027380.Joelle_Charbonneau",
      },
      kcrPreviewUrl: null,
      description: {
        html: "Keep your friends close and your enemies closer. Isn\u0026apos;t that what they say? But how close is too close when they may be one and the same?\u003cbr/\u003e\u003cbr/\u003eThe Seven Stages War left much of the p…",
        truncated: true,
        fullContentUrl:
          "https://www.goodreads.com/book/show/13326831-the-testing",
      },
    },
    {
      imageUrl:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1387217173i/9681214._SY75_.jpg",
      bookId: "9681214",
      workId: "14569146",
      bookUrl: "/book/show/9681214-the-goddess-test",
      from_search: true,
      from_srp: true,
      qid: "nc2eZs3HOO",
      rank: 5,
      title: "The Goddess Test (Goddess Test, #1)",
      bookTitleBare: "The Goddess Test",
      numPages: 293,
      avgRating: "3.80",
      ratingsCount: 57378,
      author: {
        id: 767317,
        name: "Aimee Carter",
        isGoodreadsAuthor: true,
        profileUrl: "https://www.goodreads.com/author/show/767317.Aimee_Carter",
        worksListUrl:
          "https://www.goodreads.com/author/list/767317.Aimee_Carter",
      },
      kcrPreviewUrl: null,
      description: {
        html: "\u003ci\u003eEvery girl who had taken the test has died.\u003c/i\u003e\u003cbr/\u003e\u003cbr/\u003e\u003ci\u003eNow it\u0026apos;s Kate\u0026apos;s turn.\u003c/i\u003e\u003cbr/\u003e\u003cbr/\u003eIt\u0026apos;s always been just Kate and her mom—and her mother is dying. Her last wish? To move back to her childhood ho…",
        truncated: true,
        fullContentUrl:
          "https://www.goodreads.com/book/show/9681214-the-goddess-test",
      },
    },
  ];

  // fade in screen, slowly if light mode is on
  const onLayout = () => {
    loaded.value = withTiming(1, { duration: dark ? 300 : 600 });
  };

  // scrollview handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollY.value = contentOffset.y;
    },
  });

  // go to search screen
  const searchBooks = () => {
    Haptics.selectionAsync();
    navigation.push("BookSearch", { bookList: books });
  };

  // all the styles
  const styles = {
    screen: useAnimatedStyle(() => ({
      flex: 1,
      opacity: loaded.value,
      backgroundColor: colors.card,
    })),
    header: useAnimatedStyle(() => ({
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      paddingTop: navbar,
      position: "absolute",
      alignItems: "center",
      justifyContent: "flex-end",
      backgroundColor: colors.background,
      height: interpolate(
        scrollY.value,
        [-HEADER, 0],
        [HEADER * 2, HEADER],
        "clamp"
      ),
      elevation: ios
        ? undefined
        : interpolate(
          scrollY.value,
          [HEADER - navbar, HEADER - navbar + 30],
          [0, 10],
          "clamp"
        ),
      shadowOpacity: ios
        ? interpolate(
          scrollY.value,
          [HEADER - navbar, HEADER - navbar + 30],
          [0, 0.75],
          "clamp"
        )
        : undefined,
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER - navbar],
            [0, -HEADER + navbar],
            "clamp"
          ),
        },
      ],
    })),
    logo: useAnimatedStyle(() => ({
      opacity: interpolate(
        scrollY.value,
        [0, HEADER - navbar],
        [1, 0],
        "clamp"
      ),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-HEADER, 0],
            [-HEADER / 2, 0],
            "clamp"
          ),
        },
      ],
    })),
    lottie: {
      top: 5,
      height: "100%",
      opacity: dark ? 0.8 : 1,
    },
    lottieProps: useAnimatedProps(() => ({
      speed: 0.5,
      autoPlay: true,
    })),
    welcomeText: useAnimatedStyle(() => ({
      marginBottom: margin / 2,
      opacity: interpolate(scrollY.value, [0, HEADER - navbar], [1, 0]),
    })),
    searchInput: useAnimatedStyle(() => ({
      borderRadius: 25,
      marginHorizontal: 20,
      paddingHorizontal: margin,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderColor: colors.background,
      marginBottom: interpolate(
        scrollY.value,
        [HEADER - navbar, HEADER - navbar + 30],
        [-25, 6],
        "clamp"
      ),
      height: interpolate(
        scrollY.value,
        [HEADER - navbar, HEADER - navbar + 30],
        [50, 38],
        "clamp"
      ),
      width: interpolate(
        scrollY.value,
        [HEADER - navbar, HEADER - navbar + 30],
        [width - margin * 2, width - margin],
        "clamp"
      ),
      borderWidth: interpolate(
        scrollY.value,
        [HEADER - navbar, HEADER - navbar + 30],
        [1, 0],
        "clamp"
      ),
    })),
    searchIcon: {
      width: 30,
      opacity: 0.3,
    },
    searchText: {
      height: 38,
      width: "100%",
      opacity: 0.25,
      lineHeight: 38,
      fontSize: 15,
    },
    scrollView: {
      paddingTop: HEADER,
    },
  };

  // filter books into their categories
  const reading = books.filter((b) => b.status !== "Reading");
  const completed = books.filter((b) => b.status !== "Completed");
  const wishlist = books.filter((b) => b.status !== "Wishlist");

  // render all the lists
  return (
    <Animated.View onLayout={onLayout} style={styles.screen}>
      <Animated.View style={styles.header}>
        <Animated.View style={styles.logo}>
          <LottieViewAnimated
            source={studies}
            style={styles.lottie}
            animatedProps={styles.lottieProps}
          />
        </Animated.View>
        <Text animated style={styles.welcomeText} center size={20}>
          {getGreeting()}
        </Text>
        <Pressable onPress={searchBooks}>
          <SharedElement id="search">
            <Animated.View size={15} style={styles.searchInput}>
              <View style={styles.searchIcon}>
                <AntDesign color={colors.text} name="search1" size={15} />
              </View>
              <Text style={styles.searchText}>Find your next book...</Text>
            </Animated.View>
          </SharedElement>
        </Pressable>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        contentContainerStyle={styles.scrollView}
      >
        <BookList books={reading} title="Reading" />
        <BookList books={completed} title="Completed" />
        <BookList books={wishlist} title="Wishlist" />
      </Animated.ScrollView>
    </Animated.View>
  );
}

export default React.memo(BookListScreen);
