"use strict";

/* =========================================================
   LADY CYBER
   NAVEGAÇÃO DO PORTFÓLIO
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     ELEMENTOS
  ======================================================= */

  const navLinks =
    document.querySelectorAll(".nav-link[data-section]");

  const sections =
    document.querySelectorAll("[data-nav-section]");


  /* =======================================================
     REMOVER ACTIVE
  ======================================================= */

  function removeActive() {

    navLinks.forEach(function (link) {
      link.classList.remove("active");
    });

  }


  /* =======================================================
     DEFINIR ITEM ATIVO
  ======================================================= */

  function setActive(sectionId) {

    removeActive();

    const activeLink =
      document.querySelector(
        `.nav-link[data-section="${sectionId}"]`
      );

    if (activeLink) {
      activeLink.classList.add("active");
    }

  }


  /* =======================================================
     CLIQUE NO MENU
  ======================================================= */

  navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

      const sectionId =
        this.dataset.section;

      if (!sectionId) {
        return;
      }

      setActive(sectionId);

    });

  });


  /* =======================================================
     DETECTAR SEÇÃO DURANTE O SCROLL
  ======================================================= */

  function updateActiveSection() {

    const scrollPosition =
      window.scrollY + 180;

    let currentSection =
      "inicio";


    sections.forEach(function (section) {

      const sectionTop =
        section.offsetTop;

      if (scrollPosition >= sectionTop) {

        currentSection =
          section.dataset.navSection;

      }

    });


    /*
      CORREÇÃO PARA O FINAL DA PÁGINA

      Quando o usuário chegar próximo ao final,
      Contatos será considerado ativo.
    */

    const pageBottom =
      window.innerHeight +
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight;


    if (
      pageBottom >=
      documentHeight - 50
    ) {

      const contactSection =
        document.querySelector(
          '[data-nav-section="contato"]'
        );

      if (contactSection) {
        currentSection = "contato";
      }

    }


    setActive(currentSection);

  }


  /* =======================================================
     EVENTO DE SCROLL
  ======================================================= */

  window.addEventListener(
    "scroll",
    updateActiveSection,
    {
      passive: true
    }
  );


  /* =======================================================
     ESTADO INICIAL
  ======================================================= */

  function setInitialActive() {

    const hash =
      window.location.hash.replace("#", "");


    const validHash =
      hash &&
      document.querySelector(
        `[data-nav-section="${hash}"]`
      );


    if (validHash) {

      setActive(hash);

    } else {

      updateActiveSection();

    }

  }


  setInitialActive();

});