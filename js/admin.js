function save(){
  localStorage.setItem("hearing", $("#hearingId").val());
  localStorage.setItem("secret", $("#secretText").val());
  localStorage.setItem("scriptUrl", $("#scriptUrl").val());

  alert("sukses");
  location.reload();
}

$( document ).ready(function() {
  if(localStorage.getItem("hearing")){
    $("#hearingId").val(localStorage.getItem("hearing"));
  }

  if(localStorage.getItem("scriptUrl")){
    $("#scriptUrl").val(localStorage.getItem("scriptUrl"));
  }
});
