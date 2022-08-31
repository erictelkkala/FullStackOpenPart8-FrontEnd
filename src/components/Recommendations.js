import { useQuery } from "@apollo/client"
import React from "react"
import { ME, GET_BOOKS } from "../database/queries"

const Recommendations = (props) => {
    // Get the states of the query and assign them to variables
    const { loading, error, data } = useQuery(ME)
    const favoriteGenre = data ? data.me.favoriteGenre : ""

    // Get the states of the query and assign them to variables
    // eslint-disable-next-line no-unused-vars
    const { loading: loadingBooks, error: errorBooks, data: dataBook } = useQuery(GET_BOOKS)
    const books = dataBook ? dataBook.allBooks : []

    // State for the filtered books
    const favouriteBooks = books.filter(book => book.genres.includes(favoriteGenre))

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
        console.log("Recommendations", favouriteBooks)
        return (
            <div>
                <h2>Recommendations</h2>
                <p>Books in your favorite genre <b>{favoriteGenre}</b></p>
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>author</th>
                            <th>published</th>
                        </tr>
                        {favouriteBooks.map((book) => (
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

export default Recommendations
