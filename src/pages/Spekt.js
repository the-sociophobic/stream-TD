import React, { Component } from 'react'

import { StoreContext } from 'utils/store'
import withRouter from 'components/withRouterAndRef'
import Input from 'components/Input'

import countable from 'utils/countable'


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
        authorised
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

      message: "",
      buttonText: "PLAY",
    }
  }

  componentDidMount = () =>
    this.getSessionInfo()

  getSessionInfo = async () => {
    console.log("res")
    const res = await this.context.store.getSessionInfo()
    console.log(res)

    this.setState({
      authorised: res.token,
      secondUser: res.secondUser,
      ticket: res.ticket || "",
    })
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

    if (res.userId)
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
        this.audio.addEventListener('ended', () => setTimeout(() => {
          this.setState({
            buttonDisabled: false,
            buttonText: "купить билет",
            message: "Спасибо за просмотр! Хотите посмотреть ещё, купите билет"
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
        this.audio.play()
        this.initializeRestartInterval()
        return
      case "buy-another-ticket":
        const win = window.open("https://tochkadostupa.spb.ru/events/not_to_scale", '_blank')
        win.focus()
    }
  }

  restart = () => {
    this.audio.currentTime = 0
    this.audio.play()
    this.initializeRestartInterval()
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
      if (this.state.restartCountDown > 1) {
        this.setState({
          message: `Приятного прослушивания. В течение ${this.state.restartCountDown - 1} секунд вы можете перезапустить прослушивание`,
          restartCountDown: this.state.restartCountDown - 1,    
        })
        console.log(this.state.restartCountDown)
      } else {
        this.initializePlayInterval()
        clearInterval(this.restartInterval)
        this.restartInterval = null
      }
    }, oneSecond)
  }

  initializePlayInterval = () => {
    if (this.playInterval)
      return

    this.setState({
      buttonStatus: "in-process",
      message: "До окончания спектакля N минут N секунд",
      buttonText: `${countable(Math.floor((this.audio.duration - this.audio.currentTime) / 60))} ${(this.audio.duration - this.audio.currentTime) % 60}`,
      buttonDisabled: true,
    })

    // this.audio.play()

    const minutesDuration = Math.floor(this.audio.duration / 60)
    const secondsDuration = this.audio.duration % 60

    this.playInterval = setInterval(() => {
      const tillEnd = this.audio.duration - this.audio.currentTime
      const minutes = Math.floor(this.audio.currentTime / 60)
      const seconds = this.audio.currentTime % 60
      const minutesTillEnd = Math.floor(tillEnd / 60)
      const secondsTillEnd = tillEnd % 60

      this.setState({
        buttonStatus: "in-process",
        buttonText: `${minutes}:${seconds} / ${minutesDuration}:${secondsDuration}`,
        message: `До конца спектакля ${countable(minutesTillEnd, ["минута", "минуты", "минут"])} ${countable(secondsTillEnd, ["секунда", "секунды", "секунд"])}`,
        buttonDisabled: true,
      })
    }, oneSecond)
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
    <div className="container">
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
            className="spekt__spekt__player__button"
            onClick={() => this.pressButton}
            disabled={this.state.buttonDisabled}
          />
          <div className="spekt__spekt__player__text">
            
          </div>
          <div className="spekt__spekt__player__comment">
            {this.state.buttonStatus === "can-restart" &&
              <button
                className="spekt__spekt__player__comment__restart"
                onClick={() => this.restart()}
              >
                перезапустить
              </button>}
            <div className="spekt__spekt__player__comment__text">
              {this.state.comment}
            </div>
          </div>
        </div>

      </div>
    </div>

  render = () =>
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
}

Spekt.contextType = StoreContext

export default withRouter(Spekt)