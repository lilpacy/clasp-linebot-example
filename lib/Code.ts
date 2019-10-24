// LINE Developersに書いてあるChannel Access Token
var accessToken = process.env.ACCESS_TOKEN;
// 自分のユーザーIDを指定します。LINE Developersの「Your user ID」の部分です。
var to = process.env.TO;

function textMessage(text) {
  return {
    type: "text",
    text: text
  };
}

// function chooseAtRandom(arrayData) {
//   var arrayIndex = Math.floor(Math.random() * arrayData.length);
//   var index = arrayIndex+2
//   return index+':'+arrayData[arrayIndex][0];
// }

function pickInOrder(arrayData, isChange) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var arrayIndex = sheet.getRange(1, 3, 1, 1).getValue();
  var index;
  if (isChange == true) {
    index = arrayIndex + 1;
    if (index < sheet.getLastRow()) {
      sheet.getRange(1, 3, 1, 1).setValue(arrayIndex + 1);
    } else {
      sheet.getRange(1, 3, 1, 1).setValue(1);
    }
    return index + ":" + arrayData[arrayIndex - 1][0];
  } else {
    index = arrayIndex;
    return arrayData[arrayIndex - 1][0];
  }
}

function getEngs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getRange(2, 1, sheet.getLastRow() - 1);
  var values = range.getValues();
  return values;
}

function getJaps() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getRange(2, 2, sheet.getLastRow() - 1);
  var values = range.getValues();
  return values;
}

export function messagePush() {
  var url = "https://api.line.me/v2/bot/message/multicast";
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + accessToken
  };

  var jap = pickInOrder(getJaps(), false);
  var eng = pickInOrder(getEngs(), true);

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var arrayIndex = sheet.getRange(1, 3, 1, 1).getValue();

  var postData = {
    to: [to],
    messages: [
      textMessage(eng + "\n" + jap + "\n" + process.env.SHEETS_URL + arrayIndex)
    ]
  };

  var options = {
    method: "post",
    headers: headers,
    payload: JSON.stringify(postData)
  };

  return UrlFetchApp.fetch(url, options);
}
