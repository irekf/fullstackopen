import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAll = () => axios.get(baseUrl).then((resp) => resp.data)

const add = (name, number) => {
    return axios.post(baseUrl, {name, number}).then((resp) => resp.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((resp) => {resp.status})
}

const update = (id, name, number) => {
    return axios.put(`${baseUrl}/${id}`, {name, number}).then((resp) => resp.data)
}

export default {getAll, add, remove, update}