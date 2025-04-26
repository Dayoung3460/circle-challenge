<template>
  <div v-if="book" class="book-details">
    <div class="book-content">
      <div class="book-info">
        <h1>{{ book.title }}</h1>
        <h2>by {{ book.author }}</h2>
        <div class="details">
          <p><strong>ISBN:</strong> {{ book.isbn }}</p>
          <p><strong>Price:</strong> ${{ book.price }}</p>
          <p><strong>Available:</strong> {{ book.availableStock }}</p>
        </div>
        
        <button 
          @click="purchaseBook" 
          :disabled="isPurchasing || book.availableStock === 0"
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
    book.value = response.data.book
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
    await fetchBookDetails()
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

.book-info {
  padding: 1rem;
}

.details {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.purchase-button {
  background-color: #f0c80f;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.2s;
}

.purchase-button:hover:not(:disabled) {
  background-color: #f0c80f;
}

.purchase-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>