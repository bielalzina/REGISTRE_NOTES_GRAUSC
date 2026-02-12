# APP REGISTRE NOTES GRAUS C (Google Apps Script)

Aquest repositori conté la **Etapa 1** de l'aplicació per registrar qualificacions de GRAUS C.

## Objectiu de l'Etapa 1

Posar la base tècnica perquè puguis entendre i executar el projecte de forma progressiva:

1. Estructura de dades a Google Sheets.
2. Control d'accés per correu del Google Workspace.
3. Formulari web per donar d'alta alumnes.
4. Llistat bàsic d'alumnes.

> En les properes etapes afegirem gestió de graus/mòduls/UF i registre de qualificacions.

---

## 1) Preparació

1. Crea un full de càlcul de Google (Google Sheets).
2. Obre **Extensions > Apps Script**.
3. Copia els fitxers `.gs`, `.html` i `appsscript.json` d'aquest repositori dins el projecte d'Apps Script.
4. Desa i executa la funció `setupSistema()` una vegada.
5. Afegeix els correus autoritzats al full `USUARIS_AUTORITZATS`.
6. Publica com a **Web App**:
   - Executar com: **Tu**
   - Qui té accés: **Usuaris del teu domini**

---

## 2) Fulls que crea automàticament

- `ALUMNES`
- `CURSOS_ACADEMICS`
- `GRAUS_C`
- `MODULS_FORMATIUS`
- `UNITATS_FORMATIVES`
- `MATRICULES`
- `QUALIFICACIONS`
- `USUARIS_AUTORITZATS`
- `CONFIG`

---

## 3) Flux actual (Etapa 1)

- L'usuari entra a la web.
- Es valida el seu correu corporatiu contra `USUARIS_AUTORITZATS`.
- Si està autoritzat, pot:
  - Donar d'alta alumnes.
  - Veure el llistat d'alumnes.

---

## 4) Properes etapes

- **Etapa 2**: alta i manteniment de GRAUS C, mòduls i UF.
- **Etapa 3**: matrícula d'alumnes per curs acadèmic.
- **Etapa 4**: registre de qualificacions de MF i UF.
- **Etapa 5**: consultes, informes i validacions avançades.

