var firebaseConfig = {
    apiKey: "AIzaSyB8y4EXUiNQ3ebrGnkLXVvRlv3L60c7dwY",
    authDomain: "my-blog-demo-caf19.firebaseapp.com",
    projectId: "my-blog-demo-caf19",
    storageBucket: "my-blog-demo-caf19.appspot.com",
    messagingSenderId: "148234902340",
    appId: "1:148234902340:web:66f436bd07d3266c0e9511"
  };
  // Initialize Firebase
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

   let postCollection = document.querySelector("#posts-collection");
 
 const db = firebase.firestore();
 
 function renderBlog(doc){
     let div = document.createElement("div");
     div.setAttribute("class", "col-md-4");
   
     let h2 = document.createElement("h2");
     let p = document.createElement("p");
     let small = document.createElement("small");
     let inputUp = document.createElement("input");
     let inputDel = document.createElement("input");
 
     div.setAttribute('data-id', doc.id);
     h2.textContent = doc.data().postName;
     small.textContent = doc.data().createdAt;
     p.textContent = doc.data().postContent;
 
     
     inputUp.setAttribute("type","submit");
     inputUp.setAttribute("value","Update");
     inputUp.setAttribute("class","btn btn-success");
     inputUp.setAttribute("id","up");
 
 
     inputDel.setAttribute("type","submit");
     inputDel.setAttribute("value","Delete");
     inputDel.setAttribute("class","btn btn-danger");
     inputDel.setAttribute("id","del");
 
 
     div.appendChild(h2);
     div.appendChild(small);
     div.appendChild(p);
     div.appendChild(inputUp);
     div.appendChild(inputDel);
 
     postCollection.appendChild(div);
 
     inputUp.addEventListener('click', (e) => {
         e.stopPropagation();
         let id = e.target.parentElement.getAttribute('data-id');
         let name = doc.data().postName;
         let date = doc.data().createdAt;
         let content = doc.data().postContent;
         let author = doc.data().author;
 
         window.localStorage.setItem("id", id); 
         window.localStorage.setItem("name", name); 
         window.localStorage.setItem("date", date ); 
         window.localStorage.setItem("content", content); 
         window.localStorage.setItem("author", author); 
 
         window.location = './update.html';
         
     });
     
     inputDel.addEventListener('click', (e) => {
         e.stopPropagation();
         let id = e.target.parentElement.getAttribute('data-id');
         db.collection('posts').doc(id).delete();
     });
 
 
 }
 
 db.collection('posts').orderBy('createdAt','desc').get().then(snapshot => {
     snapshot.docs.forEach(doc => {
         renderBlog(doc);
     });
 })   
 
 