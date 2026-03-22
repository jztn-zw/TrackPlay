//const { response } = require("express");

const content = document.querySelector("#gameList");
const submit = document.querySelector("#add");
const update = document.querySelector("#update");

//POST API
submit.addEventListener("click", () => {
  let game_name = document.querySelector("#game_name").value;
  let category = document.querySelector("#category").value;
  let difficulty = document.querySelector("#difficulty").value;
  let rating = document.querySelector("#rating").value;
  let status = document.querySelector("#status").value;
  let formData = { game_name, category, difficulty, rating, status };

  fetch("http://localhost:7000/api/users", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
  alert("User Added Successfully");
  location.reload();
});

window.addEventListener("load", () => {
  getUsers();
});

function getUsers() {
  let html = "";
  //FETCH API
  fetch("http://localhost:7000/api/users", { mode: "cors" })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        html += `<li class="grid grid-cols-6 gap-4 flex-1 justify-between"><span>${element.first_name}</span> <span> ${element.last_name}</span> <span>${element.difficulty}</span> <span>${element.rating}</span>  <span>${element.ip_address}</span>
            <div>
            <a href="javascript:void(0)" onClick="deleteMember(${element.id})">Delete</a>
            <a href="javascript:void(0)" onClick="updateMember(${element.id})">Update</a></div></li>`;
      });

      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

//DELETE
function deleteMember(id) {
  let text;
  if (confirm("Press a button!") == true) {
    fetch("http://localhost:7000/api/users", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
    location.reload();
  } else {
    text = "You canceled!";
  }
}

//search
function updateMember(id) {
  fetch(`http://localhost:7000/api/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#game_name").value = data[0].first_name;
      document.querySelector("#category").value = data[0].last_name;
      document.querySelector("#difficulty").value = data[0].difficulty;
      document.querySelector("#rating").value = data[0].rating;
      document.querySelector("#ID").value = data[0].id;
      document.querySelector("#status").value = data[0].ip_address;
    })
    .catch((error) => {
      console.log(error);
    });
}
//PUT
update.addEventListener("click", () => {
  let game_name = document.querySelector("#game_name").value;
  let category = document.querySelector("#category").value;
  let difficulty = document.querySelector("#difficulty").value;
  let rating = document.querySelector("#rating").value;
  let status = document.querySelector("#status").value;

  let id = document.querySelector("#ID").value;

  let formData = { game_name, category, difficulty, rating, status, id };
  fetch(`http://localhost:7000/api/users/`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.log(error);
  });
  alert("User Updated Successfully");
  location.reload();
});
