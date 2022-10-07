// API documentation: https://imgflip.com/api

// List of meme ID for testing:
// https://imgflip.com/popular_meme_ids

// SET GET REQUEST USING PROMISE

function getMemes() {
  const getURL = "https://api.imgflip.com/get_memes";
  console.log(`Send GET request to ${getURL}`);
  fetch(getURL)
    .then((response) => response.json())
    .then((data) => {
      const memes = data.data.memes.filter((meme) => meme.box_count <= 2);
      memes.forEach((meme) => {
        addMeme(meme);
      });
      console.log(`${memes.length} memes added to the page`);
    })
    .catch((error) => {
      console.log(error);
    });
}

function addMeme({ name, url, id }) {
  const image = document.createElement("img");
  image.src = url;
  image.alt = name;
  image.loading = "lazy";

  const caption = document.createElement("figcaption");
  caption.textContent = name;

  const newMeme = document.createElement("figure");
  newMeme.appendChild(image);
  newMeme.appendChild(caption);

  newMeme.addEventListener("click", () => {
    console.log(`Selected meme ${id}: ${name}`);
    const templateID = document.getElementById("meme-id");
    templateID.value = id;

    const page_url = "";
    updateMeme({ url, page_url });
  });

  const container = document.getElementById("container");
  container.appendChild(newMeme);
}

getMemes();

// SEND POST REQUEST USING ASYNC/AWAIT

const form = document.getElementById("form");
form.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const { data, success, error_message } = await createMeme();
    if (success) {
      updateMeme(data);
      console.log("Create meme succeed!");
    } else throw Error(error_message);
  } catch (error) {
    console.log(error);
  }
});

async function createMeme() {
  try {
    const postURL = getMemeURL();
    console.log("Sending POST request...");
    const response = await fetch(postURL, {
      method: "POST",
      mode: "cors",
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

function getMemeURL() {
  const templateID = document.getElementById("meme-id").value;
  const topText = document.getElementById("meme-top-text").value;
  const bottomText = document.getElementById("meme-bottom-text").value;

  // return `https://api.imgflip.com/caption_image?template_id=${templateID}&text0=${topText}&text1=${bottomText}&username=${Authorization.username}&password=${Authorization.password}`;

  const parameters = {
    template_id: templateID,
    text0: topText,
    text1: bottomText,
    username: Authorization.username,
    password: Authorization.password,
  };

  const postURL = new URL("https://api.imgflip.com/caption_image");
  postURL.search = new URLSearchParams(parameters).toString();

  return postURL;
}

function updateMeme({ url, page_url }) {
  const image = document.getElementById("created-image");
  image.src = url;

  const anchor = document.getElementById("created-link");
  anchor.href = page_url;
}

const Authorization = {
  username: "romp-nesm-sic",
  password: "45syN593",
};
