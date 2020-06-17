import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { StoreContext } from 'utils/store'
import withRouter from 'components/withRouterAndRef'
import Loader from 'components/Loader'
import Input from 'components/Input'


const texts = [
  "5. включите на телефоне режим не беспокоить, отключите уведомления",
  "4. расслабьтесь",
  "3. мы уже скоро начнём",
  "2. приготовьтесь",
  "1. вам нужно одновременно на двух устройствах нажать на кнопку Play",
  "0. Можно нажимать на кнопку",
]

const oneSecond = 1000

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
        pending
      */
      secondUser: "pending",

      /*
        never-pressed
        wait-for-second-user
        countdown
        bad-timing
        can-restart
        in-process
        buy-another-ticket
      */
      buttonStatus: "never-pressed",

      message: "",
      buttonText: "PLAY",
    }
  }

  componentDidMount = () =>
    this.state.ticket &&
      this.auth()

  auth = async () => {
    this.props.history.location.search = `?=${this.state.ticket}`
    this.setState({authorised: "pending"})

    const res = (await this.context.store.authUser(this.state.ticket)).token

    this.setState({authorised: res})

    if (res === "real") {
      setTimeout(() => this.setState({secondUser: "authorised"}), oneSecond * 2)
    }
  }


  pressButton = () => {
    const { buttonStatus } = this.state

    switch(buttonStatus) {
      case "never-pressed":
        this.audio = new Audio('https://drive.google.com/u/0/uc?id=1J4mUIvLltOBGuri5XP1BBeGu1YGyNjXY&export=download')
        this.audio.addEventListener('ended', () => setTimeout(() => this.setState({
          buttonDisabled: false,
          buttonText: "купить билет",
          message: "Спасибо за просмотр! Хотите посмотреть ещё, купите билет"
        }), oneSecond * 5))
        this.setState({
          buttonStatus: "wait-for-second-user",
          message: "ждём пока второй зритель нажмёт на кнопку",
          buttonDisabled: true,
        })
        setTimeout(() => this.startCountDown(), oneSecond * 2)
        return
      case "countdown":
        if (!this.state.secondUserSucceeds) {
          this.setState({
            buttonStatus: "bad-timing",
            message: "кнопка не была нажата одновременно, попробуйте ещё раз",
            secondUserSucceeds: true,
          })
          setTimeout(() => this.startCountDown(), oneSecond * 1.5)
        }
        else {
          this.audio.play()
          this.initializeRestartInterval()
        }
        return
      case "can-restart":
        this.audio.currentTime = 0
        this.audio.play()
        this.initializeRestartInterval()
        return
      case "buy-another-ticket":
        const win = window.open("https://tochkadostupa.spb.ru/events/not_to_scale", '_blank')
        win.focus()
    }
  }

  initializeRestartInterval = () => {
    this.setState({
      buttonStatus: "can-restart",
      message: "Приятного прослушивания. В течение 30 секунд вы можете перезапустить прослушивание",
      restartCountDown: 30,
      buttonText: "Перезапустить"
    })

    if (this.restartInterval)
      clearInterval(this.restartInterval)

    this.restartInterval = setInterval(() => {
      if (this.state.restartCountDown > 0) {
        this.setState({
          message: `Приятного прослушивания. В течение ${this.state.restartCountDown - 1} секунд вы можете перезапустить прослушивание`,
          restartCountDown: this.state.restartCountDown - 1,    
        })
        console.log(this.state.restartCountDown)
      } else {
        this.setState({
          buttonStatus: "in-process",
          buttonText: "До окончания N минут N секунд",
          buttonDisabled: true,
        })
        clearInterval(this.restartInterval)
        this.restartInterval = null
      }
    }, oneSecond)
  }

  startCountDown = () => {
    if (this.restartInterval) {
      clearInterval(this.restartInterval)
      this.restartInterval = null
    }

    this.setState({
      buttonStatus: "countdown",
      buttonDisabled: true,
      buttonText: "5",
      message: texts[0]
    })

    setTimeout(() => this.setState({message: texts[1], buttonText: "4"}), oneSecond)
    setTimeout(() => this.setState({message: texts[2], buttonText: "3"}), oneSecond * 2)
    setTimeout(() => this.setState({message: texts[3], buttonText: "2"}), oneSecond * 3)
    setTimeout(() => this.setState({message: texts[4], buttonText: "1"}), oneSecond * 4)
    setTimeout(() =>
      this.setState({
        message: texts[5],
        buttonDisabled: false,
        buttonText: "PLAY",
      })
    , oneSecond * 5)
  }


  renderLogin = () =>
    <div className="spekt__login">
      {this.state.authorised === "outdated" &&
        <div className="spekt__message spekt__message--error">ваш билет уже использовался</div>}
      {this.state.authorised === "many-devices" &&
        <div className="spekt__message spekt__message--error">ваш билет введён более чем на 2х устройствах</div>}
      {this.state.authorised === "fake" &&
        <div className="spekt__message spekt__message--error">билета с таким номером не существует</div>}

      <Input
        label="Введите номер вашего билета"
        placeholder="например: Nihi1I57R4v3"
        value={this.state.ticket}
        onChange={value => this.setState({ticket: value})}
      />
      <Link to={`/not-to-scale/?ticket=${this.state.ticket}`}>
        <button
          className="button button--main"
          onClick={() => this.auth()}
        >
          войти
        </button>
      </Link>
    </div>

  renderSpekt = () =>
    <div className="spekt__spekt">
      <div className="spekt__spekt__instructions">
        1. Чтобы спектакль начался вам нужно одновременно нажать на play
        <br />
        2. Нажмите на play
        <br />
        3. После у вас начнётся обратный отсчёт, вам нужно нажать второй раз на play максимально одновременно
        <br />
        4. Обратите внимание, что посмотреть спектакль повторно по одному билету у вас не получится
      </div>
      <div className="spekt__message spekt__message--alert">
        {this.state.message}
      </div>
      <button
        className="button button--main"
        onClick={() => this.pressButton()}
        disabled={this.state.buttonDisabled}
      >
        {this.state.buttonText}
      </button>
    </div>

  render = () =>
    <div className="spekt">
      <Loader disappear={this.state.authorised !== "pending"} />
      {this.state.authorised === "real" ?
        this.state.secondUser === "pending" ?
          <div className="spekt__login__alert">подождите, пока второй пользователь залогинится...</div>
          :
          this.renderSpekt()
        :
        this.renderLogin()
      }
    </div>
}

Spekt.contextType = StoreContext

export default withRouter(Spekt)