export default class  {
  
  async getHtml() {
    document.querySelector(".nav_item.home").classList.remove("active");
    document.querySelector(".nav_item.posts").classList.add("active");
    document.querySelector(".nav_item.settings").classList.remove("active");
    return `
        <h1>포스트 페이지</h1>
    `;
}
}