const registrationForm = document.getElementById("registrationForm");
const URL_DB = "http://localhost:3000/api/v1/auth/register";

const token = localStorage.getItem("token");
if (token) {
  window.location.href = "profile.html";
}

registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const user_name = document.getElementById("user_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const formData = {
    user_name,
    email,
    password,
  };

  fetch(URL_DB, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});


