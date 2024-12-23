import { Link } from "react-router-dom"

const PageNotFound = () => {

  return (
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>Oh no, Zoro is lost again.</p>
      <p>Sorry, we couldn’t find the page you’re looking for.</p> 
      <Link to="/">Go Back</Link>
    </div>
  )
}

export default PageNotFound;
