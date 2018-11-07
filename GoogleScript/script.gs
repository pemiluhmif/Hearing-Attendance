function doGet(e) {
  var params = JSON.stringify(e);
  var jsonData = JSON.parse(params);

  var NIM = e.parameter.nim;
  var token = e.parameter.token;
  var hearingKe = e.parameter.hearing;

  if(cekToken(token)){
    var ss = SpreadsheetApp.openById(config['sheetId']);
    var sheetAbsen = ss.getSheetByName(config['sheetName']);

    sheetAbsen.appendRow([new Date(),hearingKe,NIM]);

    return ContentService.createTextOutput("Sukses");

  }else{
    return ContentService.createTextOutput("Gagal");
  }
}

function cekToken(token){
  var dt = new Date().getTime();

  var totpObj = new TOTP();
  var otp = totpObj.getOTP(config['secret'],dt);

  if(otp==token){
    return true;
  }else{
    dt = dt - 10000;
    otp = totpObj.getOTP(config['secret'],dt);

    return (otp==token);

  }
}
