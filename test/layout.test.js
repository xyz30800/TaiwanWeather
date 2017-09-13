import { expect } from 'chai';
import React from 'react';
import { shallow, render, mount } from 'enzyme';

import Layout from 'components/layout';

const wrapper = shallow(<Layout/>);

describe('Layout Component Test', () => {
	it('should be a div element', () => {
		const expectValue = wrapper.name();
		expect(expectValue).to.equal('div');
	});

	it('有 class: public-container-header ', () => {
  		const expectValue = wrapper.find('.public-container-header');
    	expect(expectValue).to.have.length(1);
  	});

	it('測試 Layout div 數量 應該有三個 ', () => {
  		//const complexComponents = wrapper.find('.public-container-header');
  		const expectValue = wrapper.findWhere(n => n.type() === 'div');
    	expect(expectValue).to.have.length(3);
  	});

  	it('測試 Layout h1 數量 應該有一個 ', () => {
  		//const complexComponents = wrapper.find('.public-container-header');
  		const expectValue = wrapper.findWhere(n => n.type() === 'h1');
    	expect(expectValue).to.have.length(1);
  	});

  	
});