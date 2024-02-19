import Navbar from "../navbar/Navbar";
import "./header.css";

export default function Banner() {
  return /*html*/ `
  <header class="header">
  <h1 class="title">
    <img src="../images/banner.jpg" class="banner" alt="Sing Page Application"/>
  </h1>
  ${Navbar()}
  </header>
  `;
}
