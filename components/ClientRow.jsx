import { FaTrash } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { DELETE_CLIENT } from "../constants/mutations/clientMutations"
import { GET_CLIENTS } from "../constants/queries/clientQueries"

export default function ClientRow({ client }) 
{
  const [deleteClient] = useMutation(DELETE_CLIENT, 
    { 
      variables: { id: client.id }, 
      // refetchQueries: [{ query: GET_CLIENTS }]
      // v instead we update the cache and send the response we get from deleteClient to remove it from the cache
      update(cache, { data: { deleteClient } }){
        try{
          const { clients } = cache.readQuery({ query: GET_CLIENTS })
          cache.writeQuery({ // here we edit the clients query, we manually filter out the deleted client
            query: GET_CLIENTS,
            data: { clients: clients.filter(client => client.id !== deleteClient.id) }
            // ^ data will now be without the deleted client
            // however we must communicate this change to InMemoryCache by merging to it
          })
        }catch{(e)=>{console.log(e)}}
      }
    })

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash/>
        </button>
      </td>
    </tr>
  )
}
