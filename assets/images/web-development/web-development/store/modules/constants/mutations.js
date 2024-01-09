

const setTempData = (state, object) => {
    state.tempData = object
}
const setConstants = (state, str) => {
    state.constants = str
}
export default {
    setTempData,
    setConstants,
}
