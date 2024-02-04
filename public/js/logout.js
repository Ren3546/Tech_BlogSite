function logout() {
    fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (response.ok) {
        window.location.replace('/');
      } else {
        alert('Failed to log out.');
      }
    })
    .catch(error => {
      console.error('Error', error);
      alert('Failed to log out.');
    });
  };
  
  const logoutButton = document.querySelector('#logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }
  