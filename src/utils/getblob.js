export const getBlob=(base64String)=>{
  
  var bytes = window.atob(base64String.split(",")[1]);
  var array = [];
  for (var i = 0; i < bytes.length; i++) {
    array.push(bytes.charCodeAt(i));
  }
  var blob = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
    return blob

}