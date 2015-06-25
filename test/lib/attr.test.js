var expect = require('chai').expect,
    fs = require('fs-extra'),
    Attr = require('../../lib/attr.js');

describe('Attributes Mixin', function(){

  var attr = new Attr();

  it('has `data` as its attribute', function() {
    expect(typeof attr.data).to.not.be.undefined;
  });

  describe('#set', function() {
    describe('if the correct key and value is present', function() {
      beforeEach(function() {
        attr.load({
          name: null
        });
      })

      it('sets the value correctly', function() {
        attr.set('name', 'Parata');
        expect(attr.data['name']).to.equal('Parata');
      });

      it('returns the attr object itself', function() {
        expect(attr.set('name', 'Parata')).to.equal(attr);
      });
    });

    describe('if key and value is present but not loaded initially', function() {
      beforeEach(function() {
        attr.load({
          name: null
        });
      });

      it('throws a `AttributeKeyNotLoadedError` error', function() {
        expect(function() {
          attr.set('age', 25)
        }).to.throw('AttributeKeyNotLoadedError');
      });
    });

    describe('if key exists and value is undefined', function() {
      beforeEach(function() {
        attr.load({
          name: null
        });
      });

      it('throws a `AttributeValueNotSpecifiedError` error', function() {
        expect(function() {
          attr.set('name')
        }).to.throw('AttributeValueNotSpecifiedError');
      });

    });
  });

  describe('#load', function() {
    beforeEach(function() {
      attr.load({
        name: null,
        age: null
      });
    });

    it('loads the data correctly', function() {
      expect(attr.data).to.eql({
        name: null,
        age: null
      });
    });
  });

  describe('#get', function() {
    beforeEach(function() {
      attr.load({
        name: null
      });

      attr.set('name', 'Parata');
    });

    it('returns the correct value for the key', function() {
      expect(attr.get('name')).to.equal('Parata');
    });

    it('returns undefined for an key that does\'nt exist', function() {
      expect(attr.get('age')).to.be.undefined;
    });
  });

  describe('#dump', function() {
    beforeEach(function() {
      attr.load({
        name: null,
        age: null
      });

      attr.set('name', 'Parata')
          .set('age', 25);
    });

    it('returns the correct object with key / value', function() {
      expect(attr.dump()).to.eql({
        name: 'Parata',
        age: 25
      });
    });
  });
});
