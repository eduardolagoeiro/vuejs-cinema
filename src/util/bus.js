function checkFilterHandler(payload){
  if(payload.checked){
    this[payload.category].push(payload.title);
  }else{
    let index = this[payload.category].indexOf(payload.title);
    if(index >= 0){
      this[payload.category].splice(index, 1);
    }
  }
}

export {
  checkFilterHandler
};
