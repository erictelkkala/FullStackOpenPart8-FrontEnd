import { useQuery } from "@apollo/client"
import React from "react"
import { GET_BOOKS } from "../database/queries"

const Books = (props) => {
    // Get the states of the query and assign them to variables
    const { loading, error, data } = useQuery(GET_BOOKS)
    // Data element above return an object with an array, so we need to get access to the array with data.allBooks
    const books = data ? data.allBooks : []

    // eslint-disable-next-line react/prop-types
    if (!props.show) {
        return null
    }
    // Loading and error messages
    if (loading) {
        return <div>loading...</div>
    } else if (error) {
        console.log(error)
        return <div>error</div>
    } else {
        console.log("Books", books)
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
                        {books.map((book) => (
                            <tr key={book.title}>
                                <td>{book.title}</td>
                                {/* book.author is now an object, so need to specify the field to use */}
                                <td>{book.author.name}</td>
                                <td>{book.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Books
