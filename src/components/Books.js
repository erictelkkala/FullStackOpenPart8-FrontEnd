import { gql, useQuery } from "@apollo/client"
import React from "react"

const Books = (props) => {
    const GET_BOOKS = gql`
        query {
            allBooks {
                title
                author
                published
            }
        }
    `

    // Get the states of the query and assign them to variables
    const { loading, error, data } = useQuery(GET_BOOKS)

    // eslint-disable-next-line react/prop-types
    if (!props.show) {
        return null
    }
    // Loading and error messages
    if (loading) {
        return <div>loading...</div>
    } else if (error) {
        return <div>error</div>
    } else {
        console.log("Books", data)
        return (
            <div>
                <h2>books</h2>

                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>author</th>
                            <th>published</th>
                        </tr>
                        {data.allBooks.map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Books
