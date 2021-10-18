async function ajax(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("load", function () {
      try {
        resolve(this.responseText);
      } catch (error) {
        reject(error);
      }
    });
    request.open("GET", url);
    request.send();
    request.addEventListener("error", reject);
  });
}

/** @returns {void} */
async function main() {
  //const socket = io("https://beta.testcribe.com/remote/");
  var paths = window.location.pathname.split("/") ;
  console.log("device: " + paths[2]);
  const socket = io("/", {
    query: {
      token: paths[2]
    },
  });
  socket.on("connect", () =>
    socket.emit("hello", `Hi there! I am ${window.navigator.userAgent}`)
  );

  const secondsElement = document.getElementById("seconds");
  socket.on(
    "seconds",
    (seconds) => (secondsElement.innerText = seconds.toString())
  );

  const welcomeElement = document.getElementById("welcome");
  socket.on(
    "online",
    (online) => (onlineElement.innerText = online.toString())
  );

  const onlineElement = document.getElementById("online");
  socket.on(
    "welcome",
    (welcomeMessage) => (welcomeElement.innerText = welcomeMessage)
  );
}

main();
