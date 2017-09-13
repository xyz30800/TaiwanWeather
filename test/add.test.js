import add from '../src/add.js';
import chai from 'chai';	

const expect = chai.expect;

describe('加法函数的测试', () => {
  it('4 加 1 应该等于 5', () => {
    expect(add(4, 1)).to.be.equal(5);
  });
});
