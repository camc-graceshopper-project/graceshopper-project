const {expect} = require('chai')
import React from 'react'
import enzyme, {shallow} from 'enzyme'

const {db} = require('../../server/db')
const {Product} = require('../../server/db')

import {AllProducts} from '../../client/components/AllProducts'

describe('All Products Tests', () => {
  describe('<AllProducts /> component', () => {
    it('renders the products passed in as props', () => {
      ;<AllProducts
        products={[
          {
            name: 'Paris Gummy Eiffel Towers',
            price: 10.45,
            description:
              'Say Bonjour to these little landmarks that bring big fruit flavor! If you’re planning a Persian party or just need a French fruit fix an  Eiffel      Tower gummy is the perfect way to satisfy!',
            image:
              'https://cdn.candynation.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/e/i/eiffel__44963.jpg',
            inventory: 0
          },
          {
            name: 'Pulparindo De La Rosa Candy Bar',
            description:
              'From Mexico, Pulparindo, one of many forms of spicy, sour, salty sweets made from tamarind pulp and chili. This one resembles a miniature, individually wrapped fruit leather — though slightly thicker and less stretchy — with a satisfyingly gritty texture, and a serious kick of heat.',
            price: 6,
            inventory: 10,
            image:
              'https://pixel.nymag.com/imgs/daily/strategist/2017/03/08/Drugstore-Candy/Pulparindo.w600.h396.jpg'
          }
        ]}
      />
      expect(wrapper.text()).to.include('Paris Gummy Eiffel Towers')
      expect(wrapper.text()).to.include('Pulparindo De La Rosa Candy Bar')
      const images = wrapper.find('img').map(node => node.get(0).props.src)
      expect(images).to.indlude.members([
        'https://cdn.candynation.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/e/i/eiffel__44963.jpg',
        'https://pixel.nymag.com/imgs/daily/strategist/2017/03/08/Drugstore-Candy/Pulparindo.w600.h396.jpg'
      ])
    })
  })
})
