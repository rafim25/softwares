export const convertBase64ToFile = (base64String: string, fileName: string, fileType: string): File => {
  // Convert base64 to blob
  const byteString = window.atob(base64String.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  const blob = new Blob([ab], { type: fileType });
  return new File([blob], fileName, { type: fileType });
}; 