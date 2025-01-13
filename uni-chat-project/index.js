// Configure development mode, API endpoint, and post ID
isDevelopment = true; // Set to true to use test data
API = "https://www.uni-chat.com";
POST_ID = "johnhes61864be28ca33a3d";
const url = `${API}/server/getCapturePost`;
const formData = new FormData();
formData.append("post_id", POST_ID);

document.addEventListener("DOMContentLoaded", () => {
  populateContainer();
});

// Makes a POST request to the provided API endpoint and ideally receives a response with data which is used to populate the html post component
function populateContainer() {
  postReq(url, formData)
    .then((response) => {
      console.log("Response: ", response);
      if (response.headers.get("content-type")?.includes("application/json")) {
        return response.json();
      } else {
        throw Error("Could not parse response from fetch query");
      }
    })
    .then((data) => {
      document.getElementById("post-container").innerHTML = post(data);
    })
    .catch((error) => {
      if (!isDevelopment) {
        if (error instanceof TypeError) {
          console.log("CORS restrictions preventing fetch from server.");
        } else {
          console.log("Error upon fetch query: ", error);
        }
        // Displays a loading widget and error message if the fetch query is unsuccessful
        document.getElementById("post-container").innerHTML = loadingWidget;
      } else {
        //Uses test data if in development mode
        document.getElementById("post-container").innerHTML = post(testData);
      }
    });
}

async function postReq(url, formData) {
  let link = url;
  return await fetch(link, {
    method: "POST",
    body: formData,
  });
}
// Calculates the elapsed time since the date the post from the fetch request was posted, returns a string "X days and Y hours ago
function calculateElapsedTime(time_stamp) {
  const postedDate = new Date(time_stamp);
  const currentDate = new Date();
  const elapsedTime_ms = (currentDate - postedDate) / 3600000;
  const elapsedTimeDays = Math.floor(elapsedTime_ms / 24);
  const elapsedTimeHours = Math.floor(elapsedTime_ms % 24);
  return elapsedTimeDays != 0
    ? `${elapsedTimeDays} days and ${elapsedTimeHours}h ago`
    : `${elapsedTimeHours}h`;
}

// Returns the image URIs from the fetch query in an array
const destructureAttachments = (attachmentsList) => {
  const numAttachements = attachmentsList.length;
  if (numAttachements === 1) return [attachmentsList[0].uri];
  if (numAttachements > 1) {
    return attachmentsList.map((attachment) => attachment.uri);
  }
  return [];
};
// Dynamically generates the HTML for a post
const post = (data) => `<div class="post-card">
        <div class="card-profile">
          <div class="profile-icon">
            <img
              class="profile-icon-img"
              src=${data.user_media_uri}
              alt="User profile icon"
              width="55"
              height="55"
            />
          </div>
          <div class="user-info">
            <div class="user-info-caption">
              <div class="name"><h3>${data.user_name}</h3></div>

              <span style="font-size: 8px">&#9675;</span>

              <div class="activity"><h5>${calculateElapsedTime(
                data.datetime_posted
              )}</h5></div>
            </div>
            <div class="degree-info">
              <p>${data.user_year} ${data.user_field} (${
  data.user_university
})</p>
            </div>
          </div>
        </div>
        <div class="card-caption" style="margin-top: 10px; margin-bottom: 10px">
          ${testData.text_posted}
        </div>
        <div class="card-img-section">
          <p style="font-size: 13px; color: rgb(114, 113, 113)">
            ${testData.attachments.length} attachment${
  testData.attachments.length > 1 ? `(s)` : ``
}
          </p>
          <div class="img-scroll">
          ${destructureAttachments(testData.attachments)
            .map(
              (uri) =>
                `<img
              class="img"
              src="${uri}"
              alt="Image from Uni-Chat"
            />`
            )
            .join("")}
          </div>
        </div>
      </div>`;

const loadingWidget = `<div class='loading-widget'><div class="spinner"></div><h1>Cannot fetch</h1></div>`;

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
      id: "emailImage.jpg",
    },
  ],
  user_name: "John Hesseltine",
  user_university: "Heriot-Watt University",
  user_year: "UG3",
  user_field: "Computer Science",
  user_media_uri: "https://www.uni-chat.com/css/media/randomProfilePic.jpg",
};
