import storeClass from './storeClass'
import StoreContext from './StoreContext'


const initialState = stateRefs => ({
  store: new storeClass({
    stateRefs: stateRefs,
    // DBlink: "https://schedule.tochkadostupa.spb.ru/api/",
    DBlink: "https://localhost:3000/api/",
  }),
})

export {
  storeClass,
  StoreContext,
  initialState,
}
