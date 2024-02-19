import "./navbar.css";

export default function Navbar() {
  return `
    <nav class="navbar">
      <ul>
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <a href="/about">ABOUT</a>
        </li>
        <li>
          <a href="/notice">NOTICE</a>
        </li>
      <ul>
    </nav>
    `;
}
