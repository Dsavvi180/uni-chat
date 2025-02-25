

document.addEventListener("DOMContentLoaded", () => {
  const player = create_post_attachment_video('./testClip.mp4');
  console.log("Hello");
  // Append the video player to the container with ID 'video-container'
  const container = document.getElementById("video-container");
  if (container) {
    container.innerHTML = "<div>Hello</div>"; // Clear existing content if needed
    container.appendChild(player); // Append the player to the container
  } else {
    console.error("Container with ID 'video-container' not found!");
  }
  display_files_in_preview()
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

  let mute_button = document.createElement("button");
  mute_button.classList.add("mute-button");
  mute_button.type = "button";
  mute_button.onclick = "unmute_video(this)";
  mute_button.setAttribute("sound", "off");

  let sound_button = document.createElement("button");
  sound_button.classList.add("sound-button");
  sound_button.type = "button";
  mute_button.onclick = "mute_video(this)";
  mute_button.setAttribute("sound", "off");

  player.appendChild(v);
  player.appendChild(mute_button);
  player.appendChild(sound_button);

  return player;
}

function display_files_in_preview() {
  var el = this;
  var index_clicked = Array.prototype.indexOf.call(el.parentNode.children, el); // get the index of the child clicked from all the children
  // index = position of the attachment user clicked on in the line of all attachments
  // we fetch it so we open the exact attachment user pressed

  if (el.classList.contains("video-file")) {
    var section = el.parentNode.parentNode;
  } else {
    var section = el.parentNode;
  }

  // preview banner is the full screen view banner
  var preview_banner = document.querySelector(".preview-banner");

  const contents = section.children; // attachments
  for (const child of contents) {
    // if file - make a bit bigger, put into a div and add a download button
    // if image - make full screen
    // if video - make full screen
    if (child.classList.contains("file")) {
      // ...
    } else if (child.classList.contains("images-file-vertical")) {
      // ...
    } else if (child.classList.contains("video-player")) {
      let video_box = document.createElement("div");
      video_box.classList.add("preview-banner-video-box");
      video_box.classList.add("preview-banner-child"); // for animations [move = "true"]

      let video_original = child.children[0];

      let video = document.createElement("video");
      video.autoplay = true;
      video.setAttribute("muted", true);
      video.setAttribute("playsinline", true);
      video.setAttribute("loop", true);
      video.setAttribute("controls", true);
      video.style.borderRadius = "10px";

      let source = document.createElement("source");
      source.src = video_original.src;
      source.type = "video/mp4";

      video.appendChild(source);
      video.load();

      // calculating width and height of video file based on its original dimensions
      let width_original = video_original.offsetWidth;
      let height_original = video_original.offsetHeight;
      let ratio = width_original / height_original;
      let orientation;
      if (ratio > 1.2) {
        // horizontal:
        video.style.minWidth = "90%";
      } else if (ratio < 0.8) {
        // vertical:
        video.style.maxHeight = "90%";
      } else {
        // square-like:
        video.style.minWidth = "60%";
      }

      video_box.appendChild(video);

      preview_banner.appendChild(video_box);
    }
  }
}
