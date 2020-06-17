import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logoImg from 'img/logoVI.svg'


export default class Header extends Component {
  state = {}

  render = () =>
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img src={logoImg} />
          <h3 className="h3">Not to scale</h3>
        </div>
        <div className="header__links">
          <Link to="/">Спектакль</Link>
          <Link to="/admin">Админ панель</Link>
        </div>
      </div>
    </div>
}
