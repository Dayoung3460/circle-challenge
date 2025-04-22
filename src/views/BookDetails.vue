<template>
  <div v-if="book" class="book-details">
    <div class="book-content">
      <div class="book-image">
        <img :src="book.coverImage" :alt="book.title">
      </div>
      
      <div class="book-info">
        <h1>{{ book.title }}</h1>
        <h2>by {{ book.author }}</h2>
        <p class="description">{{ book.description }}</p>
        <div class="details">
          <p><strong>ISBN:</strong> {{ book.isbn }}</p>
          <p><strong>Price:</strong> ${{ book.price }}</p>
          <p><strong>Available:</strong> {{ book.stockCount }} copies</p>
        </div>
        
        <button 
          @click="purchaseBook" 
          :disabled="isPurchasing || book.stockCount === 0"
          class="purchase-button"
        >
          {{ purchaseButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bookService } from '../services/api'

const route = useRoute()
const router = useRouter()
const book = ref(null)
const isPurchasing = ref(false)

const purchaseButtonText = computed(() => {
  if (book.value?.stockCount === 0) return 'Out of Stock'
  if (isPurchasing.value) return 'Processing...'
  return 'Purchase Book'
})

const fetchBookDetails = async () => {
  try {
    const response = await bookService.getBookById(route.params.id)
    book.value = response.data
  } catch (error) {
    console.error('Error fetching book details:', error)
  }
}

const purchaseBook = async () => {
  if (isPurchasing.value) return
  
  isPurchasing.value = true
  try {
    await bookService.purchaseBook(book.value.id)
    alert('Purchase successful!')
    await fetchBookDetails() // Refresh book details to update stock count
  } catch (error) {
    alert('Failed to purchase book. Please try again.')
    console.error('Error purchasing book:', error)
  } finally {
    isPurchasing.value = false
  }
}

onMounted(() => {
  fetchBookDetails()
})
</script>

<style scoped>
.book-details {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.book-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.book-image img {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.book-info {
  padding: 1rem;
}

.description {
  margin: 1.5rem 0;
  line-height: 1.6;
}

.details {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.purchase-button {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.2s;
}

.purchase-button:hover:not(:disabled) {
  background-color: #3aa876;
}

.purchase-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>