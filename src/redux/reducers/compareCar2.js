export var compareCar2 = (state = 27, action) => {
    if (action.type === 'changeCompareCar2') {
        return action.playload
    }
    else {
        return state
    }
}