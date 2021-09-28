import React, { useState, useCallback } from "react";
import { View, Text, Image } from "react-native";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";

export default function Comment({ data }) {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };
  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
  const validateURL = (url) => {
    if (url.includes("gravatar")) {
      const gravatarURL = url.slice(1);
      return gravatarURL;
    }
    return `https://image.tmdb.org/t/p/w200${url}`;
  };
  return (
    <View
      style={{
        paddingVertical: 10,
        marginVertical: 10,
        backgroundColor: "#CECFD1",
        borderRadius: 10,
        paddingHorizontal: 10,
      }}
      key={data.id}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          progressiveRenderingEnabled
          source={{
            uri: data.author_details.avatar_path
              ? validateURL(data.author_details.avatar_path)
              : "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon",
          }}
          defaultSource={{
            uri: "http://www.gravatar.com/avatar/3b3be63a4c2a439b013787725dfce802?d=identicon",
          }}
          style={{
            width: 25,
            height: 25,
            borderRadius: 50,
            resizeMode: "contain",
            marginRight: 5,
          }}
        />
        <Text style={{ color: "#fff1f5", fontFamily: FONTS.BOLD }}>
          {data.author_details.username}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          marginTop: 8,
          paddingVertical: 9,
          paddingHorizontal: 8,
        }}
      >
        <Text
          style={{
            color: COLORS.LIGHT_GRAY,
          }}
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 4}
        >
          {data.content}
        </Text>

        {lengthMore ? (
          <Text
            onPress={toggleNumberOfLines}
            style={{ lineHeight: 21, marginTop: 10, color: "#08EBF7" }}
          >
            {textShown ? "Read less..." : "Read more..."}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
