document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");
  
    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const url = this.getAttribute("href");
  
        fetch(url)
          .then(response => response.text())
          .then(html => {
            const temp = document.createElement("div");
            temp.innerHTML = html;
            const newContent = temp.querySelector("article");
            if (newContent) {
              content.innerHTML = newContent.innerHTML;
              history.pushState(null, "", url);
            } else {
              content.innerHTML = "<p>Could not load content.</p>";
            }
          });
      });
    });
  
    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => {
      fetch(location.pathname)
        .then(response => response.text())
        .then(html => {
          const temp = document.createElement("div");
          temp.innerHTML = html;
          const newContent = temp.querySelector("article");
          if (newContent) {
            content.innerHTML = newContent.innerHTML;
          }
        });
    });
  });
  