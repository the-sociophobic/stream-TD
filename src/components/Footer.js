import React, { Component } from 'react'

import ExternalLink from 'components/ExternalLink'
import logoImg from 'img/logo.svg'
import logo2Img from 'img/logo2.png'
import logoSmallImg from 'img/logo-small.svg'


export default class Header extends Component {
  state = {}

  render = () =>
    <div className="footer" ref={this.props.elemRef} >
      <div className="container">
        <div className="footer__logo">
          <ExternalLink newTab to="https://tochkadostupa.spb.ru">
            <img src={logoImg} />
            {/* <img className="mobile-only" src={logoSmallImg} /> */}
            <img className="" src={logo2Img} />
          </ExternalLink>
        </div>
        <div className="footer__links">
          <ExternalLink newTab to="https://vdnh.ru/events/spektakl-instruktsiya-not-to-scale/">
            о проекте
          </ExternalLink>
        </div>
      </div>
    </div>
}
