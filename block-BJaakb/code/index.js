function fetch(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () =>
      setTimeout(() => resolve(JSON.parse(xhr.response)), 5000);
    xhr.onerror = () => setTimeout(() => reject(`Something went wrong!`));
    xhr.send();
  });
}

let data = fetch(`https://api.github.com/users/sarangsk01`);
