export var compareCar1 = (state = '', action) => {
    if (action.type === 'changeCompareCar1') {
        return action.playload
    }
    else {
        return state
    }
}