const musicForm = document.getElementById('music-form');
const songInput = document.getElementById('song-input');
const artistInput = document.getElementById('artist-input');
const linkInput = document.getElementById('link-input');
const musicList = document.getElementById('music-list');

const STORAGE_KEY = 'minhasMusicasFavoritas';

function getSavedSongs() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveSongs(songs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}

function createMusicItem(song, artist, link, index) {
  const li = document.createElement('li');
  li.className = 'music-item';

  const info = document.createElement('div');
  info.className = 'song-info';

  const title = document.createElement('strong');
  title.className = 'song-title';
  title.textContent = song;

  const artistName = document.createElement('span');
  artistName.className = 'song-artist';
  artistName.textContent = artist;

  const songLink = document.createElement('a');
  songLink.className = 'song-link';
  songLink.href = link;
  songLink.target = '_blank';
  songLink.rel = 'noopener noreferrer';
  songLink.textContent = 'Ouvir música';

  info.appendChild(title);
  info.appendChild(artistName);
  info.appendChild(songLink);

  const removeButton = document.createElement('button');
  removeButton.className = 'remove-button';
  removeButton.textContent = 'Remover';
  removeButton.addEventListener('click', () => removeSong(index));

  li.appendChild(info);
  li.appendChild(removeButton);

  return li;
}

function renderSongs() {
  const songs = getSavedSongs();
  musicList.innerHTML = '';

  if (songs.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-state';
    emptyMessage.textContent = 'Nenhuma música adicionada ainda. Comece adicionando a sua primeira favorita!';
    musicList.appendChild(emptyMessage);
    return;
  }

  songs.forEach((item, index) => {
    const listItem = createMusicItem(item.song, item.artist, item.link, index);
    musicList.appendChild(listItem);
  });
}

function addSong(song, artist, link) {
  const songs = getSavedSongs();
  songs.push({ song, artist, link });
  saveSongs(songs);
  renderSongs();
}

function removeSong(index) {
  const songs = getSavedSongs();
  songs.splice(index, 1);
  saveSongs(songs);
  renderSongs();
}

musicForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const song = songInput.value.trim();
  const artist = artistInput.value.trim();
  const link = linkInput.value.trim();

  if (!song || !artist || !link) return;

  addSong(song, artist, link);
  songInput.value = '';
  artistInput.value = '';
  linkInput.value = '';
  songInput.focus();
});

renderSongs();
