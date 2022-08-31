import React, {useState, useEffect} from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/Login"
import Recommendations from "./components/Recommendations"
import { useApolloClient } from "@apollo/client"

const App = () => {
    const [page, setPage] = useState("authors")
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useEffect(() => {
        const token = localStorage.getItem("user-token")
        let i = 0
        i++
        console.log(i)
        if (token) {
            setToken(token)
        }
    }, [token])

    const logout = async () => {
        // Reset the state => rerenders the page
        setToken(null)
        localStorage.clear()
        await client.resetStore()
        // Return back to the main page, in case the user is on a page that requires authentication
        setPage("authors")
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>Authors</button>
                <button onClick={() => setPage("books")}>Books</button>
                {token && <button onClick={() => setPage("add")}>Add a book</button>}
                {!token && <button onClick={() => setPage("login")}>Login</button>}
                {token && <button onClick={() => setPage("recommendations")}>Recommendations</button>}
                {token && <button onClick={logout}>Logout</button>}
            </div>

            <Authors show={page === "authors"} />

            <Books show={page === "books"} />
            {token && <NewBook show={page === "add"} />}
            {token && <Recommendations show={page === "recommendations"} />}
            {!token && <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} />}
        </div>
    )
}

export default App
