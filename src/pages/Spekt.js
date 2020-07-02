import React, { Component } from 'react'

import Header from 'components/Header'

import { StoreContext } from 'utils/store'
import withRouter from 'components/withRouterAndRef'
import Input from 'components/Input'

import countable from 'utils/countable'
import secondsParse from 'utils/secondsParse'


const oneSecond = 1000

class Spekt extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticket: "",

      /*
        real

        fake
        outdated
        many-devices

        none
        pending
      */
      authorised: "pending",
      userId: "",

      /*
        real
        pending
      */
      secondUser: "pending",

      /*
        never-pressed
        buffering
        can-start
        can-restart
        in-process
        buy-another-ticket
      */
      buttonStatus: "never-pressed",

      message: "00:00",
      comment: <>Нажмите <div className="play-symbol" /> чтобы запустить<br />буферизацию</>,
    }
  }

  componentDidMount = () =>
    this.getSessionInfo()

  getSessionInfo = async () => {
    const res = await this.context.store.getSessionInfo()

    this.setState({
      authorised: res.token,
      secondUser: res.secondUser,
      ticket: res.ticket || "",
    })

    if (res.token === "real")
      setTimeout(() => this.login(), 500)
  }

  login = async () => {
    this.setState({
      authorised: "pending",
      secondUser: "pending"
    })
    
    const res = await this.context.store
      .login(
        this.state.ticket,
        () => this.setState({secondUser: "real"})
      )

    if (res.token === "real")
      this.setState({
        authorised: "real",
        ticket: res.ticket,
        texts: res.texts,
        left: res.left,
      })
    else
      this.setState({authorised: res.token})
  }


  pressButton = () => {
    const { buttonStatus } = this.state

    switch(buttonStatus) {
      case "never-pressed":
        this.audio = new Audio(this.context.store.audioURL())

        this.audio.addEventListener('canplaythrough', () =>
          this.state.buttonStatus !== "can-restart" &&
            setTimeout(() =>
              this.setState({
                buttonStatus: "can-play",
                buttonDisabled: false,
                message: `00:00/${secondsParse(this.audio.duration)}`,
                comment: <>Нажмите <div className="play-symbol" /> чтобы <br />начать спектакль</>
              })
            , oneSecond))

        this.audio.addEventListener('ended', () => setTimeout(() => {
          if (this.playInterval)
            clearInterval(this.playInterval)

          this.setState({
            buttonStatus: "buy-another-ticket",
            comment: "Спасибо за просмотр! Хотите посмотреть ещё, купите билет"
          })

          this.context.store.logout()
        }, oneSecond * 5))

        this.setState({
          buttonStatus: "buffering",
          message: "Буферизация...",
          buttonDisabled: true,
        })
        return
      case "can-play":
        this.play()
    }
  }

  restart = () => {
    this.audio.pause()
    this.audio.currentTime = 0
    if (this.playInterval) {
      clearInterval(this.playInterval)
      this.playInterval = null
    }
    this.play()
  }

  play = () => {
    if (this.playInterval)
      return

    this.setState({
      buttonStatus: "can-restart",
      buttonDisabled: true,
      message: `${secondsParse(this.audio.currentTime)}/${secondsParse(this.audio.duration)}`,
      comment: <>Вы можете перезапустить спектакль <br />в течении первых 30 секунд</>,
    })

    this.playInterval = setInterval(() => {
      if (this.audio.currentTime > 30 && this.state.buttonStatus === "can-restart")
        this.setState({
          buttonStatus: "in-process",
          comment: "",
        })

      this.setState({
        message: `${secondsParse(this.audio.currentTime)}/${secondsParse(this.audio.duration)}`,
      })
    }, oneSecond)

    this.audio.play()
  }

  buyAnotherTicket = () => {
    const win = window.open("https://tochkadostupa.spb.ru/events/not_to_scale", '_blank')
    win.focus()
  }


  renderLogin = () => {
    const error = this.state.authorised && this.state.authorised.match(/outdated|many-devices|fake/gm)
    let buttonText
    
    switch(this.state.authorised) {
      case "outdated":
        buttonText = "Билет с таким номером уже использован"
        break
      case "many-devices":
        buttonText = "Билет используется на более чем 3х устройствах"
        break
      case "fake":
        buttonText = "Билета с таким номером не существует"
        break
      default:
        buttonText = "Начать"
    }

    return (
      <div className="spekt__login">
        <div className="spekt__login__desc">
          <b>Not to scale</b> — это спектакль Энта Хэмптона и Тима Этчелса. Вам понадобятся наушники, карандаш, ластик, и лист бумаги. И второй человек. Введите номер вашего билета, нажмите кнопку «начать» и следуйте инструкциям.
        </div>
        <Input
          className={error && "form-group__input--danger"}
          placeholder="Введите номер вашего билета"
          value={this.state.ticket}
          onChange={value => this.setState({ticket: value, authorised: ""})}
        />
        <button
          className={`button button--main ${error && "button--main--danger"}`}
          onClick={() => this.login()}
          disabled={!this.state.ticket || this.state.ticket.length < 5}
        >
          {buttonText}
        </button>
      </div>
    )
  }

  renderSpekt = () =>
    <div className="spekt__spekt">

      <div className="spekt__spekt__instructions">
        1. Нажмите кнопку «начать» одновременно со вторым пользователем.
        <br />
        2. После нажатия начнётся обратный отсчёт, вам нужно нажать второй раз на play максимально одновременно
        <br />
        3. Обратите внимание, что посмотреть спектакль повторно по одному билету у вас не получится
      </div>

      <div className="spekt__spekt__player">
        <div
          className="spekt__spekt__player__button-area"
        >
          <button
            className="spekt__spekt__player__button"
            onClick={() => this.pressButton()}
            disabled={this.state.buttonDisabled}
          />
        </div>
        <div className="spekt__spekt__player__text">
          {this.state.message}
        </div>
        <div className="spekt__spekt__player__comment">
          {this.state.buttonStatus === "can-restart" &&
            <button
              className="spekt__spekt__player__comment__restart"
              onClick={() => this.restart()}
            >
              перезапустить
            </button>}
          {this.state.buttonStatus === "buy-another-ticket" &&
            <button
              className="spekt__spekt__player__comment__restart"
              onClick={() => this.buyAnotherTicket()}
            >
              купить ещё один билет
            </button>}
          <div className="spekt__spekt__player__comment__text">
            {this.state.comment}
          </div>
        </div>
      </div>

    </div>

  render = () =>
    <>
      {this.state.authorised && !this.state.authorised.match(/none|outdated|many-devices|fake/gm) &&
        <Header />}
      <div className="container">
        <div className="spekt">
          {/* <Loader disappear={this.state.authorised !== "pending"} /> */}
          {this.state.authorised === "real" ?
            this.state.secondUser === "pending" ?
              <div className="spekt__login__pending">
                Нарисуйте что-нибудь,<br />пока мы ждем второго<br />пользователя
              </div>
              :
              this.renderSpekt()
            :
            this.renderLogin()
          }
        </div>
      </div>
    </>
}

Spekt.contextType = StoreContext

export default withRouter(Spekt)