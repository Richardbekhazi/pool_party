// js/login.js — 4-digit PIN gate (auto-unlock) + Google sign-in + auto-redirect if already signed in
import { auth } from "./firebase-init.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Where to send signed-in users
const REDIRECT_TO = "index.html"; // or "pictures.html" / "money.html"

// 4-digit passcode
const PASSCODE = "2552";

const pinGate = document.getElementById("pinGate");
const cells   = Array.from(document.querySelectorAll(".pin-cell"));
const msg     = document.getElementById("gateMsg");
const button  = document.getElementById("googleSignIn");
const subtext = document.querySelector(".login-subtext");

// Redirect ASAP if already signed in (prevents the button from showing)
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.replace(REDIRECT_TO);
  }
});

function unlock() {
  sessionStorage.setItem("pp_unlocked", "1");
  pinGate?.classList.remove("error");
  msg.textContent = "";
  button?.classList.remove("hidden");
  pinGate?.classList.add("hidden");
  subtext?.classList.add("hidden");
}

function clearPin() {
  cells.forEach(c => c.value = "");
  cells[0]?.focus();
}

function readPin() {
  return cells.map(c => (c.value || "").replace(/\D/g,"")).join("").slice(0,4);
}

function handleComplete() {
  const code = readPin();
  if (code.length < 4) return;
  if (code === PASSCODE) {
    unlock();
  } else {
    pinGate?.classList.add("error","shake");
    msg.textContent = "Wrong passcode";
    setTimeout(() => pinGate?.classList.remove("shake"), 300);
    clearPin();
  }
}

function wirePinUI() {
  if (sessionStorage.getItem("pp_unlocked") === "1") {
    unlock();
    return;
  }
  cells[0]?.focus();

  cells.forEach((cell, idx) => {
    cell.addEventListener("input", e => {
      const v = e.target.value.replace(/\D/g,"");
      e.target.value = v.slice(-1);
      if (v.length && idx < cells.length - 1) cells[idx+1].focus();
      handleComplete();
    });

    cell.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !cell.value && idx > 0) {
        cells[idx-1].focus(); cells[idx-1].value = ""; e.preventDefault();
      } else if (e.key === "ArrowLeft" && idx > 0) {
        cells[idx-1].focus(); e.preventDefault();
      } else if (e.key === "ArrowRight" && idx < cells.length - 1) {
        cells[idx+1].focus(); e.preventDefault();
      }
    });

    // paste 4 digits at once
    cell.addEventListener("paste", e => {
      e.preventDefault();
      const txt = (e.clipboardData.getData("text") || "").replace(/\D/g,"").slice(0,4);
      if (!txt) return;
      cells.forEach((c,i) => c.value = txt[i] || "");
      handleComplete();
    });
  });
}

document.addEventListener("DOMContentLoaded", wirePinUI);

// Google sign-in (only visible after unlock)
button?.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    window.location.replace(REDIRECT_TO);
  } catch (err) {
    alert("Sign-in failed: " + (err?.message || err));
  }
});
