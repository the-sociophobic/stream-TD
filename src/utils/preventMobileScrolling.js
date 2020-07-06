const preventDefault = event => event.preventDefault()

const registerListeners = (element, zoomOnly) => {
  element.addEventListener( 'wheel', preventDefault, { passive: false } )
  // element.addEventListener( 'touchstart', preventDefault, { passive: false } )
  // element.addEventListener( 'touchend', preventDefault, { passive: false } )
  !zoomOnly && element.addEventListener( 'touchmove', preventDefault, { passive: false } )
}

const unregisterListeners = (element, zoomOnly) => {
  element.removeEventListener( 'wheel', preventDefault, { passive: false } )
  // element.removeEventListener( 'touchstart', preventDefault, { passive: false } )
  // element.removeEventListener( 'touchend', preventDefault, { passive: false } )
  !zoomOnly && element.removeEventListener( 'touchmove', preventDefault, { passive: false } )
}

export { registerListeners, unregisterListeners }