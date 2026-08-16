"use strict";

/* =========================================================
   LADY CYBER
   NAVEGAÇÃO PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const navLinks =
    document.querySelectorAll(".nav-links a");

  if (!navLinks.length) {
    return;
  }


  /* =======================================================
     REMOVER BOTÃO ATIVO
  ======================================================= */

  function removeActive() {

    navLinks.forEach((link) => {

      link.classList.remove("active");
      link.removeAttribute("aria-current");

    });

  }


  /* =======================================================
     ATIVAR BOTÃO CORRETO
  ======================================================= */

  function activateLink(link) {

    if (!link) {
      return;
    }

    removeActive();

    link.classList.add("active");

    link.setAttribute(
      "aria-current",
      "location"
    );

  }


  /* =======================================================
     CLIQUE NOS BOTÕES
  ======================================================= */

  navLinks.forEach((link) => {

    const href =
      link.getAttribute("href");

    /*
      Somente links internos da página principal.
    */

    if (
      !href ||
      !href.startsWith("#")
    ) {
      return;
    }


    link.addEventListener(
      "click",
      (event) => {

        const target =
          document.querySelector(href);

        if (!target) {
          return;
        }

        event.preventDefault();


        /*
          Ativa EXATAMENTE o botão clicado.
        */

        activateLink(link);


        /*
          Atualiza a URL.
        */

        history.replaceState(
          null,
          "",
          href
        );


        /*
          Respeita a altura do menu fixo.
        */

        const topbar =
          document.querySelector(".topbar");

        const menuHeight =
          topbar
            ? topbar.offsetHeight
            : 0;


        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          menuHeight -
          20;


        window.scrollTo({
          top: Math.max(
            0,
            targetPosition
          ),
          behavior: "smooth"
        });

      }
    );

  });


  /* =======================================================
     BOTÃO CORRETO AO ABRIR URL COM #
  ======================================================= */

  const currentHash =
    window.location.hash;

  if (currentHash) {

    const currentLink =
      document.querySelector(
        `.nav-links a[href="${currentHash}"]`
      );

    if (currentLink) {

      activateLink(currentLink);

      return;
    }

  }


  /* =======================================================
     PADRÃO — INÍCIO
  ======================================================= */

  const homeLink =
    document.querySelector(
      '.nav-links a[href="#inicio"]'
    );

  if (homeLink) {

    activateLink(homeLink);

  }

});