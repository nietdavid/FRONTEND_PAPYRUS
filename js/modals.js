// js/modals.js

// Déclare dans la portée globale
window.ouvrirModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'block';
  };
  
  window.fermerModal = function(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
  };
  
  // Fermer si clic en dehors
  window.addEventListener('click', function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', function () {
    // Ouvrir la modale "ajouter"
    const btnAjouter = document.getElementById('open-ajouter');
    if (btnAjouter) {
      btnAjouter.addEventListener('click', function () {
        ouvrirModal('modal-ajouter');
      });
    }
  
    // Ouvrir la modale "modifier"
    const boutonsModifier = document.querySelectorAll('.action-btn');
    boutonsModifier.forEach(btn => {
      btn.addEventListener('click', function () {
        ouvrirModal('modal-modifier');
      });
    });
  
    // Confirmation suppression
    let produitASupprimer = null;
    const boutonsSupprimer = document.querySelectorAll('.btn-danger');
    const btnConfirmerSuppression = document.getElementById('btn-confirm-supprimer');
  
    boutonsSupprimer.forEach(btn => {
      btn.addEventListener('click', function () {
        produitASupprimer = this.closest('tr');
        ouvrirModal('modal-confirmation');
      });
    });
  
    if (btnConfirmerSuppression) {
      btnConfirmerSuppression.addEventListener('click', function () {
        if (produitASupprimer) {
          produitASupprimer.remove();
          produitASupprimer = null;
        }
        fermerModal('modal-confirmation');
      });
    }
  });
  