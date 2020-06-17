import React, { Component } from 'react'

import { StoreContext } from 'utils/store'
import withRouter from 'components/withRouterAndRef'
import Loader from 'components/Loader'
import Input from 'components/Input'


const texts = [
  "включите на телефоне режим не беспокоить, отключите уведомления",
  "расслабьтесь",
  "мы уже скоро начнём",
  "приготовьтесь",
  "вам нужно одновременно на двух устройствах нажать на кнопку Play",
]


class Spekt extends Component {
  constructor(props) {
    super(props)

    const ticket = new URLSearchParams(window.location.search).get("ticket")
    const authorised = !ticket ? "none" : "pending"

    this.state = {
      ticket: ticket,
      /*
        real

        fake
        outdated
        many-devices

        none
        pending
      */
      authorised: authorised,
      /*
        authorised

      */
      secondUser: "",
    }
  }

  componentDidMount = () =>
    this.state.ticket &&
      this.auth()

  auth = async () => {
    // const queryParams = new URLSearchParams(window.location.search)

    // queryParams.set("ticket", this.state.ticket)
    // console.log(this.props.history)
    // this.props.history.replaceState(null, null, "?"+queryParams.toString())
    this.props.history.location.search = `?=${this.state.ticket}`
    this.setState({authorised: "pending"})

    const res = (await this.context.store.authUser(this.state.ticket)).token

    this.setState({authorised: res})
  }


  renderLogin = () =>
    <div className="spekt__login">
      {this.state.authorised === "outdated" &&
        <div className="spekt__login__error">ваш билет уже использовался</div>}
      {this.state.authorised === "many-devices" &&
        <div className="spekt__login__error">ваш билет введён более чем на 2х устройствах</div>}
      {this.state.authorised === "fake" &&
        <div className="spekt__login__error">билета с таким номером не существует</div>}

      <Input
        label="Введите номер вашего билета"
        placeholder="например: Nihi1I57R4v3"
        value={this.state.ticket}
        onChange={value => this.setState({ticket: value})}
      />
      <button
        className="button button--main"
        onClick={() => this.auth()}
      >
        войти
      </button>
    </div>

  renderSpekt = () =>
    <div className="spekt__spekt">
      
    </div>

  render = () =>
    <div className="spekt">
      <Loader disappear={this.state.authorised !== "pending"} />
      {this.state.authorised === "real" ?
        this.renderSpekt()
        :
        this.renderLogin()
      }
    </div>
}

Spekt.contextType = StoreContext

export default withRouter(Spekt)