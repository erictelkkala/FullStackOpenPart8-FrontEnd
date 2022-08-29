import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from "../database/queries"

const NewBook = (props) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [published, setPublished] = useState("")
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])

    // Get the states of the query and assign them to variables
    // Then use the refetchQueries to update the data in the component and cache
    const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: GET_AUTHORS }, { query: GET_BOOKS }],
    })

    // eslint-disable-next-line react/prop-types
    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        console.log("add book...")
        await addBook({
            variables: {
                title: title,
                author: author,
                published: parseInt(published),
                genres: genres,
            },
        })
        setTitle("")
        setPublished("")
        setAuthor("")
        setGenres([])
        setGenre("")
        console.log(data)
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre("")
    }
    // Loading and error messages
    if (loading) {
        return <div>loading...</div>
    } else if (error) {
        return <div>error</div>
    } else {
        return (
            <div>
                <form onSubmit={submit}>
                    <div>
                        title
                        <input
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author
                        <input
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        published
                        <input
                            type="number"
                            value={published}
                            onChange={({ target }) =>
                                setPublished(target.value)
                            }
                        />
                    </div>
                    <div>
                        <input
                            value={genre}
                            onChange={({ target }) => setGenre(target.value)}
                        />
                        <button onClick={addGenre} type="button">
                            add genre
                        </button>
                    </div>
                    <div>genres: {genres.join(" ")}</div>
                    <button type="submit">create book</button>
                </form>
            </div>
        )
    }
}
export default NewBook
