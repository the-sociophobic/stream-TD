export default () => {
  const standalone = window.navigator.standalone,
        userAgent = window.navigator.userAgent.toLowerCase(),
        safari = /safari/.test( userAgent ),
        ios = /iphone|ipod|ipad/.test( userAgent )

  if( ios ) {
    if ( !standalone && safari )
      return "browser"
    else
      if ( standalone && !safari )
        return "standalone"
      else
        if ( !standalone && !safari )
          return "uiwebview"
  } else
    return "not iOS"
}

