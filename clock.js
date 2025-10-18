document.addEventListener("readystatechange", function (event) {
  //* get all element
  const canvas = document.getElementById("myCanvas");
  const videoOut = document.getElementById("result-media");
  const controlContainer = document.getElementById("control");
  const showVideoBtn = controlContainer.querySelector("#video-toggle");
  const PIPBtn = controlContainer.querySelector("#video-pip");
  let showVideo = false;

  //* Controll handler
  const stream = canvas.captureStream(40);
  videoOut.srcObject = stream;
  videoOut.style.display = "none";

  PIPBtn.addEventListener("click", async function () {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoOut.requestPictureInPicture();
      }
    } catch (error) {
      // alert("PiP gagal, cek console untuk lebih detail");
      console.error('PiP Failed' + error);
    }
  });
  showVideoBtn.addEventListener("click", function () {
    // alert("ini show ");
    showVideo = !showVideo;
    if (showVideo) {
      videoOut.style.display = "block";
    } else {
      videoOut.style.display = "none";
    }
  });

  //* Initial
  const TIME_INTERVAL = 1000; // 1 Detik
  const width = canvas.width;
  const heigth = canvas.height;
  const dateFormat = Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  });
  const timerFormat = Intl.DateTimeFormat("en-US", {
    timeStyle: "medium",
    hour12: false,
  });

  const ctx = canvas.getContext("2d");
  ctx.font = "24px serif";

  // ctx.fillText("Hello world", 50, 50)

  function start() {
    //* Clear before write new
    ctx.clearRect(0, 0, width, heigth);

    //* initial date
    const now = new Date();

    ctx.font = "70px 'DG', sans-serif";
    // ctx.fillStyle = "#000000ff";
    ctx.fillStyle = "#1ac41aff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(timerFormat.format(now), width / 2, heigth / 2);
    drawText(dateFormat.format(now));
    drawText("hour");
    drawText("minute");
    drawText("second");
    console.log(timerFormat.format(now));
    // console.log({x: width, y: heigth})
  }

  function drawText(text) {
    let lowered = String(text).toLowerCase(),
      X = width / 2,
      Y = heigth / 2 + 40;

    // Set position
    switch (lowered) {
      case "hour":
        X -= 80;
        break;
      case "minute":
        X = X; // Not change, center
        break;
      case "second":
        X += 80;
        break;
      default:
        X = width / 2;
        Y = heigth / 2 - 50;
    }

    ctx.font = "18px monospace";
    ctx.fillStyle = "#0e1d0eff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    //* Draw text
    // console.log({ X, Y})
    ctx.fillText(lowered, X, Y);
  }

  setInterval(start, TIME_INTERVAL);
});

class Clock {
  #show = false;
  #timeInterval = 1000; // satu detik;
  #ctx;
  #dateFormat = Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  });
  #timeFormat = Intl.DateTimeFormat("en-US", {
    timeStyle: "medium",
    hour12: false,
  });
  constructor() {
    
  }
}
