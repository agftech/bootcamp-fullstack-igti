let allUsers = [];
let totalAges = 0;
let totalUsers = 0;
let totalMens = 0;
let totalWomens = 0;

let summaryUsers = null;
let summaryStatistic = null;

const searchKeyboard = document.querySelector("#inputText");

window.addEventListener("load", () => {
  tabUsers = document.querySelector("#tabUsers");
  totalAges = document.querySelector("#totalAges");
  summaryUsers = document.querySelector("#summaryUsers");
  summaryStatistic = document.querySelector("#summaryStatistic");
  loadindData();
});

function loadindData() {
  setTimeout(() => {
    document.querySelector("#loading").innerHTML = "";
  }, 2500);
  fetchUsers();
  handleInput();
}

async function fetchUsers() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );

  const json = await res.json();

  allUsers = json.results.map((user) => {
    const { name, dob, gender, picture } = user;
    return {
      name: name.first + " " + name.last,
      picture: picture.large,
      age: dob.age,
      gender: gender,
    };
  });
}

function handleInput() {
  function handleSearchButton() {
    handlefilterUsers(inputText.value);
  }

  function handleTyping(event) {
    let thereIsText = !!event.target.value && event.target.value.trim() !== "";

    if (thereIsText) {
      btnSearch.classList.remove("disabled");
      if (event.key === "Enter") {
        handlefilterUsers(event.target.value);
      }
      return;
    }
    btnSearch.classList.add("disabled");
  }

  inputText.addEventListener("keyup", handleTyping);
  btnSearch.addEventListener("click", handleSearchButton);
  inputText.focus();
}

function handlefilterUsers(searchName) {
  let usersHTML = "<div>";
  let totalUsersFilter = [];

  function handleResultStatistic() {
    let StatisticHTML = "";

    const totalMale = totalUsersFilter.filter((user) => user.gender === "male")
      .length;
    const totalFemale = totalUsersFilter.filter(
      (user) => user.gender === "female"
    ).length;
    const totalAges = totalUsersFilter.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);

    StatisticHTML += `
    <ul >
      <li>Male users: ${totalMale}</li>
      <li>Female users: ${totalFemale}</li>
      <li>Sum of ages: ${totalAges}</li>
      <li>Average ages: ${(totalAges / (totalMale + totalFemale)).toFixed(
        2
      )}</li>
    </ul> 
    `;
    tabStatistic.innerHTML = StatisticHTML;
  }

  totalUsersFilter = allUsers.filter((user) =>
    user.name.toUpperCase().includes(searchName.toUpperCase())
  );

  totalUsersFilter
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((user) => {
      const { name, picture, age, gender } = user;
      const userHMTL = `
    <div class="user">
    <div>
    <img src="${picture}" alt="${name}"/>
    </div>
    <div>
    ${name} , ${age} years
    </div>
    </div>  
    `;
      usersHTML += userHMTL;
    }, 0);
  usersHTML += "</div>";
  tabUsers.innerHTML = usersHTML;

  handleResultStatistic();
  handleUpdateSummary(totalUsersFilter.length);
}

function handleUpdateSummary(searchUsers) {
  if (searchUsers === 0) {
    summaryUsers.textContent = "No filtered users";
    summaryStatistic.textContent = "Nothing to display";
    tabUsers.innerHTML = "";
    tabStatistic.innerHTML = "";
    return;
  }
  summaryUsers.textContent = `${searchUsers} user(s) found`;
  summaryStatistic.textContent = `Statistics of ${searchUsers} user(s)`;
}
