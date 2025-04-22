import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../views/BookList.vue'
import BookDetails from '../views/BookDetails.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BookList
    },
    {
      path: '/book/:id',
      name: 'book-details',
      component: BookDetails,
      props: true
    }
  ]
})

export default router