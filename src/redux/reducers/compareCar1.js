export var compareCar1 = (state = 26, action) => {
    if (action.type === 'changeCompareCar1') {
        return action.playload
    }
    else {
        return state
    }
}