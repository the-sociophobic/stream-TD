import storeClass from './storeClass'
import StoreContext from './StoreContext'


const initialState = stateRefs => ({
  store: new storeClass({
    stateRefs: stateRefs,
    // DBlink: "https://schedule.tochkadostupa.spb.ru/api/",
    DBlink: "http://localhost:3000/not-to-sale/api",
  }),
})

export {
  storeClass,
  StoreContext,
  initialState,
}
