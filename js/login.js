import { auth } from "./firebase-init.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const btn = document.getElementById("googleSignIn");
const out = document.getElementById("signOut");

btn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    redirectNext();
  } catch (e) {
    alert("Sign-in failed: " + (e.message || e));
    console.error(e);
  }
});

out?.addEventListener("click", () => signOut(auth));

function redirectNext() {
  const next = new URLSearchParams(location.search).get("next") || "index.html";
  location.replace(next);
}

// Already signed in? Go straight to next.
onAuthStateChanged(auth, user => { if (user) redirectNext(); });
