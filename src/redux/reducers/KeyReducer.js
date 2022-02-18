export var searchInput = (state = 0, action) => {
    if (action.type === 'changeSearchInput') {
        return action.playload
    }
    else {
        return state
    }
}