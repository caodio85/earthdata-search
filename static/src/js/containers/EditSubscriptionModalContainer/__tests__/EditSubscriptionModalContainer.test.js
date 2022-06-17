import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import actions from '../../../actions'
import { mapDispatchToProps, mapStateToProps, EditSubscriptionModalContainer } from '../EditSubscriptionModalContainer'
import { EditSubscriptionModal } from '../../../components/EditSubscriptionModal/EditSubscriptionModal'

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    isOpen: true,
    onUpdateSubscription: jest.fn(),
    onToggleEditSubscriptionModal: jest.fn(),
    subscriptionConceptId: 'SUB1',
    subscriptions: {},
    granuleSubscriptions: []
  }

  const enzymeWrapper = shallow(<EditSubscriptionModalContainer {...props} />)

  return {
    enzymeWrapper,
    props
  }
}

describe('mapDispatchToProps', () => {
  test('onToggleEditSubscriptionModal calls actions.toggleEditSubscriptionModal', () => {
    const dispatch = jest.fn()
    const spy = jest.spyOn(actions, 'toggleEditSubscriptionModal')

    mapDispatchToProps(dispatch).onToggleEditSubscriptionModal(false)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(false)
  })
})

describe('mapStateToProps', () => {
  test('returns the correct state', () => {
    const store = {
      ui: {
        editSubscriptionModal: {
          isOpen: false,
          subscriptionConceptId: 'SUB1'
        }
      }
    }

    const expectedState = {
      granuleSubscriptions: [],
      isOpen: false,
      subscriptionConceptId: 'SUB1',
      subscriptions: {}
    }

    expect(mapStateToProps(store)).toEqual(expectedState)
  })
})

describe('EditSubscriptionModalContainer component', () => {
  test('passes its props and renders a single FacetsModal component', () => {
    const { enzymeWrapper } = setup()

    expect(enzymeWrapper.find(EditSubscriptionModal).length).toBe(1)
    expect(enzymeWrapper.find(EditSubscriptionModal).props().isOpen).toEqual(true)
    expect(typeof enzymeWrapper.find(EditSubscriptionModal).props().onToggleEditSubscriptionModal).toEqual('function')
  })
})
