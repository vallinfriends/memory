const NUM_CARDS = 16;
const ICONS = {
  'python': 'https://img.icons8.com/color/96/null/python--v1.png',
  'c++': 'https://img.icons8.com/color/96/null/c-plus-plus-logo.png',
  'java': 'https://img.icons8.com/color/96/null/java-coffee-cup-logo--v1.png',
  'html': 'https://img.icons8.com/color/96/null/html-5--v1.png',
  'css': 'https://img.icons8.com/color/96/null/css3.png',
  'js': 'https://img.icons8.com/color/96/null/javascript--v1.png',
  'mysql': 'https://img.icons8.com/color/96/null/my-sql.png',
  'mongodb': 'https://img.icons8.com/color/96/null/mongodb.png'
};

let grid = document.getElementById('grid');
let active = null;

createCards();
generateIcons();
addClickListeners();

// adds cards to grid
function createCards() {
  for (let i = 1; i <= NUM_CARDS; i++) {
    let card = `
      <article class='card-container'>
        <div class='card-content'>
          <div class='card-front'>
            <img id='icon${i}'/>
          </div>
          <div class='card-back'></div>
        </div>
      </article>
    `;
    grid.insertAdjacentHTML('beforeend', card);
  }
}

// generates icons for cards
function generateIcons() {
  for (let key in ICONS) {
    for (let i = 0; i < 2; i++) {
      let index;
      let id;
  
      // don't rewrite cards already assigned an icon
      do {
        index = Math.floor(Math.random() * NUM_CARDS);
        id = 'icon' + (index+1);
      } while (document.getElementById(id).getAttribute('src') != null);
      
      document.getElementById(id).setAttribute('src', ICONS[key]);
      document.getElementById(id).setAttribute('alt', key);
    }
  }
}

// adds click event listener to all cards
function addClickListeners() {
  for (let card of grid.children) {
    card.children[0].addEventListener('click', function() {
      this.classList.toggle('flipped');
      if (active == null)
        active = this;
      else
        checkMatch(this);
    });
  }
}

// checks if cards match and animates as fit
function checkMatch(current) {
  let currentFront = current.children[0];
  let activeFront = active.children[0];
  let currentPic = currentFront.children[0].getAttribute('alt');
  let activePic = activeFront.children[0].getAttribute('alt');

  // don't match
  if (currentPic != activePic) {
    setTimeout(function() {
      active.classList.toggle('flipped');
      current.classList.toggle('flipped');
      active = null;
    }, 1000);
  }
  // match
  else {
    setTimeout(function() {
      activeFront.classList.add('matched');
      currentFront.classList.add('matched');
    }, 500);
    setTimeout(function() {
      activeFront.classList.remove('matched');
      currentFront.classList.remove('matched');
      active.removeEventListener('click', checkMatch);
      current.removeEventListener('click', checkMatch);
      active = null;
    }, 1250);
  }
}