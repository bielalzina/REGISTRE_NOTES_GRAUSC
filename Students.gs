function saveAlumne(payload) {
  const userEmail = assertAuthorizedUser_();

  const data = sanitizeStudentPayload_(payload);
  validateStudentPayload_(data);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.ALUMNES);

  if (existsStudentByDocument_(sheet, data.numDocument)) {
    throw new Error(`Ja existeix un alumne amb el document ${data.numDocument}.`);
  }

  sheet.appendRow([
    data.numDocument,
    data.tipusDocument,
    data.nom,
    data.llinatge1,
    data.llinatge2,
    new Date()
  ]);

  return {
    ok: true,
    message: `Alumne registrat correctament per ${userEmail}.`
  };
}

function listAlumnes() {
  assertAuthorizedUser_();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.ALUMNES);

  if (sheet.getLastRow() < 2) {
    return [];
  }

  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
  return values.map((row) => ({
    numDocument: row[0],
    tipusDocument: row[1],
    nom: row[2],
    llinatge1: row[3],
    llinatge2: row[4],
    dataAlta: row[5]
  }));
}

function existsStudentByDocument_(sheet, numDocument) {
  if (sheet.getLastRow() < 2) {
    return false;
  }

  const docs = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat();
  return docs.some((doc) => String(doc).trim().toUpperCase() === numDocument);
}

function sanitizeStudentPayload_(payload) {
  return {
    llinatge1: String(payload.llinatge1 || '').trim(),
    llinatge2: String(payload.llinatge2 || '').trim(),
    nom: String(payload.nom || '').trim(),
    tipusDocument: String(payload.tipusDocument || '')
      .trim()
      .toUpperCase(),
    numDocument: String(payload.numDocument || '')
      .trim()
      .toUpperCase()
  };
}

function validateStudentPayload_(data) {
  if (!data.llinatge1) throw new Error('El 1r llinatge és obligatori.');
  if (!data.nom) throw new Error('El nom és obligatori.');

  const allowedTypes = ['DNI', 'NIE', 'PASSAPORT'];
  if (!allowedTypes.includes(data.tipusDocument)) {
    throw new Error(`Tipus de document no vàlid. Valors permesos: ${allowedTypes.join(', ')}`);
  }

  if (!data.numDocument) {
    throw new Error('El número de document és obligatori.');
  }
}
