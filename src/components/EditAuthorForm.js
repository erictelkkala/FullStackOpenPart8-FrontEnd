import React, { useState } from "react"
import { EDIT_AUTHOR, GET_AUTHORS } from "../database/queries"
import { useMutation } from "@apollo/client"

const EditAuthor = () => {
    const [name, setName] = useState("")
    const [born, setBorn] = useState("")
    // Mutation query and refetch authors after the update
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: GET_AUTHORS }],
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        await editAuthor({ variables: { name, setBornTo: parseInt(born) } })
        // Reset the form
        setName("")
        setBorn("")
    }

    return (
        <div>
            <h2>Edit author</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name
                    <input
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    ></input>
                </div>
                <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">Update author</button>
            </form>
        </div>
    )
}

export default EditAuthor
