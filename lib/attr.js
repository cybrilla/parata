/**
 *  AttributeKeyNotLoadedError
 *  Exception that will be thrown if a key in the initial
 *  loaded data is not defined.
 */
function AttributeKeyNotLoadedError() {
  this.name = 'AttributeKeyNotLoadedError';
  this.message = 'Key was not loaded / found in `data`.';
}
AttributeKeyNotLoadedError.prototype = Object.create(Error.prototype);

/**
 *  AttributeValueNotSpecfied
 *  Exception that will be thrown if value for a  key
 *  is not specified.
 */
function AttributeValueNotSpecifiedError() {
  this.name = 'AttributeValueNotSpecifiedError';
  this.message = 'Value for key was not specified.';
}
AttributeValueNotSpecifiedError.prototype = Object.create(Error.prototype);

module.exports = {

  // Contains the data
  data: null,

  // Set initial data
  load: function(data) {
    this.data = data;

    return this;
  },

  // Return the data
  dump: function() {
    return this.data;
  },

  // Set an attribute
  set: function(key, value) {
    if(typeof value === 'undefined') { throw new AttributeValueNotSpecifiedError; }
    if(typeof this.data[key] === 'undefined') { throw new AttributeKeyNotLoadedError; }

    this.data[key] = value;

    return this;
  },

  // Return value for a key
  get: function(key) {
    return this.data[key];
  }

};
