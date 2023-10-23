const form = document.querySelector(".register-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // const isPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const name = document.getElementById("user_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const nameError = document.getElementById("name-error");
  const emailErorr = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  if (name === "" || name.length < 4) {
    nameError.innerHTML = "El nombre debe tener al menos 4 caracteres";
  } else {
    nameError.textContent = "";
  }
  if (!isEmail.test(email)) {
    emailErorr.textContent = "Debes Ingresar un Email Valido";
  } else {
    emailErorr.innerHTML = "";
  }
  if (password === "" || password.length < 8) {
    passwordError.innerHTML = "La contraseña debe tener al menos 8 caracteres";
  } else {
    passwordError.innerHTML = "";
  }
});
