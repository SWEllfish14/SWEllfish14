import { Link } from "react-router-dom";

export function Header() {
    return (
      
      <header>
        <div class= 'box'>
          <h1>LUMOS MINIMA</h1>
        </div>
        <nav>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
      <Link to='/'>Home</Link>
      </a>
      <a class="navbar-item">
      <Link to='/aree'>Gestione Aree</Link>
      </a>
      <a class="navbar-item">
      <Link to='/guasti'>Gestione guasti</Link>
      </a>

      <a class="navbar-item">
      <Link to='/'>Chi siamo</Link>
      </a>

      </div>
      </div>
</nav>


       
      </header>
    )
  }