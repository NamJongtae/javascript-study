import Main from './views/Main.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
}

const router = async () => {
  const routes = [
    {path: "/" , view: Main},
    {path: "/posts" , view: Posts},
    {path: "/settings" , view: Settings},
  ]

  const potentialMatches = routes.map(route => {
    return{
      route: route,
      isMatch: location.pathname === route.path
    }
  })
  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
  if(!match) {
    match={
      route: routes[0],
      isMatch: true,
    }
  }
  const view = new match.route.view();

  document.querySelector("#root").innerHTML = await view.getHtml();

  
}

window.addEventListener("popstate", router); // history stack

document.addEventListener("DOMContentLoaded", ()=> {
  document.body.addEventListener("click", e =>{ // 렌더링 구현
    if(e.target.matches("[data-link]")){
      e.preventDefault();
      navigateTo(e.target.href);
    }
  })
  router();
})

