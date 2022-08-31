/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../database/queries"

const LoginForm = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [ login, result ] = useMutation(LOGIN, { 
        // onError: (error) => {
        //     setError(error.graphQLErrors[0].message)
        // }
    })
    
    // Check for the token in the result and save it to localstorage if it exists
    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem("user-token", token)
            // Return back to the main page after a token has been set
            props.setPage("authors")
        }
    }, [result.data])
    
    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }
    
    if (props.show !== true) {
        return null
    }
    
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                username
                    <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm