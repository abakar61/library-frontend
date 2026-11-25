import { Link } from 'react-router-dom'

function Links() {
  return (
    <div>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/books">Books</Link>
      {" | "}
      <Link to="/office">Office</Link>
    </div>
  )
}

export default Links
