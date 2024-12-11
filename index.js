const fetchUrl = "https://testapi.io/api/Doviaks/resource/UserList";

const results = document.querySelector("#result");
const userForm = document.querySelector("#userForm");

async function fetchUsers() {
  try {
    const response = await fetch(fetchUrl);
    const result = await response.json();

    const users = Array.isArray(result) ? result : result.data || [];
    results.innerHTML = "";

    users.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.innerHTML = `
        <p>
          ${user.name}
          <button onclick="deleteUser('${user.id}')">Delete</button>
        </p>
      `;
      results.appendChild(userElement);
    });
  } catch (error) {
    console.error("Klaida:", error);
  }
}

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nameInput = document.querySelector("#name");
  const name = nameInput.value.trim();

  if (name === "") {
    alert("Įveskite vardą!");
    return;
  }

  try {
    await fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    fetchUsers();
    userForm.reset();
  } catch (error) {
    console.error("Error", error);
  }
});

async function deleteUser(userId) {
  try {
    await fetch(`${fetchUrl}/${userId}`, { method: "DELETE" });
    fetchUsers();
  } catch (error) {
    console.error("Nepavyko ištrinti vartotojo", error);
  }
}

fetchUsers();
