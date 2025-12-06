const quotes = [
  { text: "Believe in yourself.", category: "motivation" },
  { text: "Life is what you make it.", category: "life" },
  { text: "Love all, trust a few.", category: "love" },
  { text: "Success is no accident.", category: "motivation" },
  { text: "Life is short, smile often.", category: "life" }
];

const quoteText = document.getElementById("quoteText");
const categoryTag = document.getElementById("categoryTag");
const categoryFilter = document.getElementById("categoryFilter");
const favList = document.getElementById("favList");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function showQuote() {
  const filter = categoryFilter.value;

  let filteredQuotes = filter === "all" 
      ? quotes 
      : quotes.filter(q => q.category === filter);

  const random = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];

  quoteText.textContent = random.text;
  categoryTag.textContent = random.category;
}

document.getElementById("newQuoteBtn").onclick = showQuote;

document.getElementById("copyBtn").onclick = () => {
  navigator.clipboard.writeText(quoteText.textContent);
  alert("Copied!");
};

document.getElementById("favBtn").onclick = () => {
  favorites.push(quoteText.textContent);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
};

function displayFavorites() {
  favList.innerHTML = "";
  favorites.forEach(f => {
    let li = document.createElement("li");
    li.textContent = f;
    favList.appendChild(li);
  });
}

categoryFilter.onchange = showQuote;

displayFavorites();
// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
tweetBtn.addEventListener("click", tweetQuote);

// Load first quote automatically
getQuote();
