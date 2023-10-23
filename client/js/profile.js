const userNameElement = document.getElementById('userName');
const emailElement = document.getElementById('email');

(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
      },
    });

    if (response.ok) {
      const userData = await response.json(); 

      userNameElement.textContent = userData.user_name;
      emailElement.textContent = userData.email;
    } else {
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error('Ocurrió un error al cargar los datos del usuario:', error);
  }
})();

document.getElementById('logout').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/logout', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
      },
    });

    if (response.ok) {
      localStorage.removeItem('token'); 
      window.location.href = 'index.html';
    } else {
      console.error('Error en el logout:', response.status);
    }
  } catch (error) {
    console.error('Ocurrió un error al cerrar sesión:', error);
  }
});


function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
