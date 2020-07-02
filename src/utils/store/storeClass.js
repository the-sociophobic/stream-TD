import axios from 'axios'


export default class store {
  constructor(props) {
    this.props = props

    axios.defaults.headers.post['Accept'] = "*/*"
    axios.defaults.headers.post['Content-Type'] = "json"
    axios.defaults.withCredentials = true
  }

  getSessionInfo = async () =>
    (await axios.get(this.props.DBlink)).data

  login = async (ticket, onSuccess) => {   
    const res = (await axios.post(
      this.props.DBlink + '/login',
      { ticket: ticket },
    )).data

    // console.log(res)

    if (res.token === "real")
      if (res.secondUser === "real")
        onSuccess && onSuccess()
      else
        setInterval(async () => {
          const res = await this.getSessionInfo()
      
          if (res.secondUser === "real")
            onSuccess && onSuccess()
        }, 2000)
    
    return res
  }

  audioURL = () => this.props.DBlink + '/stream'

  logout = async () =>
    await axios
      .get(this.props.DBlink + '/logout')
}