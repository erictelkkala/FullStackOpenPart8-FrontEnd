import { gql } from "@apollo/client"

export const ADD_BOOK = gql`
    mutation AddBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`
export const GET_AUTHORS = gql`
    query ALL_AUTHORS {
        allAuthors {
            name
            born
            bookCountByAuthor
        }
    }
`

export const GET_BOOKS = gql`
    query ALL_BOOKS {
        allBooks {
            title
            published
            author {
              name
              born
              _id
            }
            _id
            genres
          }
    }
`

export const GET_BOOKS_BY_GENRE = gql`
    query ALL_BOOKS_BY_GENRE($genre: String!) {
        allBooks(genre: $genre) {
            title
            published
            author {
                name
                born
                _id
            }
            _id
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!){
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`
export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const ME = gql`
    query ME {
        me {
            username
            favoriteGenre
        }
    }
`