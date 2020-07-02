import React from 'react'
import { format } from 'date-fns'
import CSVReader from 'react-csv-reader'
import fetch from 'isomorphic-unfetch'

import Input from 'components/Input'
import { StoreContext } from 'utils/store'
import encodeParams from 'utils/encodeParams'


class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      password: "",
      loggedIn: true,
      file: undefined,
    }
  }

  loadData = async () => {
    this.setState({
      data: await (await fetch("https://schedule.tochkadostupa.spb.ru/api/nottoscaleticket?limit=5000")).json()
    })
    // console.log(await (await fetch("https://schedule.tochkadostupa.spb.ru/api/nottoscaleticket?limit=5000")).json())
  }

  deleteData = async () => {
    await this.loadData()

    const { data } = this.state

    for (let index in data)
      console.log(`destroyed ${
        JSON.stringify(
          await (
            await fetch(
              "https://schedule.tochkadostupa.spb.ru/api/nottoscaleticket/destroy/" + data[index].id
            )
          ).json())}`)      
  }

  addData = async data => {
    await this.deleteData()

    for (let index in data)
      console.log(await (await fetch(
        "https://schedule.tochkadostupa.spb.ru/api/nottoscaleticket/create?" +
        encodeParams({
          number: data[index][0],
        }))).json())
      
    await this.loadData()
  }

  componentDidMount = () =>
    this.loadData()

  render() {
    const { password, loggedIn, data } = this.state

    return !loggedIn ?
      <div className="ZoomTicket">
        <div className="container">
          <Input
            value={password}
            onChange={value => this.setState({
              password: value,
              loggedIn: value === "aNg2R4V5",
            })}
            placeholder="пароль"
          />
        </div>
      </div>
    :
      <div className="ZoomTicket">
        <div className="container">
          загрузка .CSV файла (все данные будут перезаписаны)
          <CSVReader
            onFileLoaded={(data, fileInfo) => this.addData(data)}
          />
        </div>
        <div className="container">
          <div className="ZoomTicket__tickets">
            <h4 className="h4">Текущие билеты:</h4>
            {data.map((ticket, index) =>
              <div
                key={ticket.id}
                className="ZoomTicket__tickets__item"
              >
                <div className="ZoomTicket__tickets__item__index">
                  {index + 1}.
                </div>
                <div className="ZoomTicket__tickets__item__ticketNumber">
                  {ticket.number}
                </div>
                <div className="ZoomTicket__tickets__item__zoomURL">
                  {ticket.used ? format(new Date(ticket.used * 1000), 'dd/mm/yyyy') : "не активирован"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  }
}

Admin.contextType = StoreContext

export default Admin