document.addEventListener('DOMContentLoaded', function () {
  let nameEl = document.getElementById('login-name');
  let logoutEl = document.getElementById('logout-btn');
  let loginEl = document.getElementById('login-link');

  window.firebaseOnAuthStateChanged(window.firebaseAuth, function (user) {
    if (user) {
      loginEl.style.display = 'none';
      logoutEl.style.display = '';
      nameEl.style.display = '';

      window.firebaseGetDoc(window.firebaseDoc(window.firebaseDb, 'users', user.uid))
        .then(function (snap) {
          let data = snap.exists() ? snap.data() : null;
          nameEl.textContent = (data && data.name ? data.name : user.email) + '님';
        });
    } else {
      loginEl.style.display = '';
      logoutEl.style.display = 'none';
      nameEl.style.display = 'none';
    }
  });

  document.getElementById('logout-link').addEventListener('click', function (e) {
    e.preventDefault();
    window.firebaseSignOut(window.firebaseAuth).then(function () {
      location.href = '/login';
    });
  });
});
