'use strict';

import React  from 'react'
import PrimaryNav from '../../../layout/PrimaryNav'
import PrimaryNavLink from '../../../layout/PrimaryNav/PrimaryNavLink'
import PrimaryNavLinkSeperator from '../../../layout/PrimaryNav/PrimaryNavLinkSeperator'
import Icon from '../../../atoms/Icon'

export default React.createClass({
  displayName: 'PrimaryNavExample',

  getInitialState() {
    return {
      reduce: false,
      specialFirstItem: true
    };
  },

  toggleReduce() {
    this.setState({
      reduce: !this.state.reduce
    });
  },

  toggleSpecialFirstItem() {
    this.setState({
      specialFirstItem: !this.state.specialFirstItem
    });
  },

  render() {
    return (
      <div>
        <div className="DemoPage__options">
          <input id="reduce" type="checkbox" checked={ this.state.reduce } onChange={ this.toggleReduce } />
          &nbsp;
          <label htmlFor="reduce">reduce</label>
        </div>
        <PrimaryNav reduce={ this.state.reduce }>
          <PrimaryNavLink icon="ship" active={ false } isDashboardLink={ true }>
            Menu Item 1
          </PrimaryNavLink>
          <PrimaryNavLink icon="search" active={ false }>
            Menu Item 2
          </PrimaryNavLink>
          <PrimaryNavLink icon="rocket" active={ true }>
            Menu Item 3
          </PrimaryNavLink>
          <PrimaryNavLink icon="star" active={ false }>
            Menu Item 4
          </PrimaryNavLink>
          <PrimaryNavLinkSeperator />
          <PrimaryNavLink icon="heart" active={ false }>
            Help
            &nbsp;
            <Icon icon="external-link" />
          </PrimaryNavLink>
        </PrimaryNav>
      </div>
    );
  }
});
