const quoteText = document.getElementById("quoteText");
const author = document.getElementById("author");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const tweetBtn = document.getElementById("tweetBtn");

// Fetch new quote
async function getQuote() {
  quoteText.innerText = "Loading...";
  author.innerText = "";

  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    quoteText.innerText = `"${data.content}"`;
    author.innerText = `— ${data.author}`;
  } catch (error) {
    quoteText.innerText = "Oops! Couldn't fetch a quote 😢";
    author.innerText = "";
  }

  // Animation refresh
  quoteText.style.animation = "none";
  author.style.animation = "none";
  setTimeout(() => {
    quoteText.style.animation = "fadeIn 1s ease";
    author.style.animation = "fadeIn 1s ease";
  }, 100);
}

// Tweet current quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const authorName = author.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + " " + authorName)}`;
  window.open(tweetUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
tweetBtn.addEventListener("click", tweetQuote);

// Load first quote automatically
getQuote();
