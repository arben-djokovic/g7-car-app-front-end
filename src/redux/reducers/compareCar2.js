export var compareCar2 = (state = '', action) => {
    if (action.type === 'changeCompareCar2') {
        return action.playload
    }
    else {
        return state
    }
}