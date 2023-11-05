import React, { useState, useCallback, useEffect } from "react";
import { FlatList, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function YoutubeVideos() {
  const [playing, setPlaying] = useState(false);
  const [shuffledVideoIds, setShuffledVideoIds] = useState([]);
  const videoIds = ["QYcw8QbYj8o", "z_3S2_41_FE", "qvaJfRtrJxg", "EtpwOvjCNEI", "UNMrwudowfg", "1dWqQirbsK4", "rZKrzK5hZcc", "6oQFWCDI4EM", "1N6hbRbyAeQ", "5qylcQJ03AA",
  "oOiz_4t4KVg", "5qylcQJ03AA", "nDH2RBqwi7U", "a4zsFPNwPfs", "KasX2xTCkOA", "keAAQIst2VM", "lpPk3xVqLTM", "CG8VkXvBAHw", "pCaOLQAq9KQ", "oOiz_4t4KVg",
  "gjJ99pmiM1o"
  ];

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    setShuffledVideoIds(shuffleArray(videoIds));
  }, []);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const renderVideo = ({ item, index }) => (
    <View key={index} style={{ marginRight: 10 }}>
      <YoutubePlayer
        width={250}
        height={200}
        play={playing}
        videoId={item}
        onChangeState={onStateChange}
      />
    </View>
  );

  return (
    <FlatList
      horizontal
      data={shuffledVideoIds}
      renderItem={renderVideo}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}