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

  fetch("https://trackplay.onrender.com/api/games", {
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

// function getUsers() {
//   let html = "";
//   //FETCH API
//   fetch("https://trackplay.onrender.com/api/games", { mode: "cors" })
//     .then((response) => {
//       console.log(response);
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       data.forEach((element) => {
//         html += `<li class="grid grid-cols-6 gap-4 flex-1 justify-between"><span>${element.game_name}</span> <span> ${element.category}</span> <span>${element.difficulty}</span> <span>${element.rating}</span>  <span>${element.status}</span>
//             <div>
//             <a href="javascript:void(0)" onClick="deleteMember(${element.id})">Delete</a>
//             <a href="javascript:void(0)" onClick="updateMember(${element.id})">Update</a></div></li>`;
//       });

//       content.innerHTML = html;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

function getUsers() {
  let html = "";
  //FETCH API
  fetch("https://trackplay.onrender.com/api/games", { mode: "cors" })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        const filled = Math.min(Math.max(Number(element.rating) || 0, 0), 5);
        const starsHtml = Array.from(
          { length: 5 },
          (_, i) =>
            `<span class="star ${i < filled ? "filled" : "empty"}">★</span>`,
        ).join("");

        html += `
          <li class="game-card">
 
            <div class="game-card-header">
              <span class="pill ${element.difficulty}">${element.difficulty}</span>
            </div>
 
            <div class="game-card-body">
              <p class="game-card-name">${element.game_name}</p>
              <p class="game-card-category">${element.category || "Uncategorized"}</p>
            </div>
 
            <div class="game-card-rating">
              <span class="rating-label">Rating</span>
              <div class="game-card-stars">${starsHtml}</div>
            </div>
 
            <div class="game-card-footer">
              <span class="pill ${element.status}">${element.status}</span>
              <div class="game-card-actions">
                <a href="javascript:void(0)" onClick="deleteMember(${element.id})" class="action-btn action-delete" title="Delete">✕</a>
                <a href="javascript:void(0)" onClick="updateMember(${element.id})" class="action-btn action-edit" title="Edit">Edit</a>
              </div>
            </div>
 
          </li>`;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

//DELETE
function deleteMember(id) {
  if (confirm("Are you sure you want to delete this Game?")) {
    fetch("https://trackplay.onrender.com/api/games", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("You Canceled!");
  }
}

//search
function updateMember(id) {
  fetch(`https://trackplay.onrender.com/api/games/${id}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#game_name").value = data[0].game_name;
      document.querySelector("#category").value = data[0].category;
      document.querySelector("#difficulty").value = data[0].difficulty;
      document.querySelector("#rating").value = data[0].rating;
      document.querySelector("#ID").value = data[0].id;
      document.querySelector("#status").value = data[0].status;
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
  fetch(`https://trackplay.onrender.com/api/games/`, {
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
