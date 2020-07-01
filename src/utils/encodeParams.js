export default params => 
  Object.entries(params)
    .map(key => key.map(encodeURIComponent).join("="))
      .join("&")
