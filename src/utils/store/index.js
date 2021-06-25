import storeClass from './storeClass'
import StoreContext from './StoreContext'

const initialState = stateRefs => ({
  store: new storeClass({
    stateRefs: stateRefs,
    DBlink: process.env.NODE_ENV === 'production' ?
      "https://tochkadostupa.spb.ru/not-to-scale/api"
      :
      "https://tochkadostupa.spb.ru/not-to-scale/api"
      // "http://localhost:3000/not-to-scale/api",
  }),
})

export {
  storeClass,
  StoreContext,
  initialState,
}
