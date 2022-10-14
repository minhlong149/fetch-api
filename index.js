// API documentation: https://imgflip.com/api

// SET GET REQUEST USING PROMISE

function getMemes() {
  const getURL = "https://api.imgflip.com/get_memes";
  console.log(`📨 Gửi GET request đến ${getURL}`);

  fetch(getURL)
    .then((response) => {
      console.log("Kết quả trả về:", response);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      return response.json();
    })
    .then((data) => {
      console.log("Dữ liệu chúng ta cần:", data);
      showMemes(data);
    })
    .then(() => {
      console.log(`🎉 Ảnh meme được thêm thành công!`);
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(
    "🍵 Trong khi lấy dữ liệu, chương trình tiếp tục thực thi các câu lệnh phía dưới"
  );
}

getMemes();

// SEND POST REQUEST USING ASYNC/AWAIT

// Uncomment this before continue
hideForm();

async function createMeme(postURL) {
  try {
    console.log(`📨 Gửi POST request đến ${postURL}`);

    const response = await fetch(postURL, {
      method: "POST",
    });
    console.log("Kết quả trả về:", response);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // response.json() returns a promise
    // so you have to wait for the JSON
    const data = await response.json();
    console.log("Dữ liệu chúng ta cần:", data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

const form = document.getElementById("form");
form.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    console.log("Người dùng đã ấn chọn tạo form!");

    const postURL = getMemeURL();
    const { data, success, error_message } = await createMeme(postURL);

    if (success) {
      updateMeme(data);
      console.log("🎉 Meme được tạo thành công!");
    } else {
      throw Error(error_message);
    }
  } catch (error) {
    console.log(error);
  }
});

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

// UTILS ****************************************

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

function showMemes(data) {
  const memes = data.data.memes;
  memes.forEach((meme) => {
    addMeme(meme);
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
  newMeme.id = id;

  newMeme.appendChild(image);
  newMeme.appendChild(caption);

  newMeme.addEventListener("click", () => {
    console.log(`Bạn đã chọn meme ${name}, ID là ${id}`);
    const templateID = document.getElementById("meme-id");
    templateID.value = id;

    const page_url = "";
    updateMeme({ url, page_url });
  });

  const container = document.getElementById("container");
  container.appendChild(newMeme);
}

function hideForm() {
  const inpt = document.getElementById("create-meme");
  inpt.style.display = "none";
}
