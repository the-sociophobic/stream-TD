import React from 'react'
import { formatISO9075 } from 'date-fns'
import CSVReader from 'react-csv-reader'
import fetch from 'isomorphic-unfetch'

import Input from 'components/Input'
import { StoreContext } from 'utils/store'
import withRouter from 'components/withRouterAndRef'
import encodeParams from 'utils/encodeParams'


class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      password: "",
      loggedIn: process.env.NODE_ENV === 'development',
      file: undefined,
    }
  }

  loadData = async () => {
    this.setState({
      data: await (await fetch(`${this.context.store.DBlink.replace('not-to-scale/','')}/nottoscaleticket?limit=5000`)).json(),
      users: await (await fetch(`${this.context.store.DBlink.replace('not-to-scale/','')}/nottoscaleuser?limit=5000`)).json(),
    })
    // console.log(await (await fetch(`${this.context.store.DBlink.replace('not-to-scale/','')}/nottoscaleticket?limit=5000`)).json())
  }

  deleteData = async () => {
    await this.loadData()

    const { data } = this.state

    for (let index in data)
      console.log(`destroyed ${
        JSON.stringify(
          await (
            await fetch(
              `${this.context.store.DBlink.replace('not-to-scale/','')}/nottoscaleticket/destroy/` + data[index].id
            )
          ).json())}`)      
  }

  addData = async data => {
    await this.deleteData()

    for (let index in data)
      console.log(await (await fetch(
        `${this.context.store.DBlink.replace('not-to-scale/','')}/nottoscaleticket/create?` +
        encodeParams({
          number: data[index][0],
        }))).json())
      
    await this.loadData()
  }

  restore = async ticket => {
    console.log(ticket)
    await fetch(`${this.context.store.DBlink.replace('not-to-scale/','')}/nottoscaleticket/destroy/${ticket.id}`)
    await fetch(`${this.context.store.DBlink.replace('not-to-scale/','')}/nottoscaleticket/create?${encodeParams({
      number: ticket.number
    })}`)

    await this.loadData()
  }

  componentDidMount = () =>
    this.loadData()

  render() {
    const { password, loggedIn, data } = this.state

    return !loggedIn ?
      <div className="admin">
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
      <div className="admin">
        <div className="admin__file">
          <div className="container">
            загрузка .CSV файла (все данные будут перезаписаны)
            <CSVReader
              onFileLoaded={(data, fileInfo) => this.addData(data)}
            />
          </div>
        </div>

        <div className="admin__tickets">
          <div className="container">
            {data
              .map(ticket => ({
                ...ticket,
                user0: ticket.user0 && this.state.users.find(user => user.id === ticket.user0),
                user1: ticket.user1 && this.state.users.find(user => user.id === ticket.user1),
              }))
              .map((ticket, index) =>
                <div
                  key={ticket.id}
                  className="admin__tickets__item"
                >
                  <div className="admin__tickets__item__index">
                    {index + 1}.
                  </div>
                  <div className="admin__tickets__item__number">
                    {ticket.number}
                  </div>
                  <div className="admin__tickets__item__used">
                    {ticket.user0 && ticket.user1 ?
                      ticket.used ?
                        "закончил"
                        :
                        "в процессе"
                      :
                      "--"
                    }
                  </div>
                  <div className="admin__tickets__item__user--0">
                    {ticket.user0 ? `вошёл ${formatISO9075(new Date(ticket.user0.logged), 'dd/mm/yyyy').replace('2020-', '').replace('07-', '')}` : "--"}
                  </div>
                  <div className="admin__tickets__item__user--1">
                    {ticket.user1 ? `вошёл ${formatISO9075(new Date(ticket.user1.logged), 'dd/mm/yyyy').replace('2020-', '').replace('07-', '')}` : "--"}
                  </div>
                  <div
                    className="admin__tickets__item__restore"
                    onClick={() => this.restore(ticket)}
                  >
                    Обнулить
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  }
}

Admin.contextType = StoreContext

export default withRouter(Admin)