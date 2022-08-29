import React, { useState } from "react"
import { EDIT_AUTHOR, GET_AUTHORS } from "../database/queries"
import { useMutation } from "@apollo/client"
import Select from "react-select"

const EditAuthor = (props) => {
    const [name, setName] = useState(null)
    const [born, setBorn] = useState("")
    const options = [
        // eslint-disable-next-line react/prop-types
        ...props.authors.map((author) => ({
            value: author.name,
            label: author.name,
        })),
    ]

    // Mutation query and refetch authors after the update
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: GET_AUTHORS }],
    })

    // Custom handler to update the author, since the selected option is an object
    const handleChange = (selectedOption) => {
        setName(selectedOption.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(name)
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
                    Name
                    <Select
                        defaultValue={name}
                        onChange={handleChange}
                        options={options}
                    />
                </div>
                <div>
                    Born
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
