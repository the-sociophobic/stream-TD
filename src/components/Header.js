import React from 'react'


 class Header extends React.Component {
  state = {}

  render = () =>
    <div className="header">
      <div className="container">
        <b>Not to Scale</b>
        <button
          className="header__exit"
          onClick={() => this.props.exit()}
        >
          выйти
        </button>
      </div>
    </div>
}

export default Header