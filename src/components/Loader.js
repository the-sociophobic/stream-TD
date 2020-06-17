import React, { Component } from 'react'
import logoImg from 'img/logoVI.svg'


export default class extends Component {
  state = {
    transparent: false,
    hidden: false,
    hide: () => this.setState({hidden: true}),
    halfTransparent: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.disappear) {
      state.transparent = true
      setTimeout(() => state.hide(), 1000)
    }
    return state
  }

  render = () => (
    <div className={
      "loader " +
      (this.state.transparent && "loader--transparent") +
      " " +
      (this.state.hidden && "loader--hidden") +
      " " +
      this.props.className
    }>
      <img src={logoImg} />
    </div>
  )
}