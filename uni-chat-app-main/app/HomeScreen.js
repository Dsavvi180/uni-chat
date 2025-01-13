import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { parseISO } from "date-fns";

API = ``;
isDevelopment = true;
POST_ID = "johnhes61864be28ca33a3d";
export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = `${API}/server/getCapturePost`;
        const formData = new FormData();
        formData.append("post_id", POST_ID);
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the response
        // Your code goes here: Handle the data
        return data;
      } catch (error) {
        if (!isDevelopment) {
          console.error(error);
          alert("Something went wrong. Please try again!");
        }
        return null;
      }
    };
    fetchPost().then((data) => {
      if (data) setIsLoading(false);
      setData(data);
    });
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading && !isDevelopment ? (
        <LoadingWidget />
      ) : (
        <PostCard details={responseData || testData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: 15,
    width: "88%",
    height: "65%",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5, // Required for Android shadow
    padding: 15,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 4,
  },
  caption: { fontSize: 18, paddingLeft: 3, paddingTop: 5 },
  attachmentsContainer: { display: "flex", flexDirection: "column", gap: 2 },
  scrollbar: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    overflow: "auto",
  },
  image: {
    width: 210,
    height: 320,
    resizeMode: "cover",
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
// Displays main post component with data received as props
const PostCard = (details) => {
  const headerHeight = useHeaderHeight() + 100; //dynamically adjust post's marginTop if header is added
  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      <View style={styles.profile}>
        <Image
          source={{ uri: details.details?.user_media_uri }}
          style={{ width: 70, height: 70, resizeMode: "cover" }}
        />
        <View style={styles.profileInfo}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 500 }}>
              John Hesseltine
            </Text>
            <Text style={{ fontSize: 6 }}>&#9675;</Text>
            <Text style={{ fontSize: 13, color: "rgb(114, 113, 113)" }}>
              {calculateElapsedTime(details.details.datetime_posted)}
            </Text>
          </View>
          <Text>
            {details.details.user_year} {details.details.user_field}
          </Text>
          <Text>({details.details.user_university})</Text>
        </View>
      </View>
      <View>
        <Text style={styles.caption}>{details.details.text_posted}</Text>
      </View>
      <Text style={{ color: "rgb(114, 113, 113)", marginBottom: -6 }}>
        {" "}
        {testData.attachments.length} attachment
        {testData.attachments.length > 1 ? `(s)` : ``}
      </Text>
      <ScrollView
        contentContainerStyle={styles.scrollbar}
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        horizontal
      >
        {destructureAttachments(details.details.attachments).map(
          ({ uri, id }) => (
            <Image source={{ uri: uri }} style={styles.image} key={id} />
          )
        )}
      </ScrollView>
    </View>
  );
};
const LoadingWidget = () => (
  <View style={styles.spinner}>
    <ActivityIndicator size="large" color="#0038FF" />
  </View>
);
// Calculates the elapsed time since the date the post from the fetch request was posted, returns a string "X days and Y hours ago
function calculateElapsedTime(time_stamp) {
  const datetimePosted = time_stamp.replace(" ", "T");
  const postedDate = parseISO(datetimePosted);
  const currentDate = new Date();
  const elapsedTime_ms = (currentDate - postedDate) / 3600000;
  const elapsedTimeDays = Math.floor(elapsedTime_ms / 24);
  const elapsedTimeHours = Math.floor(elapsedTime_ms % 24);
  return elapsedTimeDays != 0
    ? `${elapsedTimeDays} days ago`
    : `${elapsedTimeHours}h`;
}
// Returns the image URIs from the fetch query in an array
const destructureAttachments = (attachmentsList) => {
  const numAttachements = attachmentsList.length;
  if (numAttachements === 1)
    return [{ uri: attachmentsList[0].uri, id: attachmentsList[0].id }];
  if (numAttachements > 1) {
    return attachmentsList.map((attachment) => ({
      uri: attachment.uri,
      id: attachment.id,
    }));
  }
  return [];
};

// Test data JSON object as mock data that would be returned from the API for testing purposes
const testData = {
  post_id: "johnhes61864be28ca33a3d",
  username: "johnhes",
  text_posted: "Post text",
  datetime_posted: "2023-07-24 08:31:24.34+01",
  attachments: [
    {
      uri: "https://www.uni-chat.com/css/media/blog-3/the-ventoux-1.jpg",
      type: "image",
      id: "emailImage.jpg",
    },
    {
      uri: "https://www.uni-chat.com/css/media/emailImage.jpg",
      type: "image",
      id: "emailImage2.jpg",
    },
  ],
  user_name: "John Hesseltine",
  user_university: "Heriot-Watt University",
  user_year: "UG3",
  user_field: "Computer Science",
  user_media_uri: "https://www.uni-chat.com/css/media/randomProfilePic.jpg",
};
