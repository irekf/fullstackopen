import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAll = () => axios.get(baseUrl).then((resp) => resp.data)

const add = (name, number) => {
    return axios.post(baseUrl, {name, number}).then((resp) => resp.data)
}

export default {getAll, add}