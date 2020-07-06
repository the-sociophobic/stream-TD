import React, { Component } from 'react'

import ExternalLink from 'components/ExternalLink'
import logoImg from 'img/logo.svg'
import logoSmallImg from 'img/logo-small.svg'


export default class Header extends Component {
  state = {}

  render = () =>
    <div className="footer" ref={this.props.elemRef} >
      <div className="container">
        <div className="footer__logo">
          <ExternalLink newTab to="https://tochkadostupa.spb.ru">
            <img className="desktop-only" src={logoImg} />
            <img className="mobile-only" src={logoSmallImg} />
          </ExternalLink>
        </div>
        <div className="footer__links">
          <ExternalLink newTab to="https://tochkadostupa.spb.ru/events/not_to_scale">
            о проекте
          </ExternalLink>
        </div>
      </div>
    </div>
}
