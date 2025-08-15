// js/firebase-init.js  (type: module)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase config (from your console)
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCGpJuJLW7eNS0L5Bs9jSZlA6Qbqw7bAKQ",
  authDomain: "poolpartycanada.firebaseapp.com",
  projectId: "poolpartycanada",
  storageBucket: "poolpartycanada.firebasestorage.app",
  appId: "1:198483847814:web:91fee94bd7081f0d223f07",
  measurementId: "G-B1JQ7V5NW9"
});

// Auth instance used by the rest of the site
export const auth = getAuth(firebaseApp);

/* Optional: add Analytics later if you really want it.
   It’s not needed for login and can cause errors locally.
   To enable, also add this import and line:
   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
   const analytics = getAnalytics(firebaseApp);
*/
