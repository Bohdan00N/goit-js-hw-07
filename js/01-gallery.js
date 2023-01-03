import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryRefs = document.querySelector(".gallery");
galleryRefs.addEventListener("click", onShowBigImage);

(function createGalleryMarkup() {
  const elementCreateGallery = galleryItems
    .map(({ original, preview, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery--original" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>
    `;
    })
    .join("");
  galleryRefs.insertAdjacentHTML("beforeend", elementCreateGallery);
})();

function onShowBigImage(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  let totalImageSrc = e.target.dataset.source;

  const modal = basicLightbox.create(
    `<img src="${totalImageSrc}" width="900" height="700">`
  );
  modal.show();

  if (modal.visible()) {
    window.addEventListener("keydown", onPressKeyESC);
  }

  function onPressKeyESC(cls) {
    if (cls.code === "Escape") {
      modal.close();
      window.removeEventListener("keydown", onPressKeyESC);
    }
  }
}
