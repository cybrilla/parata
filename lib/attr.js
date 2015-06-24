module.exports = {

  data: null,

  load: function(data) {
    this.data = data;

    return this;
  },

  dump: function() {
    return this.data;
  },

  set: function(key, value) {
    this.data[key] = value;

    return this;
  },

  get: function(key) {
    return this.data[key];
  }

};
