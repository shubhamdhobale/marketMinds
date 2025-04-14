import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p>© 2025 MarketMinds. All Rights Reserved.</p>
        <div className="flex justify-center mt-2">
          <Link to="/termsofservices" className="mx-2 hover:text-white font-semibold underline">Terms of Service</Link> | 
          <Link to="/privacypolicy" className="mx-2 hover:text-white font-semibold underline">Privacy Policy</Link>
        </div>
      </footer>
  )
}

export default Footer