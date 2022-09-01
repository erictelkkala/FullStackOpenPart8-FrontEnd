import { useQuery } from "@apollo/client"
import React, { useState, useEffect } from "react"
import { GET_BOOKS, GET_BOOKS_BY_GENRE } from "../database/queries"

const Books = (props) => {
    // Get the states of the query and assign them to variables
    const { loading, error, data } = useQuery(GET_BOOKS)
    // Data element above return an object with an array, so we need to get access to the array with data.allBooks
    const [books, setBooks] = useState([])
    // State for the filtered books
    const [filteredBooks, setFilteredBooks] = useState(books)
    // Get the list of different genres
    const genres = [...new Set(books.map(book => book.genres).flat())]
    const [genre, setGenre] = useState("")

    // eslint-disable-next-line no-unused-vars
    const { loading: loadingBooks, error: errorBooks, data: dataBook, refetch: refetchBooks } = useQuery(GET_BOOKS_BY_GENRE, {
        variables: { genre }
    })


    // Set the book state to the data from the query
    useEffect(() => {
        setBooks(data ? data.allBooks : [])
    }, [data])

    // Set the filter when the genre is changed
    useEffect(() => {
        // Define an unnamed async function and call it immediately after
        (async () => {
            if (genre !== "") {
                // Refetch the query, since it gets the variable from a state
                const { data } = await refetchBooks()
                setFilteredBooks(data.allBooks)
            } else {
                setFilteredBooks(books)
            }
        })()
    } , [genre, books])
    
    // eslint-disable-next-line react/prop-types
    if (!props.show) {
        return null
    }

    // Loading and error messages
    if (loading || loadingBooks) {
        return <div>loading...</div>
    } else if (error) {
        console.log(error || errorBooks)
        return <div>error</div>
    } else {
        console.log("Books:", filteredBooks)
        return (
            <div>
                <h2>books</h2>
                {genre && <p>In genre: <b>{genre}</b></p>}
                <table>
                    <tbody>
                        <tr>
                            <th></th>
                            <th>author</th>
                            <th>published</th>
                        </tr>
                        {filteredBooks.map((book) => (
                            <tr key={book.title}>
                                <td>{book.title}</td>
                                {/* book.author is now an object, so need to specify the field to use */}
                                <td>{book.author.name}</td>
                                <td>{book.published}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    {/* Map the genres to buttons */}
                    {genres.map((genre) => (
                        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
                    ))}
                    {/* Reset the filter */}
                    <button onClick={() => setGenre("")}>all genres</button>
                </div>
            </div>
        )
    }
}

export default Books
