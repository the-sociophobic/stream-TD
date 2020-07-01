import axios from 'axios'
import fetch from 'isomorphic-unfetch'


const fakeTime = 1500

const tickets = [
  "real",

  // "fake",
  "outdated",
  "many-devices",
]


export default class store {
  constructor(props) {
    this.props = props

    axios.defaults.headers.post['Accept'] = "*/*"
    axios.defaults.headers.post['Content-Type'] = "json"
  }

  authUser = async (ticket, userId) => {
    console.log("res")
    
    const res = (await axios.post(
      this.props.DBlink,
      {
        ticket: ticket,
        userId: userId,
      }
    )).data


    return res
  }
    // new Promise((res, rej) => setTimeout(() => res({
    //   token: tickets.includes(ticket) ? ticket : "fake"
    // }), fakeTime))

  checkTicket = async ticket =>
    new Promise((req, res) => setTimeout(() => res(ticket === "123"), fakeTime))
    // (await axios.post(
    //   this.props.DBlink,
    //   {
    //     ticket: ticket,

    //   }
    // )).data
}