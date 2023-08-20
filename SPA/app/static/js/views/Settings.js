export default class  {
  

  async getHtml() {
    document.querySelector(".nav_item.settings").classList.add("active");
    document.querySelector(".nav_item.posts").classList.remove("active");
    document.querySelector(".nav_item.home").classList.remove("active");
    return `
        <h1>설정 페이지</h1>
    `;
}
}