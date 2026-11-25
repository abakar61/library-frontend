import { useState } from 'react'
import LibraryCard from './LibraryCard'

const booksFromDb = [
  { code: "S1", name: "Full Stack Development", price: 100 },
  { code: "S2", name: "Software Development", price: 190 },
  { code: "S3", name: "Software Engineering", price: 50 }
]

function LibraryBooks() {
  const [books, setBooks] = useState(booksFromDb)

  let totalPrice = 0
  for (let i = 0; i < books.length; i++) {
    totalPrice = totalPrice + books[i].price
  }

  return (
    <div>
      <h2>List of Books</h2>

      {books.map(book => (
        <LibraryCard key={book.code} bookInfo={book} />
      ))}

      <h3>The retail price for {books.length} books is {totalPrice}</h3>
    </div>
  )
}

export default LibraryBooks
