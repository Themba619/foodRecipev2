import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const Posts = () => {
  const data = [
    { id: '1', imageUrl: 'https://reviewed-com-res.cloudinary.com/image/fetch/s--g3NrW89z--/b_white,c_fill,cs_srgb,f_auto,fl_progressive.strip_profile,g_auto,h_547,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1568123038734/Bfast.png', caption: 'Post 1' },
    { id: '2', imageUrl: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/12/Chocolate-Chip-Pancakes.png', caption: 'Post 2' },
    { id: '3', imageUrl: 'https://www.foodandwine.com/thmb/OH220PwOZfcTiwuJzkvLANWHw1w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/egg-bhurjee-FT-RECIPE0521-f9573d8c81bb4c9597a9621c0ac064ae.jpg', caption: 'Post 3' },
    { id: '4', imageUrl: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/11/Homemade-French-Toast-Sticks-500x375.png', caption: 'Post 4' },
  ];

  // const route = useRoute();
  // const posts = route.params;
  // console.log("Posts recieved from postContent to profile screen",posts)

  return (
    <ScrollView contentContainerStyle={styles.postContainer}>
      {data.map((item) => (
        <Image
          key={item.id}
          source={{ uri: item.imageUrl }}
          style={styles.postImage}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    alignItems: 'center',
  },
  postImage: {
    width: 300,
    height: 200,
    margin: 5,
    borderRadius: 15,
  },
});

export default Posts;