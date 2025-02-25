const NAME = "Damen Savvi";
const YEAR = "UG2";
const FIELD = "Computer Science and Maths";
const UNIVERSITY = "University of Edinburgh";
const PROFILE_PIC = "assets/damenProfile.JPG";

const isIphone = /iPhone/i.test(navigator.userAgent); // Detect iPhone

const sliderComponent = `<div class="slider-content">
                             <div class="placeholder-bar"></div>
                             <img class="profile-img" src=${PROFILE_PIC} alt="Description of Image">
                             <div style="font-weight:bold; font-size:29px;padding-top:3px; ">${NAME}</div>
                             <div class="profile-info">
                                 <div>${YEAR}</div>
                                 <div>${FIELD}</div>
                                 <div style="font-weight:bold;" >${UNIVERSITY}</div>
                             </div>
                             <div class="connection-assets">
                               <div class="qrcode" id="qrcode"></div>
                               ${
                                 isIphone
                                   ? `<div class="apple-wallet">
                                               <img class="slider-img" src="assets/appleWallet.png" alt="Description of Image">
                                             </div>`
                                   : ` <div class="google-wallet">
                                          <img class="slider-img" src="assets/googleWallet.png" alt="Description of Image">
                                       </div>`
                               }
                               
                               
                             </div>
                        <div/>`;
let sliderState = false;
const main = document.getElementById("main");
const container = document.getElementById("container");
const slider = document.createElement("div");
slider.className = "slider";
slider.innerHTML = sliderComponent;

let startY;
let endY;
const swipeThreshold = 100;

document.addEventListener("touchstart", (event) => {
  startY = event.touches[0].clientY;
});
document.addEventListener("touchmove", (event) => {
  endY = event.touches[0].clientY;
});
document.addEventListener("touchend", (event) => {
  let swipeDistance = endY - startY;
  if (-swipeDistance > swipeThreshold && !sliderState && endY > 0) {
    console.log("startY: ", startY);
    console.log("endY: ", endY);
    console.log("Opening slider, this is the swipe distance: ", swipeDistance);
    openSlider();
  }
  if (swipeDistance > swipeThreshold && sliderState && endY > 0) {
    console.log("Closing slider, this is the swipe distance: ", swipeDistance);
    closeSlider();
  }
});

const openSlider = () => {
  if (!sliderState) {
    container.appendChild(slider);
    // main.style.display = "none";
    sliderState = true;

    requestAnimationFrame(() => {
      slider.classList.add("active");

      if (slider.classList.contains("inactive")) {
        slider.classList.remove("inactive");
      }
      setTimeout(() => {
        generateQRCode("https://www.uni-chat.com/");
      }, 100);
    });
  }
};

const closeSlider = () => {
  if (slider) {
    sliderState = false;
    requestAnimationFrame(() => {
      slider.classList.remove("active");
      slider.classList.add("inactive");
    });
    setTimeout(() => {
      slider.remove();
    }, 500);
  }
};
document.getElementById("openSlider").addEventListener("click", openSlider);

function generateQRCode(url) {
  const qrContainer = document.getElementById("qrcode");
  if (!qrContainer) {
    console.error("QR Code container not found.");
    return;
  }

  // Clear existing QR code to prevent duplicates
  qrContainer.innerHTML = "";

  new QRCode(qrContainer, {
    text: url,
    width: 150,
    height: 150,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
}
