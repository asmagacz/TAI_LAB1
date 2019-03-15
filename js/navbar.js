let nav = '<li class="nav-item"><a href="index.html" class="nav-link active" href="#">Home</a></li>' +
    '<li class="nav-item"><a class="nav-link" href="#">Blog</a></li>' +
    '<li class="nav-item"><a class="nav-link" href="quiz.html">Quiz</a></li>' +
    '<li class="nav-item"><a href="contact.html" class="nav-link" href="#">Kontakt</a></li>';

let elem = document.querySelector(".navbar");
elem.innerHTML = '<ul class="nav justify-content-center">' + nav  + '</ul>';
