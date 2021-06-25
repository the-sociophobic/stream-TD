import React, { Component } from 'react'

import Header from 'components/Header'

import { StoreContext } from 'utils/store'
import withRouter from 'components/withRouterAndRef'
import Input from 'components/Input'

import secondsParse from 'utils/secondsParse'


const oneSecond = 1000

const PLAY = () =>
  <div className="play-symbol" />


class Spekt extends Component {
  constructor(props) {
    super(props)

    // const userId = new URLSearchParams(window.location.search).get("q")
    // const userId = window.localStorage.getItem('userId')
    const leftAsString = window.localStorage.getItem('left')
    const left = leftAsString === 'true' ?
      true
      :
      leftAsString === 'false' ?
        false
        :
        undefined

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
      // authorised: "pending",
      authorised: "real",
      // userId: userId || "",
      userId: "",

      /*
        real
        pending
      */
      // secondUser: "pending",
      secondUser: "real",

      /*
        never-pressed
        buffering
        countdown
        can-play
        can-restart
        in-process
        buy-another-ticket
      */
      buttonStatus: "never-pressed",
      currentChapter: 0,

      message: "00:00",
      comment: <>Нажмите <PLAY /> чтобы запустить<br />буферизацию</>,

      left: typeof left === 'boolean' ? left : undefined,
      canSelect: true,
    }
  }

  // componentDidMount = () =>
  //   this.getSessionInfo()

  getSessionInfo = async () => {
    // const res = await this.context.store.getSessionInfo(this.state.userId)

    this.setState({
      // authorised: res.userState,
      // secondUser: res.secondUser,
      // ticket: res.ticket || "",
      // canSelect: res.canSelect,
      // left: res.left,
      authorised: 'real',
      secondUser: 'real',
      ticket: '',
      canSelect: true,
      // left: undefined,
    })

    // if (res.userState === "real")
    //   setTimeout(() => this.login(), 500)
  }

  logout = () => {
    // window.localStorage.removeItem('userId')
    window.localStorage.removeItem('left')
    // this.context.store.logout()
    // window.location.reload(false)
    this.setState({ left: undefined })
  }

  login = async () => {
    this.setState({
      authorised: "pending",
      secondUser: "real"
    })
    
    const res = await this.context.store
      .login({
        ticket: this.state.ticket || "a",
        userId: this.state.userId,
      })

    console.log(res)

    if (res.userState === "real") {
      this.setState({
        userId: res.userId,
        authorised: "real",
        ticket: res.ticket,
        texts: res.texts,
        left: res.left,
        canSelect: res.canSelect,
        chapters: res.chapters,
        currentChapter: res.currentChapter,
        message: secondsParse(res.chapters[res.currentChapter].time),
      })

      // console.log(res)
      
      // this.props.history.push({
      //   pathname: this.props.location.path,
      //   search: "?" + new URLSearchParams({q: res.userId}).toString()
      // })
      window.localStorage.setItem('userId', res.userId)
    }
    else
      this.setState({authorised: res.userState})
  }


  initializeAudio = () => {
    this.audio = new Audio()

    this.audio.addEventListener('canplay', () =>
      this.state.buttonStatus !== "can-restart" &&
        setTimeout(() => {
          this.setState({
            buttonStatus: "countdown",
            message: `${secondsParse(this.state.chapters[this.state.currentChapter].time)}/${secondsParse(this.audio.duration)}`,
            // comment: <>Нажмите <PLAY /> чтобы <br />начать спектакль</>
            comment: this.state.texts[0]
          })
          
          this.state.texts.slice(1)
            .forEach((line, index) =>
              setTimeout(() => 
                this.setState({
                  comment: line.split('PLAY')
                    .reduce((a, b) => <>{a}<PLAY />{b}</>)
                })
              , oneSecond * (index + 1)))

          setTimeout(() =>
            this.setState({
              buttonStatus: "can-play",
              buttonDisabled: false,
            })
          , oneSecond * (this.state.texts.length - 1))
          // , 100)

        // }, oneSecond * 1)
        }, 100)
    )


    this.audio.addEventListener('ended', () => {
      // if (this.playInterval)
      //   clearInterval(this.playInterval)

      setTimeout(() => {
        this.setState({
          buttonStatus: "buy-another-ticket",
          comment: "Спасибо за просмотр! Хотите посмотреть ещё, купите билет"
        })

        this.context.store.logout(this.state.userId)
        window.localStorage.removeItem('userId')
      }, oneSecond * 5)
    })

    this.audio.preload = 'auto'
    this.audio.src = this.context.store.audioURL(this.state.userId)
    this.audio.load()
  }

  pressButton = () => {
    const { buttonStatus } = this.state

    switch(buttonStatus) {
      case "never-pressed":
        this.initializeAudio()

        this.setState({
          buttonStatus: "buffering",
          message: "Буферизация...",
          comment: "",
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
    // this.audio.currentTime = this.state.chapters[this.state.currentChapter].time
    // if (this.playInterval) {
    //   clearInterval(this.playInterval)
    //   this.playInterval = null
    // }
    this.play()
  }

  play = () => {
    // if (this.playInterval)
    //   return

    // this.audio.currentTime = this.state.chapters[this.state.currentChapter].time

    this.setState({
      buttonStatus: "can-restart",
      buttonDisabled: true,
      message: `${secondsParse(this.audio.currentTime)}/${secondsParse(this.audio.duration)}`,
      comment: <>Вы можете перезапустить спектакль <br className="desktop-only" />в течении первых 60&nbsp;секунд</>,
      // comment: this.state.chapters[this.state.currentChapter].name,
    })

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.currentTime > 60 && this.state.buttonStatus === "can-restart")
        this.setState({
          buttonStatus: "in-process",
          comment: "",
        })

      // console.log(this.audio.duration)
      this.setState({
        message: `${secondsParse(this.audio.currentTime)}/${secondsParse(this.audio.duration)}`,
        // comment: this.state.chapters[this.state.currentChapter].name
      })

      // const nextChapterStart = this.state.currentChapter < this.state.chapters.length - 1 ?
      //   this.state.chapters[this.state.currentChapter + 1].time
      //   :
      //   this.audio.duration
      // if (this.audio.currentTime > nextChapterStart) {
      //   this.context.store.nextChapter(this.state.userId, this.state.currentChapter)
      //   if (this.state.currentChapter < this.state.chapters.length - 1)
      //     this.setState({currentChapter: this.state.currentChapter + 1})
      // }
    })

    this.audio.play()
  }

  buyAnotherTicket = () => {
    const win = window.open("https://tochkadostupa.spb.ru/events/not_to_scale", '_blank')
    win.focus()
  }


  selectSide = async () => {
    // await this.context.store.selectSide(this.state.ticket, this.state.left)
    this.setState({canSelect: undefined})
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
          <b>Not to Scale</b> — это спектакль Энта Хэмптона и Тима Этчелса. Вам понадобятся две пары наушников, два простых карандаша (и один про запас), пара ластиков и 9 листов белой бумаги A4. И второй зритель, который находится рядом с вами. Для просмотра введите «Код для доступа к спектаклю» из билета на двух устройствах, нажмите кнопку «начать» и следуйте инструкциям.
        </div>
        <Input
          className={error && "form-group__input--danger"}
          placeholder="Введите код доступа к спектаклю"
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

  renderSelect = () =>
    this.state.canSelect ?
      <div className="spekt__select">
        <div className="spekt__select__desc">
          Выберите место за столом
          {typeof this.state.left !== "undefined" &&
            <button
              className="spekt__select__desc__button"
              onClick={() => this.selectSide()}
            >
              продолжить
            </button>}
        </div>
        <div className="spekt__select__picture">
          <div className="spekt__select__picture__top">
            <div className="spekt__select__picture__top__list" />
          </div>

          <div className="spekt__select__picture__bottom">
            <div
              className="spekt__select__picture__bottom__left"
              onClick={() => {
                window.localStorage.setItem('left', true)
                this.setState({ left: true })
              }}
            >
              Слева
              <div
                className={`spekt__select__picture__bottom__left__list ${
                  this.state.left === true && "spekt__select__picture__bottom__left__list--selected"}`}
              />
            </div>
            <div
              className="spekt__select__picture__bottom__right"
              onClick={() => {
                window.localStorage.setItem('left', false)
                this.setState({ left: false })
              }}
            >
              Справа
              <div
                className={`spekt__select__picture__bottom__right__list ${
                  this.state.left === false && "spekt__select__picture__bottom__right__list--selected"}`}
              />
            </div>
          </div>

        </div>
      </div>
      :
      <div className="spekt__select">
        <div className="spekt__select__wait">
          Дождитесь, пока второй пользователь выберет место и нажмите
          <button
            className="spekt__select__wait__button"
            onClick={async () => {
              // await this.getSessionInfo()
              if (typeof this.state.left === "undefined") {
                this.setState({didNotSelectAlert: true})
                setTimeout(() => this.setState({didNotSelectAlert: false}), oneSecond * 4)
              }
            }}
          >
            продолжить
          </button>
          {this.state.didNotSelectAlert && "второй пользователь ещё не определился, можете его поторопить!"}
        </div>
      </div>

  renderSpekt = () =>
    <div className="spekt__spekt">

      <div className="spekt__spekt__instructions">
        Для участия в спектакле Вам <b>понадобятся</b>:<br />
        1. Другой человек — Ваш партнер, находящийся рядом с Вами<br />
        2. Два устройства для запуска звука (ноутбук, планшет, смартфон)<br />
        3. Две пары наушников (для Вас и Вашего партнера)<br />
        4. Плоская поверхность, на которой можно рисовать (стол) — поверхность должна быть большая, чтобы на ней помещались четыре листа формата А4<br />
        5. Девять листов белой бумаги формата А4<br />
        6. Два заточенных простых карандаша + один запасной<br />
        7. Два ластика<br /><br />


        Дальше…<br /><br />

        Сядьте {this.state.left ? <b>слева</b> : <b>справа</b>} от другого участника перед поверхностью, на которой будете рисовать. Включите на телефоне режим «не беспокоить». Удостоверьтесь, что режим экономии энергии выключен и экран устройства не погаснет. Наденьте наушники. Положите перед собой по листу бумаги вертикально, в книжной ориентации.
        Остальные листы бумаги положите в стопку.<br /><br />
        1. Нажмите кнопку <PLAY /> одновременно со вторым пользователем.
        <br />
        2. После нажатия начнётся обратный отсчёт, вам нужно нажать второй раз на <PLAY /> максимально одновременно
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
      {typeof this.state.left !== "undefined" &&
        <Header
          exit={this.logout}
        />
      }

      <div className="container">
        <div className="spekt">
          {typeof this.state.left === "undefined" ?
            this.renderSelect()
            :
            this.renderSpekt()
          }
        </div>
      </div>
    </>
}

Spekt.contextType = StoreContext

export default withRouter(Spekt)