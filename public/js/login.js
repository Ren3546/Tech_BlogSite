const loginFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#userField').value.trim();
    const password = document.querySelector('#passField').value.trim();
    console.log(username)
    if (username && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.'); 
    }
  };
  
  // Event listener for login form
  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', loginFormHandler);
  }
};