/* global describe, it, before */

import chai from 'chai';
import { Dependency, Processor } from '../../src/core/processor';

chai.expect();

const expect = chai.expect;

describe('Given an instance of Processor', () => {
  describe('When I perform a pre-process', () => {
    it('should return vale equal or less than 100', () => {
      let processor1 = new Processor()
      let lib = new Processor();

      lib.preProcess(
        new Dependency(
          processor1,
          (data, processor)=>{
            if (parseFloat(data[0]) > 100) {
              processor._results = ['100'];
            }
            processor._results = data;
          }
        )
      );
      /*processor1.performPreProcess(['100']);
      expect(lib._results[0]).to.be.equal('100');
      processor1.performPreProcess(['90']);
      expect().to.be.equal('90');
      processor1.performPreProcess(['100.1']);
      expect().to.be.equal('100');*/
    });
  });
  describe('When I perform a post-process', () => {
    it('should return vale equal or less than 100', () => {
      let lib = new Processor();

      lib.postProcess((data)=>{
        if (parseFloat(data[0]) > 100) {
          return ['100'];
        }
        return data;
      });
      expect(lib.performPostProcess(['100'])[0]).to.be.equal('100');
      expect(lib.performPostProcess(['90'])[0]).to.be.equal('90');
      expect(lib.performPostProcess(['100.1'])[0]).to.be.equal('100');
    });
  });
});