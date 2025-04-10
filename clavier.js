document.addEventListener("DOMContentLoaded", function () {
  const keys = document.querySelectorAll(".clavier2 .key li");
  const text = document.querySelector(".clavier .text");
  const keypad = document.querySelector(".clavier2");
  const sound = document.getElementById("click-sound");
  let capslockMode = false;

  keys.forEach(function (key) {
    key.addEventListener("click", function () {
      // Visuel : touche pressée
      key.classList.add("pressed");
      setTimeout(() => key.classList.remove("pressed"), 100);

      // Jouer le son
      if (sound && sound.readyState >= 2) {
        sound.currentTime = 0;
        sound.play().catch(e => console.warn("Son bloqué :", e));
      }

      // Gestion du texte à afficher
      const isCaps = this.classList.contains("capslock");
      const isSuppr = this.classList.contains("sup");
      const isEspace = this.classList.contains("espace");
      const isTab = this.classList.contains("tab");
      const isEsc = this.classList.contains("echappe");

      // Cas spéciaux
      if (isCaps) {
        this.classList.toggle("active");
        keypad.classList.toggle("uppercase");
        capslockMode = !capslockMode;
        this.innerText = capslockMode ? "MAJ" : "min";
      } else if (isSuppr) {
        text.textContent = text.textContent.slice(0, -1);
      } else if (isEspace) {
        text.textContent += " ";
      } else if (isTab) {
        text.textContent += "\t";
      } else if (isEsc) {
        text.textContent = "";
      } else {
        // Texte de la touche (icônes = on prend l'attribut data-key si présent)
        let keyText = this.dataset.key || this.innerText.trim();

        // Si c'est une icône et pas de texte, on ignore
        if (!keyText) return;

        // Gestion des majuscules
        text.textContent += capslockMode
          ? keyText.toUpperCase()
          : keyText.toLowerCase();
      }
    });
  });
});
