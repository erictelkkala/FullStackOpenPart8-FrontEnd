import React from "react"
import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/Login"

const App = () => {
    const [page, setPage] = useState("authors")
    const [token, setToken] = useState(null)

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>Authors</button>
                <button onClick={() => setPage("books")}>Books</button>
                {token && <button onClick={() => setPage("add")}>Add a book</button>}
                {!token && <button onClick={() => setPage("login")}>Login</button>}
                {token && <button onClick={() => {
                    // Reset the state => rerenders the page
                    setToken(null)
                    localStorage.clear()
                    // Return back to the main page, in case the user is on a page that requires authentication
                    setPage("authors")
                } }>Logout</button>}
            </div>

            <Authors show={page === "authors"} />

            <Books show={page === "books"} />
            {token && <NewBook show={page === "add"} />}
            {!token && <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} />}
        </div>
    )
}

export default App
