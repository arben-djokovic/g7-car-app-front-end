import axios from 'axios'

export default axios.create({
    baseURL: 'https://bumpcar-api.herokuapp.com/',
    headers: { "Content-Type": "application/json"  },
})