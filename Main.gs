function doGet() {
  const template = HtmlService.createTemplateFromFile('Index');
  return template
    .evaluate()
    .setTitle('Registre Notes Graus C')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getBootstrapData() {
  const email = assertAuthorizedUser_();

  return {
    userEmail: email,
    cursosAcademics: getCursosAcademicsActius_(),
    appVersion: getConfigValue_('VERSION_APP')
  };
}

function getCursosAcademicsActius_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.CURSOS);

  if (sheet.getLastRow() < 2) return [];

  return sheet
    .getRange(2, 1, sheet.getLastRow() - 1, 3)
    .getValues()
    .filter(([, , actiu]) => actiu === true || String(actiu).toUpperCase() === 'TRUE')
    .map(([id, nom]) => ({ id, nom }));
}

function getConfigValue_(key) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.CONFIG);

  if (sheet.getLastRow() < 2) return '';

  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
  const item = rows.find(([k]) => String(k).trim() === key);
  return item ? item[1] : '';
}
