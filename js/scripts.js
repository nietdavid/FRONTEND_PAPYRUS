// === URL de l'API ===
const url = 'https://localhost:44384/Produit';

//AU CHARGEMENT : Requête GET pour afficher les produits dans le tableau
fetch(url)
  .then((resp) => {
    if (!resp.ok) {
      throw new Error('Erreur de réseau :' + resp.statusText);
    }
    return resp.json(); // Convertit la réponse en JSON
  })
  .then((data) => {
    data.forEach(produit => {
      initTableau(produit); // Ajoute chaque produit dans le tableau
    });
  })
  .catch((error) => {
    console.error('Erreur lors du chargement des produits :', error);
  });

// Fonction pour créer une ligne dans le tableau avec un produit
function initTableau(produit) {
  const tableau = document.getElementById('tableau');

  const tr = document.createElement("tr");
  const tdArticle = document.createElement("td");
  const tdLib = document.createElement("td");
  const tdStkAlert = document.createElement("td");
  const tdStkPhy = document.createElement("td");
  const tdQte = document.createElement("td");
  const tdUnit = document.createElement("td");
  const tdActions = document.createElement("td");

  // Remplissage des cellules avec les données du produit
  tdArticle.textContent = produit.codart;
  tdLib.textContent = produit.libart;
  tdStkAlert.textContent = produit.stkale;
  tdStkPhy.textContent = produit.stkphy;
  tdQte.textContent = produit.qteann;
  tdUnit.textContent = produit.unimes;

  // Bouton Modifier
  const btnModifier = document.createElement("button");
  btnModifier.className = "btn action-btn";
  btnModifier.textContent = "Modifier";
  btnModifier.addEventListener("click", function () {
    ouvrirModal("modal-modifier");
    // À compléter : pré-remplissage des champs de la modale avec les données du produit
  });

  // Bouton Supprimer
  const btnSupprimer = document.createElement("button");
  btnSupprimer.className = "btn btn-danger";
  btnSupprimer.textContent = "Supprimer";

  // Ajout d'un event listener sur le bouton "Supprimer" pour chaque ligne de produit
  btnSupprimer.addEventListener("click", function () {
    // Ouvre la modale de confirmation
    ouvrirModal("modal-confirmation");

    // Récupère le bouton de confirmation dans la modale
    const confirmer = document.getElementById("btn-confirm-supprimer");

    // Associe une action lors du clic sur le bouton "Confirmer la suppression"
    confirmer.onclick = function () {
        // Envoie une requête DELETE vers l'API avec le codart du produit à supprimer
        fetch(url, {
            method: 'DELETE', // Méthode HTTP DELETE
            headers: {
                'Content-Type': 'application/json' // Indique qu'on envoie du JSON
            },
            body: JSON.stringify({ codart: produit.codart }) // On envoie l'objet Produit (ici juste codart)
        })
        .then(response => {
            // Vérifie si la réponse de l'API est OK (succès)
            if (!response.ok) {
                // Si erreur, lève une exception avec le message d'erreur HTTP
                throw new Error('Erreur lors de la suppression : ' + response.statusText);
            }
            // Si la suppression a réussi côté API :
            tr.remove(); // Supprime la ligne <tr> correspondante dans le tableau HTML (côté frontend)
            fermerModal("modal-confirmation"); // Ferme la modale de confirmation
        })
        .catch(error => console.error(error)); // En cas d'erreur réseau ou autre, affiche l'erreur dans la console
    };
});

  tdActions.appendChild(btnModifier);
  tdActions.appendChild(btnSupprimer);

  // Ajout des cellules à la ligne
  tr.appendChild(tdArticle);
  tr.appendChild(tdLib);
  tr.appendChild(tdStkAlert);
  tr.appendChild(tdStkPhy);
  tr.appendChild(tdQte);
  tr.appendChild(tdUnit);
  tr.appendChild(tdActions);

  tableau.appendChild(tr); // Ajoute la ligne au tableau
}

// GESTION DU FORMULAIRE AJOUTER
const formAjout = document.getElementById('form-ajouter');

formAjout.addEventListener('submit', function (e) {
  e.preventDefault(); // Empêche le rechargement

  // Récupération des valeurs saisies dans le formulaire
  const nouveauProduit = {
    codart: document.getElementById('codart').value,
    libart: document.getElementById('libart').value,
    stkale: parseInt(document.getElementById('stkale').value),
    stkphy: parseInt(document.getElementById('stkphy').value),
    qteann: parseInt(document.getElementById('qteann').value),
    unimes: document.getElementById('unimes').value
  };
  // Vérifications des longueurs avant l'envoi du POST
  if (nouveauProduit.codart.length > 4) {
  alert("Le code article (CODART) ne doit pas dépasser 4 caractères !");
  return;
  }

  if (nouveauProduit.libart.length > 25) {
  alert("Le libellé de l'article (LIBART) ne doit pas dépasser 25 caractères !");
  return;
  }

  if (nouveauProduit.unimes.length > 5) {
  alert("L'unité de mesure (UNIMES) ne doit pas dépasser 5 caractères !");
  return;
  }

  // Envoi de la requête POST vers l'API
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nouveauProduit)
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Erreur réseau :' + resp.statusText);
      }
      return resp.json();
    })
    .then(data => {
      initTableau(data); // Ajoute le nouveau produit dans le tableau
      fermerModal('modal-ajouter'); // Ferme la modale
      formAjout.reset(); // Réinitialise le formulaire
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout :", error);
    });
});