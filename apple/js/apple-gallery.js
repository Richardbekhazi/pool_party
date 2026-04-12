// js/apple-gallery.js
// Gallery for local pictures (not Google Drive)
document.addEventListener("DOMContentLoaded", function () {
  var gallery = document.getElementById("gallery");
  var lightbox = document.getElementById("lightbox");
  var lightboxBody = document.getElementById("lightboxBody");
  var closeBtn = document.getElementById("closeLightbox");

  if (!gallery) return;

  fetch("data/pictures.json")
    .then(function (r) { return r.json(); })
    .then(function (pics) {
      gallery.innerHTML = "";
      pics.forEach(function (pic) {
        var card = document.createElement("article");
        card.className = "card-item";

        var img = document.createElement("img");
        img.src = pic.src;
        img.alt = pic.title;
        img.loading = "lazy";

        var badge = document.createElement("span");
        badge.className = "card-badge";
        badge.textContent = "View";

        card.appendChild(img);
        card.appendChild(badge);
        card.addEventListener("click", function () {
          openLightbox(pic);
        });

        gallery.appendChild(card);
      });
    })
    .catch(function (err) {
      gallery.innerHTML = '<p style="padding:32px;color:var(--muted);">Could not load photos.</p>';
    });

  function openLightbox(pic) {
    if (!lightbox || !lightboxBody) return;
    lightboxBody.innerHTML = '<img src="' + pic.src + '" alt="' + pic.title + '" style="max-width:90vw;max-height:85vh;border-radius:12px;">';
    lightbox.showModal();
    document.body.style.overflow = "hidden";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      lightbox.close();
      document.body.style.overflow = "";
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        lightbox.close();
        document.body.style.overflow = "";
      }
    });
  }
});
