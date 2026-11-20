// ── 詩雨國籤運牆 Google Apps Script ──
// 使用說明：
// 1. 前往 https://script.google.com 建立新專案
// 2. 把這段程式碼全部貼進去（取代原有內容）
// 3. 點「部署」→「新增部署」→ 類型選「網路應用程式」
// 4. 執行身分：我（你的帳號）/ 存取權：所有人
// 5. 部署後複製網址，貼到 fortune.html 的 SCRIPT_URL

function doGet(e) {
  const action = e.parameter.action;
  if (action === 'getFortunes') return getFortunes();
  return ContentService.createTextOutput('ok');
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.action === 'addFortune') return addFortune(data);
  return ContentService.createTextOutput('ok');
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('籤運牆');
  if (!sheet) {
    sheet = ss.insertSheet('籤運牆');
    sheet.appendRow(['num', 'level', 'cls', 'text', 'name', 'message', 'date']);
  }
  return sheet;
}

function getFortunes() {
  const sheet = getSheet();
  const rows = sheet.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    result.push({
      num:     rows[i][0],
      level:   rows[i][1],
      cls:     rows[i][2],
      text:    rows[i][3],
      name:    rows[i][4],
      message: rows[i][5],
      date:    rows[i][6]
    });
  }
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function addFortune(data) {
  const sheet = getSheet();
  sheet.appendRow([
    data.num,
    data.level,
    data.cls,
    data.text,
    data.name,
    data.message,
    data.date
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
