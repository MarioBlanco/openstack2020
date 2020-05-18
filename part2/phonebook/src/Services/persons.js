import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {

    const request = axios.post(baseUrl, newObject)
    return request
        .then(response => response.data)

}

const update = (name, newObject) => {
    const request=axios.get(baseUrl)
                    .then(all=>{
                        return all.data.find(p=>p.name===name)
                    })
                    .then(filtered=>filtered!==null?filtered.id:axios.Cancel("id not found"))
                    .then(theId=>axios.put(`${baseUrl}/${theId}`,newObject))

    //const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data).catch(error => {
        console.log('fail')
    })
}

const toDelete = (name)=>{
    const request = axios.get(baseUrl)
                        .then(all=>{
                            //console.log(`toDelete:${name}`)
                            return all.data.find(p=>p.name===name)
                        })
                        .then(filtered=>filtered.id)
                        .then(theId=>axios.delete(`${baseUrl}/${theId}`))

    return request.then(response=>response.data)
}

export default { getAll, create, update, toDelete}