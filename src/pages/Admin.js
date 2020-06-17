import React, { Component } from 'react'

import { StoreContext } from 'utils/store'
import generateTicketsInRange from 'utils/generateTicketsInRange'
import Input from 'components/Input'


class Admin extends Component {
  state = {
    login: "",
    password: "",
    authorised: true,
  }

  login = () => {}

  renderLogin = () =>
    <div className="admin__login">
      <Input
        value={this.state.login}
        onChange={value => this.setState({login: value})}
      />
      <Input
        password
        value={this.state.password}
        onChange={value => this.setState({login: value})}
      />
    </div>
  
  renderPanel = () =>
    <div className="admin-panel">
      {generateTicketsInRange(0, 99, "line").map(string => <div>{string}</div>)}
    </div>

  render = () =>
    <div className="admin">
      {this.state.authorised ?
        this.renderPanel()
        :
        this.renderLogin()}
    </div>
}

Admin.contextType = StoreContext

export default Admin