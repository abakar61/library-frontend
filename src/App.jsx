import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LibraryLogin from './components/LibraryLogin'
import Office from './Office'
import LibraryBooks from './components/LibraryBooks'
import Links from './components/Links'

function App() {
  return (
    <BrowserRouter>
      <Links />
      <Routes>
        <Route path="/" element={<LibraryLogin />} />
        <Route path="/office" element={<Office />} />
        <Route path="/books" element={<LibraryBooks />} />
        <Route path="*" element={<LibraryLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
