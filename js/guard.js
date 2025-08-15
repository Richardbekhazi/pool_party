import { auth } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const PROTECTED = ["money.html", "pictures.html"];
const path = location.pathname.toLowerCase();
const needsLogin = PROTECTED.some(p => path.endsWith(p));

onAuthStateChanged(auth, user => {
  if (needsLogin && !user) {
    const next = encodeURIComponent(location.pathname + location.search);
    location.replace(`login.html?next=${next}`);
  }
});
