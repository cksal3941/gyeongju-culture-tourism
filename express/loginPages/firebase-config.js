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
