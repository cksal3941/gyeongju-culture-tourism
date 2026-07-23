import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD3iGMuvK_bPpuPA_8AGDYQm1_TOPvcheM",
  authDomain: "gyeongju-1ba76.firebaseapp.com",
  databaseURL: "https://gyeongju-1ba76-default-rtdb.firebaseio.com",
  projectId: "gyeongju-1ba76",
  storageBucket: "gyeongju-1ba76.firebasestorage.app",
  messagingSenderId: "436603050462",
  appId: "1:436603050462:web:c9aea67437f1cd536d254f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 기존 페이지들이 일반 <script>(jQuery)로 작성되어 있어,
// 모듈에서만 쓸 수 있는 Firebase 함수들을 window에 걸어서 넘겨준다.
window.firebaseAuth = auth;
window.firebaseDb = db;
window.firebaseCreateUser = createUserWithEmailAndPassword;
window.firebaseSignIn = signInWithEmailAndPassword;
window.firebaseSignOut = signOut;
window.firebaseOnAuthStateChanged = onAuthStateChanged;
window.firebaseSetDoc = setDoc;
window.firebaseGetDoc = getDoc;
window.firebaseDoc = doc;
window.firebaseGoogleProvider = new GoogleAuthProvider();
window.firebaseSignInWithPopup = signInWithPopup;

// 헤더 로그인 상태 표시
const nameEl = document.getElementById('login-name');
const logoutEl = document.getElementById('logout-btn');
const loginEl = document.getElementById('login-link');

if (nameEl && logoutEl && loginEl) {
  // localStorage 캐시로 즉시 표시 (Firebase 응답 전에 깜빡임 방지)
  const cachedName = localStorage.getItem('gyeongju_user_name');
  if (cachedName) {
    nameEl.textContent = cachedName + '님 반갑습니다';
    nameEl.style.display = '';
    logoutEl.style.display = '';
    loginEl.style.display = 'none';
  }

  onAuthStateChanged(auth, function (user) {
    if (user) {
      loginEl.style.display = 'none';
      logoutEl.style.display = '';
      nameEl.style.display = '';

      getDoc(doc(db, 'users', user.uid))
        .then(function (snap) {
          const data = snap.exists() ? snap.data() : null;
          const displayName = (data && data.name) ? data.name : user.email;
          nameEl.textContent = displayName + '님 반갑습니다';
          localStorage.setItem('gyeongju_user_name', displayName);
        })
        .catch(function () {
          nameEl.textContent = user.email + '님 반갑습니다';
          localStorage.setItem('gyeongju_user_name', user.email);
        });
    } else {
      loginEl.style.display = '';
      logoutEl.style.display = 'none';
      nameEl.style.display = 'none';
      localStorage.removeItem('gyeongju_user_name');
    }
  });

  document.getElementById('logout-link').addEventListener('click', function (e) {
    e.preventDefault();
    signOut(auth).then(function () {
      localStorage.removeItem('gyeongju_user_name');
      location.href = '/login';
    });
  });
}
