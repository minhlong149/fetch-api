const addElement = ({ name, url }) => {
  const newImg = document.createElement("img");
  newImg.src = url;
  newImg.alt = name;

  const newHeader = document.createElement("h2");
  newHeader.textContent = name;

  const newDiv = document.createElement("div");
  newDiv.appendChild(newHeader);
  newDiv.appendChild(newImg);

  document.getElementById("container").appendChild(newDiv);
};

const fetchMeme = () => {
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

fetchMeme();