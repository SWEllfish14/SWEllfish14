import { Link } from "react-router-dom";
export function Header() {
    return (
      <header>
        <nav>
        <h1>LUMOS MINIMA</h1>
        <Link to='/'>Home</Link>
        <Link to='/aree'>Gestione Aree</Link>
        <Link to='/'>Gestione guasti</Link>
        <Link to='/'>Chi siamo</Link>
        </nav>
      </header>
    )
  }