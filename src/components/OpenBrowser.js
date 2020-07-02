import React from 'react'

import browserType from 'utils/browserType'


 class Header extends React.Component {
  state = {}

  render = () => {
    const links = [
      <a href="safari://the-sociophobic.github.io/not-to-scale" target="_blank">Safari</a>,
      <a href="googlechrome://the-sociophobic.github.io/not-to-scale" target="_blank">Chrome</a>,
    ]
    const firstLink = browserType() === "not iOS" ? links[1] : links[0]
    const secondLink = browserType() === "not iOS" ? links[0] : links[1]

    return (
      <div className="open-browser">
        <div className="open-browser__text">
          Пожалуйста, откройте сайт<br />в {firstLink} или {secondLink}
        </div>
      </div>
    )
  }
}

export default Header