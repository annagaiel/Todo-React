var items = []

var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged')
}

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id
  })[0]
}

ListStore = {

  listName: 'annagaiel',

  urlRoot: function(listName){
    return "http://listalous.herokuapp.com/lists/" + this.listName;
  },

  getItems: function() {
    return items
  },

  loadItems: function(listName) {
    var loadRequest = $.ajax({
      type: 'GET',
      url: this.urlRoot()
    })
    loadRequest.done(function(dataFromServer) {
      items = dataFromServer.items
      notifyComponents()
    })
  },
  addItem: function(itemDescription) {
    var creationRequest = $.ajax({
      type: 'POST',
      url: this.urlRoot() + "/items",
      data: { description: itemDescription, completed: false }
    })
    creationRequest.done(function(itemDataFromServer) {
      items.push(itemDataFromServer)
      notifyComponents()
    })
  },
  toggleCompleteness: function(itemId) {
    var item = findItemById(itemId);
    var currentCompletedValue = item.completed

    var updateRequest = $.ajax({
      type: 'PUT',
      url: this.urlRoot() + "/items/" + itemId,
      data: { completed: !currentCompletedValue }
    })
    updateRequest.done(function(itemData) {
      item.completed = itemData.completed
      notifyComponents()
    })
   },
   deleteItem: function(itemId) {
    var item = findItemById(itemId);

    var deleteRequest = $.ajax({
      type: 'DELETE',
      url: this.urlRoot() + "/items/" + itemId,
    })
    deleteRequest.done(function(deleteItemData){
      var indexOfItem =items.indexOf(item);
      console.log("item.indexof(item)",items.indexOf(item));
      items.splice(items.indexOf(item),1);
      notifyComponents()
    })
  }

}