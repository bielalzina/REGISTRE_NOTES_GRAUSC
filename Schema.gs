const SHEETS = {
  ALUMNES: 'ALUMNES',
  CURSOS: 'CURSOS_ACADEMICS',
  GRAUS: 'GRAUS_C',
  MODULS: 'MODULS_FORMATIUS',
  UFS: 'UNITATS_FORMATIVES',
  MATRICULES: 'MATRICULES',
  QUALIFICACIONS: 'QUALIFICACIONS',
  USUARIS: 'USUARIS_AUTORITZATS',
  CONFIG: 'CONFIG'
};

const HEADERS = {
  ALUMNES: [
    'NUM_DOCUMENT',
    'TIPUS_DOCUMENT',
    'NOM',
    'LLINATGE_1',
    'LLINATGE_2',
    'DATA_ALTA'
  ],
  CURSOS: ['ID_CURS', 'NOM_CURS', 'ACTIU'],
  GRAUS: ['CODI_GRAU', 'NOM_GRAU', 'ACTIU'],
  MODULS: ['CODI_MF', 'CODI_GRAU', 'NOM_MF', 'TE_UF', 'ACTIU'],
  UFS: ['CODI_UF', 'CODI_MF', 'NOM_UF', 'ACTIU'],
  MATRICULES: ['ID_MATRICULA', 'NUM_DOCUMENT', 'CODI_GRAU', 'ID_CURS', 'DATA_MATRICULA'],
  QUALIFICACIONS: [
    'ID_QUALIFICACIO',
    'ID_MATRICULA',
    'TIPUS_ITEM',
    'CODI_ITEM',
    'QUALIFICACIO',
    'DATA_REGISTRE',
    'USUARI_REGISTRE'
  ],
  USUARIS: ['EMAIL', 'NOM_COMPLET', 'ACTIU'],
  CONFIG: ['CLAU', 'VALOR']
};

function setupSistema() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.keys(SHEETS).forEach((key) => {
    const name = SHEETS[key];
    let sheet = ss.getSheetByName(name);

    if (!sheet) {
      sheet = ss.insertSheet(name);
    }

    const headers = HEADERS[key];
    ensureHeaderRow_(sheet, headers);
  });

  seedInitialData_();
}

function ensureHeaderRow_(sheet, headers) {
  const existing = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const isSame = headers.every((h, idx) => existing[idx] === h);

  if (!isSame) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
}

function seedInitialData_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const cursosSheet = ss.getSheetByName(SHEETS.CURSOS);

  if (cursosSheet.getLastRow() === 1) {
    cursosSheet
      .getRange(2, 1, 3, 3)
      .setValues([
        ['2024-2025', '2024-2025', true],
        ['2025-2026', '2025-2026', true],
        ['2026-2027', '2026-2027', true]
      ]);
  }

  const configSheet = ss.getSheetByName(SHEETS.CONFIG);
  if (configSheet.getLastRow() === 1) {
    configSheet.getRange(2, 1, 1, 2).setValues([['VERSION_APP', 'ETAPA_1']]);
  }
}
