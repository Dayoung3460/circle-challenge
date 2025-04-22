<template>
  <div class="book-list">
    <h1>Welcome to Our Bookstore</h1>
    
    <div class="books-grid">
      <div v-for="book in books" 
           :key="book.id" 
           class="book-card"
           @click="navigateToBook(book.id)">
        <img :src="book.coverImage" :alt="book.title" class="book-cover">
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p class="author">by {{ book.author }}</p>
          <p class="price">${{ book.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { bookService } from '../services/api'

const router = useRouter()
const books = ref([])

const fetchBooks = async () => {
  try {
    const response = await bookService.getAllBooks()
    books.value = response.data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

const navigateToBook = (bookId) => {
  router.push({ name: 'book-details', params: { id: bookId } })
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped>
.book-list {
  padding: 2rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.book-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.book-cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

.book-info {
  margin-top: 1rem;
}

.author {
  color: #666;
  margin: 0.5rem 0;
}

.price {
  font-weight: bold;
  color: #2c3e50;
}
</style>