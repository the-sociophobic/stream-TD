import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Div100vh from 'react-div-100vh'

import { StoreContext, initialState } from 'utils/store'
import browserType from 'utils/browserType'
import { registerListeners, unregisterListeners } from 'utils/preventMobileScrolling'

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

    this.appRef = React.createRef()
    this.footerRef = React.createRef()
    this.canvasRef = React.createRef()
  }

  componentDidMount = () => {
    // registerListeners(this.appRef.current, true)
    registerListeners(this.footerRef.current)
    registerListeners(this.canvasRef.current)
  }

  componentWillUnmount = () => {
    // unregisterListeners(this.appRef.current, true)
    unregisterListeners(this.footerRef.current)
    unregisterListeners(this.canvasRef.current)
  }

  render = () =>
    <Router>
      <StoreContext.Provider value={this.state}>
        <Div100vh>
          <Canvas elemRef={this.canvasRef} />
          <div
            className="App"
            ref={this.appRef}
          >
            {browserType() === "uiwebview" ?
              <OpenBrowser />
              :
              <div className="content">
                <Switch>
                  <Route exact path="/">
                    <Spekt />
                  </Route>
                  <Route path="/admin">
                    <Admin />
                  </Route>
                </Switch>
              </div>
            }
            <Footer elemRef={this.footerRef} />
          </div>
        </Div100vh>
      </StoreContext.Provider>
    </Router>
}

export default App
