import storeClass from './storeClass'
import StoreContext from './StoreContext'


const initialState = stateRefs => ({
  store: new storeClass({
    stateRefs: stateRefs,
    // DBlink: "https://schedule.tochkadostupa.spb.ru/not-to-scale/api",
    DBlink: "http://localhost:3000/not-to-scale/api",
  }),
})

export {
  storeClass,
  StoreContext,
  initialState,
}
