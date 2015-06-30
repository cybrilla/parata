/**
 *  Attr
 *  Loads, sets and retrieves data attributes for a component.
 */
function Attr() { 
  
  // Contains the data
  this.data = null;
}

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


// Set initial data
Attr.prototype.load = function(data) {
  this.data = data;

  return this;
};

// Return the data
Attr.prototype.dump = function() {
  return this.data;
};

// Set an attribute
Attr.prototype.set = function(key, value) {
  if(typeof value === 'undefined') { throw new AttributeValueNotSpecifiedError; }
  if(typeof this.data[key] === 'undefined') { throw new AttributeKeyNotLoadedError; }

  this.data[key] = value;

  return this;
};


// Return value for a key
Attr.prototype.get = function(key) {
  return this.data[key];
};

module.exports = Attr;
