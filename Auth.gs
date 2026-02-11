function getCurrentUserEmail_() {
  return (Session.getActiveUser().getEmail() || '').trim().toLowerCase();
}

function assertAuthorizedUser_() {
  const email = getCurrentUserEmail_();

  if (!email) {
    throw new Error(
      "No s'ha pogut obtenir el correu de l'usuari. Revisa que la Web App estigui publicada per al domini."
    );
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const usersSheet = ss.getSheetByName(SHEETS.USUARIS);

  if (!usersSheet || usersSheet.getLastRow() < 2) {
    throw new Error(
      "No hi ha usuaris autoritzats. Executa setupSistema() i afegeix usuaris al full USUARIS_AUTORITZATS."
    );
  }

  const rows = usersSheet.getRange(2, 1, usersSheet.getLastRow() - 1, 3).getValues();

  const authorized = rows.some(([rowEmail, _name, active]) => {
    const normalized = String(rowEmail || '').trim().toLowerCase();
    return normalized === email && (active === true || String(active).toUpperCase() === 'TRUE');
  });

  if (!authorized) {
    throw new Error(`Accés denegat per a ${email}.`);
  }

  return email;
}
