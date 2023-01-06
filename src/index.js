let addToy = false;
const addForm = document.getElementById("addToyForm");
const toyCollection = document.getElementById("toy-collection");
document.addEventListener("DOMContentLoaded", () => {
  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then((resp) => resp.json())
      .then((data) => {
        function fetchToys() {
          data.forEach((toy) => {
            const toyCard = document.createElement("div");
            toyCard.setAttribute("class", "card");
            toyCollection.appendChild(toyCard);
            const toyName = document.createElement("h2");
            toyName.innerHTML = toy.name;
            const toyPic = document.createElement("img");
            toyPic.src = toy.image;
            toyPic.style.width = "205px";
            const toyLikes = document.createElement("p");
            toyLikes.innerHTML = toy.likes;
            const likeBtn = document.createElement("button");
            likeBtn.innerHTML = "Like ❤️";
            likeBtn.setAttribute("class", "like-btn");
            likeBtn.setAttribute("id", toy.id);

            toyCard.append(toyName);
            toyName.append(toyPic);
            toyName.append(toyLikes);
            toyLikes.append(likeBtn);
          });
        }
      });
  }

  addForm.addEventListener("submit", (event) => {
    //event.preventDefault();

    const toyData = {
      name: addForm.name.value,
      image: addForm.image.value,
      likes: null,
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyData),
    })
      .then((resp) => resp.json())
      .then((newToy) => {
        const toyCard = document.createElement("div");
        toyCard.innerHTML = `
        <h2>${newToy.name}</h2>
        <img src="${newToy.image}" alt="${newToy.name}" />
        <p>${newToy.likes}</p>
      `;
        toyCollection.appendChild(toyCard);
      });
  });
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
