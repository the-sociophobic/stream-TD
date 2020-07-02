import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { StoreContext, initialState } from 'utils/store'
import browserType from 'utils/browserType'

import Spekt from 'pages/Spekt'
import Admin from 'pages/Admin'
import Footer from 'components/Footer'
import Canvas from 'components/Canvas'
import OpenBrowser from 'components/OpenBrowser'

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
          {browserType() === "uiwebview" ?
            <OpenBrowser />
            :
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
          }
          <Footer />
        </div>
      </StoreContext.Provider>
    </Router>
}

export default App
