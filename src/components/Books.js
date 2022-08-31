import { useQuery } from "@apollo/client"
import React, { useState, useEffect } from "react"
import { GET_BOOKS } from "../database/queries"

const Books = (props) => {
    // Get the states of the query and assign them to variables
    const { loading, error, data } = useQuery(GET_BOOKS)
    // Data element above return an object with an array, so we need to get access to the array with data.allBooks
    const [books, setBooks] = useState([])
    // State for the filtered books
    const [filteredBooks, setFilteredBooks] = useState(books)
    // Get the list of different genres
    const genres = [...new Set(books.map(book => book.genres).flat())]
    const [genre, setGenre] = useState(null)

    // Set the book state to the data from the query
    useEffect(() => {
        setBooks(data ? data.allBooks : [])
    }, [data])

    // Set the filter when the genre is changed
    useEffect(() => {
        if (genre !== null) {
            setFilteredBooks(books.filter(book => book.genres.includes(genre)))
        } else {
            setFilteredBooks(books)
        }
    } , [genre, books])
    
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
        console.log("Books:", books)
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
                    <button onClick={() => setGenre(null)}>all genres</button>
                </div>
            </div>
        )
    }
}

export default Books
