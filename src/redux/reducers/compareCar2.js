export var compareCar2 = (state = 0, action) => {
    if (action.type === 'changeCompareCar2') {
        return action.playload
    }
    else {
        return state
    }
}