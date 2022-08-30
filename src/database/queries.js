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
            author
            published
            genres
        }
    }
`
export const GET_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCountByAuthor
        }
    }
`

export const GET_BOOKS = gql`
    query {
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
export const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`