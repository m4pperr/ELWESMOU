/**
 * ============================================================================
 * SCRIPT GOOGLE SHEETS (COMMANDES + SUIVI PAR TÉLÉPHONE EN DIRECT) — ELWESMOU
 * ============================================================================
 * COMMENT L'INSTALLER EN 1 MINUTE :
 * 1. Crée un nouveau Google Sheet sur https://sheets.new
 * 2. Sur la ligne 1, mets ces 11 titres de colonnes (de A1 à K1) :
 *    A: Numéro Commande | B: Date | C: Produit | D: Quantité | E: Nom Client | F: Téléphone | G: Wilaya | H: Commune | I: Type Livraison | J: Total DA | K: Statut
 * 3. Dans le menu en haut du Google Sheet, clique sur : Extensions > Apps Script
 * 4. Efface tout et colle le code ci-dessous, puis clique sur "Déployer" > "Nouveau déploiement"
 * 5. Choisis Type : "Application Web", Exécuter en tant que : "Moi", Accès : "Tout le monde" (Anyone)
 * 6. Copie l'URL obtenue (https://script.google.com/macros/s/.../exec)
 *    et colle-la à la ligne 4 de ton fichier `app.js` dans `GOOGLE_SHEET_WEBHOOK_URL` !
 * ============================================================================
 */

// 1. Réception d'une nouvelle commande depuis le site (POST)
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.orderId || '',
      data.date || new Date().toLocaleString(),
      data.productName || '',
      data.quantity || 1,
      data.customerName || '',
      "'" + (data.phone || ''), // Garde le 0 initial des numéros algériens (05/06/07)
      data.wilaya || '',
      data.commune || '',
      data.deliveryType || '',
      data.totalDA || '',
      data.status || '⏳ قيد التأكيد (En attente d\'appel)' // Colonne K : tu peux modifier ce texte dans Google Sheet !
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 2. Suivi de commande en direct par numéro de téléphone (GET ?phone=0550...)
function doGet(e) {
  try {
    var phoneQuery = (e.parameter.phone || '').replace(/\s+/g, '');
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var results = [];

    // Parcourt toutes les lignes du Google Sheet (à partir de la ligne 2)
    for (var i = 1; i < rows.length; i++) {
      var rowPhone = String(rows[i][5] || '').replace(/\s+/g, '').replace(/^'/, '');
      if (phoneQuery && rowPhone.indexOf(phoneQuery) !== -1) {
        results.push({
          orderId: rows[i][0],
          date: rows[i][1],
          productName: rows[i][2],
          quantity: rows[i][3],
          wilaya: rows[i][6],
          commune: rows[i][7],
          deliveryType: rows[i][8],
          totalDA: rows[i][9],
          status: rows[i][10] || '⏳ قيد التأكيد (En attente de confirmation)'
        });
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', orders: results.reverse() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
