import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000'
})

export const bookService = {
  getAllBooks() {
    return api.get('/books')
  },
  getBookById(id) {
    return api.get(`/books/${id}`)
  },
  purchaseBook(id) {
    return api.post(`/books/${id}/purchase`)
  }
}