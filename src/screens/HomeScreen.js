import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RecommendedRecipes from '../components/RecommendedRecipes';
import YoutubeVideos from '../components/YoutubeVideos';

const HomeScreen = () => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // Load user posts from storage or an API
    // Example: setUserPosts([...loadedUserPosts]);
  }, []);

  const foodOptions = [
    'All',
    'Pasta',
    'Pizza',
    'Burger',
    'Salad',
    // Add more food options
  ];

  const [trendingVideos, setTrendingVideos] = useState([
    { id: 1, title: 'Spaghetti Carbonara', chef: 'Chef John', time: '20 min', likes: 0 },
    { id: 2, title: 'Homemade Sushi', chef: 'Chef Jane', time: '30 min', likes: 0 },
    { id: 3, title: 'Mango Smoothie', chef: 'Chef Mary', time: '10 min', likes: 0 },
    // Add more trending videos
  ]);

  const popularCreators = [
    'Creator1',
    'Creator2',
    'Creator3',
    'Creator4',
    // Add more popular creators
  ];

  const toggleLike = (item, section) => {
    if (section === 'trendingVideos') {
      setTrendingVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === item.id
            ? { ...video, likes: item.liked ? video.likes - 1 : video.likes + 1, liked: !item.liked }
            : video
        )
      );
    } else if (section === 'userPosts') {
      setUserPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === item.id
            ? { ...post, likes: item.liked ? post.likes - 1 : post.likes + 1, liked: !item.liked }
            : post
        )
      );
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 20}}>Find the best recipes for cooking</Text>
      {/* Section 1: Search Bar */}
      {/*<TextInput style={styles.searchBar} placeholder="Search for recipes" />

      { Section 2: Food Options }
      <ScrollView horizontal style={styles.foodOptions}>
        {foodOptions.map((food, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.foodOption,
              selectedFood === food && styles.selectedFoodOption,
            ]}
            onPress={() => setSelectedFood(food)}
          >
            <Text
              style={[
                styles.foodOptionText,
                selectedFood === food && styles.selectedFoodOptionText,
              ]}
            >
              {food}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>*/}

      {/* Section 3: Trending Food Videos */}
      <View style={styles.trendingSection}>
        <YoutubeVideos/>
        {/*<Text style={styles.trendingTitle}>
          Trending Now{' '}
          <Text role="img" aria-label="Fire emoji">
            🔥
          </Text>
        </Text>
        <FlatList
          data={trendingVideos}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.trendingVideo}>
              <Image source={{ uri: 'video_thumbnail_url' }} style={styles.videoThumbnail} />
              <Text style={styles.videoTitle}>{item.title}</Text>
              <Text style={styles.videoChef}>Chef: {item.chef}</Text>
              <Text style={styles.videoTime}>Cooking Time: {item.time}</Text>
              <TouchableOpacity
                onPress={() => toggleLike(item, 'trendingVideos')}
                style={styles.likeButton}
              >
                <Icon
                  name={item.liked ? 'thumbs-up' : 'thumbs-o-up'}
                  size={24}
                  color={item.liked ? 'blue' : 'gray'}
                />
                <Text>{item.likes}</Text>
              </TouchableOpacity>
            </View>
          )}
          />*/}
      </View>

      {/* Section 4: User Food Posts */}
      <View style={styles.userPostsSection}>
        <Text style={styles.userPostsTitle}>Recent Recipes</Text>
        <RecommendedRecipes/>
        {/*<FlatList
          data={userPosts}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userPost}>
              <Image source={{ uri: item.image }} style={styles.userPostImage} />
              <Text style={styles.userPostUsername}>{item.username}</Text>
              <Text style={styles.userPostRecipeTitle}>{item.recipeTitle}</Text>
              <Text style={styles.userPostCookingTime}>Cooking Time: {item.cookingTime}</Text>
              <TouchableOpacity
                onPress={() => toggleLike(item, 'userPosts')}
                style={styles.likeButton}
              >
                <Icon
                  name={item.liked ? 'thumbs-up' : 'thumbs-o-up'}
                  size={24}
                  color={item.liked ? 'green' : 'gray'}
                />
                <Text>{item.likes}</Text>
              </TouchableOpacity>
            </View>
          )}
          />*/}
      </View>

      {/* Section 5: Popular Creators */}
      {/*<Text style={styles.popularCreatorsTitle}>Popular Creators</Text>
      <ScrollView horizontal style={styles.popularCreators}>
        {popularCreators.map((creator, index) => (
          <View style={styles.circularProfile} key={index}>
            <Text style={styles.popularCreatorText}>{creator}</Text>
          </View>
        ))}
        </ScrollView>*/}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#e3e3e3'
  },
  foodOptions: {
    marginBottom: 10,
    marginTop: 30

  },
  foodOption: {
    padding: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    
  },
  selectedFoodOption: {
    backgroundColor: 'green',
  },
  foodOptionText: {
    fontSize: 16,
    color: 'green'
  },
  selectedFoodOptionText: {
    color: 'white',
  },
  trendingSection: {
    marginTop: 10 
  },
  trendingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  trendingVideo: {
    marginRight: 10,
  },
  videoThumbnail: {
    width: 150,
    height: 100,
    borderRadius: 5,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoChef: {
    fontSize: 14,
  },
  videoTime: {
    fontSize: 14,
  },
  userPostsSection: {
    marginBottom: 10,
  },
  userPostsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userPost: {
    marginRight: 10,
  },
  userPostImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  userPostUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userPostRecipeTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  userPostCookingTime: {
    fontSize: 14,
    textAlign: 'center',
  },
  likeButton: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularCreatorsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popularCreators: {
    marginBottom: 10,
  },
  circularProfile: {
    width: 80,
    height: 80,
    backgroundColor: 'lightgray',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  popularCreatorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;