const form = document.querySelector(".login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailErorr = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  if (!isEmail.test(email)) {
    emailErorr.innerHTML = "Debes Ingresar un Email Valido";
  }else{
    emailErorr.innerHTML = "";

  }
  if (password === "" || password.length < 8) {
    passwordError.innerHTML = "La contraseña debe tener al menos 8 caracteres";
  }else{
    passwordError.innerHTML = "";
  }

});
