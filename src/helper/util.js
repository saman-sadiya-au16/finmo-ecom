function productExists(arr, id) {
    return arr.some(function(el) {
      return el?.id === id;
    }); 
  }

export {
    productExists,
}