export var keyAction = (name) => {
    return {
        type: 'changeSearchInput',
        playload: name,
    }
}