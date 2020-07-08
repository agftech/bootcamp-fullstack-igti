window.addEventListener("load", start);

function start() {
  var rangeFrequency = document.querySelector("#rangeFrequency");

  rangeFrequency.addEventListener("input", handleRangeFrequencyChange);

  showPodcastFromFrequency("87.5");
}

function handleRangeFrequencyChange(event) {
  var currentFrequency = event.target.value;

  var inputFrequency = document.querySelector("#inputFrequency");

  inputFrequency.value = currentFrequency;

  showPodcastFromFrequency(currentFrequency);
}

function showPodcastFromFrequency(frequency) {
  var divPodcasts = document.querySelector("#divPodcasts");

  var currentPodcast = realPodcasts.find(function (podcast) {
    return frequency === podcast.id;
  });

  if (!!currentPodcast) {
    renderPodcast(currentPodcast);
  } else {
    divPodcasts.textContent = "Nenhum podcast encontrado!";
  }
}

function renderPodcast(podcast) {
  const { img, title, description, url } = podcast;

  divPodcasts.innerHTML = `
  <div id="infoPodcasts">
      <img src='./img/${img}' /><br>
      <span>
        <span>
          <label>Canal Name:</label>
        </span>
        <p>
          <a href=${url} target="blank">${title}</a>
        </p>
      </span>

      <span>
        <label>Description:</label>
        <p>.:. ${description} .:.<p>
      <span>
    
  </div>
  <iframe  class="iframePodcasts"
    src=${url}
    height="550px"
    style="width: 1px; min-width: 90%;"
    frameborder="0"
    scrolling="no">
  </iframe>
`;
}
