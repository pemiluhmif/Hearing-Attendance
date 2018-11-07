var totpProvider = new jsOTP.totp();
var secret = "sample";
var hearingKe = 1;
var scriptUrl = "";

var onCek = false;

const NIM_REGEX = /(135|182)[0-9]{5}/;

function closeDialog(modalName){
  $("#modal-"+modalName).removeClass("modal-open");
  if(modalName=="cek"){
    onCek = false;
  }else if(modalName=="result"){
    $("#nimInput").focus();
  }
}

function openDialog(modalName){
  $("#modal-"+modalName).addClass("modal-open");
}

function kirim(hearingNo,nimData){
  closeDialog("cek");
  openDialog("load");

  $.ajax({
    method: "GET",
    url: scriptUrl,
    data:{
      hearing:hearingNo,
      nim:nimData,
      token:totpProvider.getOtp(secret)
    }
  })
  .done(function( msg ) {
    closeDialog("load");
    $("#nimInput").val("");

    if(msg=="Sukses"){
      openDialog("result");
    }else{
      openDialog("fail");
    }




  }).fail(function( jqXHR, textStatus ) {
    alert("Failed: " + textStatus);
  });
}

function check(){
  var nimData = $("#nimInput").val();

  if(NIM_REGEX.test(nimData)){
    $("#nimInput").blur();
    $("#nimCek").text(nimData);
    $("#button-send").attr("onClick","kirim("+hearingKe+","+nimData+");");
    openDialog("cek")
    onCek = true;

  }else {
    alert("Invalid NIM");
  };
}

$( document ).ready(function() {
  if(localStorage.getItem("secret")){
    secret = localStorage.getItem("secret");
  }else{
    alert("Error, no secret");
  }

  if(localStorage.getItem("scriptUrl")){
    scriptUrl = localStorage.getItem("scriptUrl");
  }else{
    alert("Error, URL not supplied")
  }

  if(localStorage.getItem("hearing")){
    hearingKe = localStorage.getItem("hearing");
  }
});

$(document).keypress(function(key) {
  if(key.which == 13) {
    if(onCek){
      $("#button-send").click();
    }else{
      closeDialog("result");
      closeDialog("fail");
    }
  }
});
