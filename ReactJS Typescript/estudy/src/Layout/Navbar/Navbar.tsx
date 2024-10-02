const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#" className="accordion-toggle">
              About
            </a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>

      <nav className="second-navbar">
        <div className="accordion-content">
          <ul>
            <li>
              <a href="#">Submenu 1</a>
            </li>
            <li>
              <a href="#">Submenu 2</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
