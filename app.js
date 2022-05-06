const form = document.querySelector("#form");
const searchInput = document.querySelector("#search");
const songsContainer = document.querySelector("#songs-container");
const prevAndNextContainer = document.querySelector("#prev-and-next-container");

const apiURL = ` https://api.lyrics.ovh`;

// 7
/*
const fechData = async (url) => {
    const response = await fetch(url)
    return await response.json()
}
*/
//console.log({ form, searchInput, songsContainer, prevAndNextContainer });

//2
/* const fetchSongs = (term) => {
  fetch(`${apiURL}/suggest/${term}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}; */

//4 -
const getMoreSongs = async (url) => {
  //const data = await fechData(`http://cors-anywhere.herokuapp.com/${url}`)
  const response = await fetch(`http://cors-anywhere.herokuapp.com/${url}`);
  const data = await response.json();

  isertSongsIntoPage(data);
};

//9
/* const inserNextAndPrevButtons = ({prev, next}) => {
  prevAndNextContainer.innerHTML = `
    ${
      prev
        ? `<button class="btn" onclick="getMoreSongs('${prev}')">Anteriores</button>`
        : ""
    }
    ${
      next
        ? `<button class="btn" onclick="getMoreSongs('${next}')">Próximas</button>`
        : ""
    }
`;
}; */

//3
const isertSongsIntoPage = (songsInfo) => {
  //const isertSongsIntoPage = ({data, prev, next}) => {
  //debugger

  //data.map(({artist: {name}, title}) =>
  songsContainer.innerHTML = songsInfo.data
    .map(
      (song) => `
    <li class="song">
        <span class="song-artist">
            <strong>${song.artist.name}</strong>
            - ${song.title}
        </span>
        <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Ver letra</button>
    </li>
    `
    )
    .join("");

  if (songsInfo.prev || songsInfo.next) {
    //inserNextAndPrevButtons({prev, next})
    prevAndNextContainer.innerHTML = `
    ${
      songsInfo.prev
        ? `<button class="btn" onclick="getMoreSongs('${songsInfo.prev}')">Anteriores</button>`
        : ""
    }
    ${
      songsInfo.next
        ? `<button class="btn" onclick="getMoreSongs('${songsInfo.next}')">Próximas</button>`
        : ""
    }
`;
    return;
  }

  prevAndNextContainer.innerHTML = ``;
};

const fetchSongs = async (term) => {
  const response = await fetch(`${apiURL}/suggest/${term}`);
  const data = await response.json();

  isertSongsIntoPage(data);
};

//1
form.addEventListener("submit", (event) => {
  //lembrar de desacoplar
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  /* searchInput.value = "";
  searchInput.focus(); */

  if (!searchTerm) {
    songsContainer.innerHTML = `<li class="warning-message">Por favor, insira um valor válido.</li>`;
    return;
  }

  fetchSongs(searchTerm);
});

//8
/*
const insertLyricsIntoPage = ({ lyrics, artist, songTitle }) => {
  songsContainer.innerHTML = `
    <li class="lyrics-container">
        <h2><strong>${songTitle}</strong> - ${artist}</h2>
        <p class="lyrics">${lyrics}</p>
    </li>
  `;
};
*/

//6
const fetchLyrics = async (artist, songTitle) => {
  const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await response.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br />");
  //insertLyricsIntoPage({lyrics, artist, songTitle})
  songsContainer.innerHTML = `
    <li class="lyrics-container">
        <h2><strong>${songTitle}</strong> - ${artist}</h2>
        <p class="lyrics">${lyrics}</p>
    </li>
  `;
};

//5
songsContainer.addEventListener("click", (event) => {
  const clickElement = event.target;

  if (clickElement.tagName === "BUTTON") {
    const artist = clickElement.getAttribute("data-artist");
    const songTitle = clickElement.getAttribute("data-song-title");
    prevAndNextContainer.innerHTML = "";
    fetchLyrics(artist, songTitle);
  }
});
