const loginForm = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log("Inicio de sesión exitoso. Token:", token);
      window.location.href = "profile.html";
    } else {
      const errorData = await response.json();
      console.error("Error en el inicio de sesión:", errorData.message);
    }
  } catch (error) {
    console.error("Ocurrió un error al enviar la solicitud:", error);
  }
});

const token = localStorage.getItem("token");
if(token){
  window.location.href = "profile.html";
}
