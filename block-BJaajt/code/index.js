const input = document.querySelector('input');
const info = document.querySelector('.info');
const userImg = document.querySelector('.user-image');
const userName = document.querySelector('h2');
const userLogin = document.querySelector('p');
const followersUl = document.querySelector('.followers');
const followingUl = document.querySelector('.following');

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.error('Something went wrong!');
  };
  xhr.send();
}

function displayExtraInfo(url, rootElm) {
  rootElm.innerHTML = '';
  fetch(url, function (followersList) {
    let topFive = followersList.slice(0, 5);
    topFive.forEach((info) => {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = info.avatar_url;
      img.alt = info.name;
      li.append(img);
      rootElm.append(li);
    });
  });
}

function handleDisplay(userInfo) {
  userImg.src = userInfo.avatar_url;
  userImg.alt = userInfo.name;
  userName.innerText = userInfo.name;
  userLogin.innerText = '@' + userInfo.login;
  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/followers`,
    followersUl
  );
  displayExtraInfo(
    `https://api.github.com/users/${userInfo.login}/following`,
    followingUl
  );
}

function handleInput(event) {
  if (event.keyCode === 13 && input.value) {
    const url = 'https://api.github.com/users/';
    let username = input.value;
    fetch(url + username, handleDisplay);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + username);
    xhr.onload = function () {
      handleDisplay(JSON.parse(xhr.response));
    };
    xhr.onerror = function () {
      console.error('Something went wrong!');
    };
    xhr.send();

    input.value = '';
  }
}

input.addEventListener('keydown', handleInput);

const catsImage = document.querySelector('.cats img');
const catsButton = document.querySelector('.cats button');

function handleClick() {
  fetch(
    `https://api.thecatapi.com/v1/images/search?limit=1&size=full`,
    function (catInfo) {
      catsImage.src = catInfo[0].url;
    }
  );
}
catsButton.addEventListener('click', handleClick);
