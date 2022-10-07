const addElement = ({ name, url, id, box_count }) => {
  if (box_count <= 2) {
    const newImg = document.createElement("img");
    newImg.src = url;
    newImg.alt = name;

    const newHeader = document.createElement("h2");
    newHeader.textContent = name;

    const newDiv = document.createElement("div");
    newDiv.appendChild(newHeader);
    newDiv.appendChild(newImg);

    newDiv.addEventListener("click", () => {
      const templateID = document.getElementById("meme-id");
      templateID.value = id;
    });

    document.getElementById("container").appendChild(newDiv);
  }
};

const getMemes = () => {
  const url = "https://api.imgflip.com/get_memes";
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.data.memes)
    .then((memes) => {
      memes.forEach((meme) => {
        addElement(meme);
      });
    });
};

getMemes();

const Authorization = {
  username: "romp-nesm-sic",
  password: "45syN593",
};

// https://imgflip.com/popular_meme_ids

const createMeme = async (templateID, topText, bottomText) => {
  const data = {
    template_id: templateID,
    text0: topText,
    text1: bottomText,
    username: Authorization.username,
    password: Authorization.password,
  };

  const url = new URL("https://api.imgflip.com/caption_image");
  url.search = new URLSearchParams(data).toString();

  console.log(url);

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
  });

  return response.json();
};

const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const templateID = document.getElementById("meme-id").value;
  const topText = document.getElementById("meme-top-text").value;
  const bottomText = document.getElementById("meme-bottom-text").value;
  console.log({ templateID, topText, bottomText });
  const data = await createMeme(templateID, topText, bottomText);
  console.log(data);

  const newImg = document.createElement("img");
  newImg.src = data.data.url;

  form.after(newImg);
});
