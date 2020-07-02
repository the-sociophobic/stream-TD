import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { StoreContext, initialState } from 'utils/store'
import Spekt from 'pages/Spekt'
import Admin from 'pages/Admin'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Canvas from 'components/Canvas'

import './styles/index.sass'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = initialState({
      state: this.state,
      setState: this.setState,
    })
  }

  render = () =>
    <Router>
      <StoreContext.Provider value={this.state}>
        <Canvas />
        <div className="App">
          {this.state.authorised && !this.state.authorised.match(/none|outdated|many-devices|fake/gm) &&
            <Header />}

          <div className="content">
            <Switch>
              <Route exact path="/not-to-scale/">
                <Spekt />
              </Route>
              <Route path="/not-to-scale/admin">
                <Admin />
              </Route>
            </Switch>
          </div>

          <Footer />
        </div>
      </StoreContext.Provider>
    </Router>
}

export default App
