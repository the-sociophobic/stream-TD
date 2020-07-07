import axios from 'axios'


export default class store {
  constructor(props) {
    this.props = props

    axios.defaults.headers.post['Accept'] = "*/*"
    axios.defaults.headers.post['Content-Type'] = "json"
    axios.defaults.withCredentials = true

  }

  getSessionInfo = async userId =>
    (await axios.post(this.props.DBlink, {userId: userId})).data

  login = async credentials => {   
    const res = (await axios.post(
      this.props.DBlink + '/login/',
      credentials,
    )).data

    // console.log(res)
    
    return res
  }

  audioURL = userId =>
    this.props.DBlink + '/stream/' + userId

  nextChapter = (userId, currentChapter) =>
    axios.post(this.props.DBlink + '/next', {
      userId: userId,
      currentChapter: currentChapter,
    })

  selectSide = async (ticket, left) =>
    await axios
      .post(
        this.props.DBlink + '/select-side/',
        {
          ticket: ticket,
          left: left,
        }
      )

  logout = async userId =>
    await axios
      .post(
        this.props.DBlink + '/logout/',
        { userId: userId }
      )
}