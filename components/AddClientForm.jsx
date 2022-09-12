import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../constants/mutations/clientMutations"
import { GET_CLIENTS } from "../constants/queries/clientQueries"

export default function AddClientForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }){
      try{
        const { clients } = cache.readQuery({ query: GET_CLIENTS })
        cache.writeQuery({
          query: GET_CLIENTS,
          variables: {},
          data: { clients: [...clients, addClient] }
        })
      }catch{(error)=>{console.log(error)}}
    }
  })

  function handleSubmit(e)
  {
    e.preventDefault()
    // console.log(name, email, phone)
    if(name === "" || email === "" || phone === "") return alert("Pls fill in all fields")
    addClient()
    setName("")
    setEmail("")
    setPhone("")
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="name" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
