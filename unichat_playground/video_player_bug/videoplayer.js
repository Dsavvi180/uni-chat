document.addEventListener("DOMContentLoaded", () => {
  const player = create_post_attachment_video("./testClip.mp4");

  // Append the video player to the container with ID 'video-container'
  const container = document.getElementById("video-container");
  // Apply styles to center the video within the container
  container.style.display = "flex";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.height = "100vh";
  if (container) {
    container.innerHTML = ""; // Clear existing content
    container.appendChild(player); // Append the player to the container
  } else {
    console.error("Container with ID 'video-container' not found!");
  }

  // Attach click event to the video for preview behavior
  player.querySelector("video").addEventListener("click", () => {
    container.innerHTML = "";
    display_files_in_preview(player);
  });
});

function create_post_attachment_video(src) {
  let player = document.createElement("div");
  player.classList.add("video-player");

  let v = document.createElement("video");
  v.autoplay = true;
  v.muted = true;
  v.playsInline = true;
  v.loop = true;
  v.classList.add("video-file");
  v.src = src;

  // Set the size of the video element
  v.style.width = "300px"; // Adjust the width as needed
  v.style.height = "200px"; // Adjust the height as needed
  v.style.objectFit = "cover"; // Ensures the video fills the space properly

  // Create mute button
  let mute_button = document.createElement("button");
  mute_button.classList.add("mute-button");
  mute_button.type = "button";
  mute_button.textContent = "Unmute";
  mute_button.onclick = () => {
    if (v.muted) {
      v.muted = false;
      mute_button.textContent = "Mute";
    } else {
      v.muted = true;
      mute_button.textContent = "Unmute";
    }
  };

  player.appendChild(v);
  player.appendChild(mute_button);

  return player;
}

function display_files_in_preview(player) {
  // Create a preview overlay
  let preview_banner = document.createElement("div");
  preview_banner.classList.add("preview-banner");
  preview_banner.style.position = "fixed";
  preview_banner.style.top = "0";
  preview_banner.style.left = "0";
  preview_banner.style.width = "100%";
  preview_banner.style.height = "100%";
  preview_banner.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  preview_banner.style.display = "flex";
  preview_banner.style.justifyContent = "center";
  preview_banner.style.alignItems = "center";
  preview_banner.style.zIndex = "1000";

  // Create a larger video box
  let video_box = document.createElement("div");
  video_box.style.position = "relative";
  video_box.style.borderRadius = "10px";
  video_box.style.overflow = "hidden";
  video_box.style.width = "65%";
  video_box.style.height = "65%";
  video_box.style.display = "flex";
  video_box.style.justifyContent = "center";
  video_box.style.alignItems = "center";

  let video_original = player.querySelector("video");

  let video = document.createElement("video");
  
  video.src = video_original.src;
  video.autoplay = true;
  video.loop = true;
  video.playsInline = true;
  video.controls = true;
  video.muted = false;

  video.setAttribute("autoplay", false);
  video.setAttribute("muted", false);
  video.setAttribute("playsinline", false);
  video.setAttribute("loop", false);
  video.setAttribute("controls", true);

  video.style.width = "100%";
  video.style.height = "100%";
  video.style.objectFit = "contain";
  video.style.borderRadius = "10px";

  // Add close button
  let close_button = document.createElement("button");
  close_button.textContent = "Close";
  close_button.style.position = "absolute";
  close_button.style.top = "10px";
  close_button.style.right = "10px";
  close_button.style.padding = "10px";
  close_button.style.backgroundColor = "white";
  close_button.style.border = "none";
  close_button.style.borderRadius = "5px";
  close_button.style.cursor = "pointer";
  close_button.onclick = () => {
    document.body.removeChild(preview_banner);
    const container = document.getElementById("video-container");
    const player = create_post_attachment_video("./testClip.mp4");
    // Apply styles to center the video within the container
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.height = "100vh";
    if (container) {
      container.innerHTML = ""; // Clear existing content
      container.appendChild(player); // Append the player to the container
    } else {
      console.error("Container with ID 'video-container' not found!");
    }
    player.querySelector("video").addEventListener("click", () => {
      container.innerHTML = "";
      display_files_in_preview(player);
    });
  };

  video_box.appendChild(video);
  video_box.appendChild(close_button);
  preview_banner.appendChild(video_box);

  document.body.appendChild(preview_banner);
}
