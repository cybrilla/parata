var expect = require('chai').expect,
    fs = require('fs-extra'),
    attr = require('../../lib/attr.js');

describe('Attributes Mixin', function(){

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
});
