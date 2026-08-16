 const sections = document.querySelectorAll("section[id], article[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function removeActive() {
      navLinks.forEach(link => link.classList.remove("active"));
    }

    navLinks.forEach(link => {

      link.addEventListener("click", function () {

        removeActive();
        this.classList.add("active");

      });

    });

    window.addEventListener("scroll", () => {

      let current = "";

      sections.forEach(section => {

        const sectionTop = section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }

      });

      removeActive();

      const activeLink = document.querySelector(`.nav-links a[href="#${current}"]`);

      if (activeLink) {
        activeLink.classList.add("active");
      }

    });