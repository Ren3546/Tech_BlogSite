const loginFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#userField').value.trim();
  const password = document.querySelector('#passField').value.trim();
  console.log(username);
  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      window.location.replace('/');
    } else {
      alert('Could not log in');
    }
  }
  
  return false; // Prevent form submission
};

// Event listener for login form
const loginForm = document.querySelector('#loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', loginFormHandler);
}