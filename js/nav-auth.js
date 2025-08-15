// js/nav-auth.js  (type="module")
import { auth } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

function render(user){
  const slot = document.querySelector(".header-actions .auth-slot");
  if (!slot) return;

  slot.innerHTML = ""; // clear
  slot.style.display = "flex";
  slot.style.gap = "8px";

  if (user) {
    const who = document.createElement("span");
    who.className = "btn btn-ghost";
    who.textContent = user.displayName || user.email || "Signed in";

    const out = document.createElement("a");
    out.className = "btn";
    out.href = "#";
    out.textContent = "Log out";
    out.onclick = e => { e.preventDefault(); signOut(auth); };

    slot.append(who, out);
  } else {
    const login = document.createElement("a");
    login.className = "btn";
    login.href = "login.html";
    login.textContent = "Log in";
    slot.append(login);
  }
}

onAuthStateChanged(auth, render);
