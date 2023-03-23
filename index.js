let newPost = document.getElementById("new-post");
let postTitle = document.getElementById("post-title");
let postContent = document.getElementById("post-content");
let msgEle = document.getElementById("msg");
let blogList = document.getElementById("blog-list");

let blogData = [];

newPost.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");
  postValidation();
});

const postValidation = () => {
  if (postTitle.value === "" || postContent.value === "") {
    msgEle.innerHTML = "Post and title should not be empty";
  } else {
    msgEle.innerHTML = "";
    getData();
  }
};

const getData = () => {
  blogData.unshift({
    title: postTitle.value,
    content: postContent.value,
  });
  // blogData["title"] = postTitle.value;
  // blogData["content"] = postContent.value;
  localStorage.setItem("data", JSON.stringify(blogData));
  renderBlogPost();
};

const renderBlogPost = () => {
  blogList.innerHTML = "";

  blogData.map((post, idx) => {
    blogList.innerHTML += `
    <div id=${idx}>
    <h3>${post.title}</h3>
    <div id="blog-content">
      <p>${post.content}</p> 
      <div>
        <span onclick="updateBlogPost(this)" class="material-icons option"> edit_note </span>
        <span onclick="deleteBlogPost(this)" class="material-icons option delete"> delete </span>
      </div>
    </div>
    <hr>
    <br>
    </div>
    `;
  });

  postTitle.value = "";
  postContent.value = "";
};

const deleteBlogPost = (e) => {
  // e.parentElement.parentElement.parentElement.remove();
  blogData.splice(e.parentElement.parentElement.parentElement.remove(), 1);
  localStorage.setItem("data", JSON.stringify(blogData));
};

const updateBlogPost = (e) => {
  postContent.value = e.parentElement.previousElementSibling.innerHTML;
  postTitle.value =
    e.parentElement.parentElement.previousElementSibling.innerHTML;

  // e.parentElement.parentElement.parentElement.remove();
  deleteBlogPost(e);
};

(() => {
  blogData = JSON.parse(localStorage.getItem("data")) || [];
  renderBlogPost();
})();
