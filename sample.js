// XMLHttpRequest

const xhr = new XMLHttpRequest();

xhr.open("GET", "https://example.com/some/url");
xhr.send();

xhr.onload = function () {
  console.log(xhr.response);
};

// Fetch API Intro
const url = "https://example.com/some/url";

url.then((response) => response.json()).then((data) => console.log(data));

// The trouble with long-running synchronous functions

fetch("https://example.com/movies.json");
fetch("https://example.com/posts");
fetch("https://example.com/profile?username=alex");

console.log("⏰");

// Async

fetch("https://example.com/some/url", function () {
  console.log("🏅");
});

console.log("🏆");

// Callback hell

function getMemes(nextStep) {
  getURL(function (url) {
    fetch(url, function (res) {
      getJSON(res, function (data) {
        showMemes(data, function () {
          nextStep();
        });
      });
    });
  });
}

getMemes(function () {
  console.log("🎉");
});

// Fetch API using Promise

function getMeme() {
  getURL()
    .then((url) => fetch(url))
    .then((res) => getJSON(res))
    .then((data) => showMemes(data));
}

getMemes().then(() => {
  console.log("🎉");
});

// Catching errors

function getMeme() {
  fetch("https://api.imgflip.com/get_memes")
    .then((response) => {
      if (!response.ok) {
        throw new Error("⚠️");
      }
      return response.json();
    })
    .then((data) => showMemes(data))
    .catch((error) => console.log(error));
}

// POST

fetch("https://example.com/profile", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username: "alex" }),
})
  .then((response) => response.json())
  .then((data) => console.log("👌"))
  .catch((error) => console.error("❌"));

fetch("https://example.com/profile?username=alex", {
  method: "POST",
})
  .then((response) => response.json())
  .then((data) => console.log("👌"))
  .catch((error) => console.error("❌"));

function createMemeA(url) {
  fetch(url, { method: "POST" })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

async function createMemeB(url) {
  const response = await fetch(url, { method: "POST" });
  const data = await response.json();
  console.log(data);
}

//  promise hell

function createMeme() {
  getURL()
    .then((postURL) => fetch(postURL))
    .then((res) => getJSON(res))
    .then((data) => updateMeme(data))
    .then(() => console.log("🎉"));
}

function createMeme() {
  getURL().then((postURL) => {
    fetch(postURL).then((res) => {
      getJSON(res).then((data) => {
        updateMeme(data).then(() => {
          console.log("🎉");
        });
      });
    });
  });
}

getMemes().then(() => {
  console.log("🎉");
});

// async and await

async function createMeme(url) {
  const response = await fetch(url, {
    method: "POST",
  });
  const data = await response.json();
  return data;
}

// try...catch

async function createMeme(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("⚠️");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
