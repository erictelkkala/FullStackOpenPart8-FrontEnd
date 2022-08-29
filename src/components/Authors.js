import { gql, useQuery } from "@apollo/client"
import React from "react"

const Authors = (props) => {
    const GET_AUTHORS = gql`
        query {
            allAuthors {
                name
                born
                bookCountByAuthor
            }
        }
    `

    // Get the states of the query and assign them to variables
    const { loading, error, data } = useQuery(GET_AUTHORS)

    // Do not show the page if it is not active
    // eslint-disable-next-line react/prop-types
    if (props.show !== true) {
        return null
    }

    // Loading and error messages
    if (loading) {
        return <div>loading...</div>
    } else if (error) {
        return <div>error</div>

        // Show the table if there are authors
    } else {
        console.log("authors", data)
        return (
            <div>
                <h2>authors</h2>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Born</th>
                            <th>Books</th>
                        </tr>
                        {data.allAuthors.map((author) => (
                            <tr key={author.name}>
                                <td>{author.name}</td>
                                <td>{author.born}</td>
                                <td>{author.bookCountByAuthor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Authors
