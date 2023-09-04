function openLinkedIn() {
  window.open("https://www.linkedin.com/in/josh-rudesill/", "_blank").focus();
}

const facts = [
  "I lived in Spain for ~4 years on and off",
  "My wife is Spanish",
  "I speak European Spanish",
  "I am a wine nerd",
  "I play League of Legends",
  "JavaScript is my favorite language.. besides Spanish",
  "I am learning Rust and WASM",
  "I have visited over 12 different countries",
  "I went to school in Germany for a short time",
  "I graduated high school with a German honors chord",
  "I am a Harry Potter fanatic",
  "I have been programming for 4 years",
];
function generateFunFact() {
  // Get elements to change
  const button = document.querySelector("#fact-button");
  const textArea = document.querySelector("#fact-body");

  // On click disable the button until fact is returned
  if (button !== null) {
    button.disabled = true;
    button.textContent = "Generating..";
  } else {
    alert("Error generating fact..");
    return 0;
  }

  // Double check textArea exists..
  if (textArea === null) {
    alert("Error generating fact..");
    return 0;
  }

  // Create 12 setTimeouts each with an increasing time from now, to create a rolling effect
  let lastInterval = 100;
  for (let i = 0; i < 12; i++) {
    let nextTime = lastInterval * 1.3;
    lastInterval = nextTime;
    setTimeout(() => {
      // Change text to random fact. The last iteration will determine which fact stays inside the span
      textArea.textContent = returnRandomFact();
      console.log(returnRandomFact());
    }, nextTime);
    if (i === 11) {
      // Last iteration. Cleanup. Reset button text and re-enable it
      setTimeout(() => {
        button.disabled = false;
        button.textContent = "Click for fun fact about me";
      }, lastInterval + 100);
    }
  }

  // Generate fact and return it
  function returnRandomFact() {
    return facts[Math.floor(Math.random() * facts.length)];
  }
}

async function getQuote() {
  // We know there are 100 quotes in total
  const randomNumber = Math.ceil(Math.random() * 100);

  const quoteBody = document.querySelector("#quote-body");

  // Double check it exists
  if (quoteBody === null) {
    alert("Can't find right span somehow..");
    return 0;
  }

  // Get quote from dummy json
  const res = await fetch(`https://dummyjson.com/quotes/${randomNumber}`);

  if (res.ok) {
    // All good, parse json and replace text in the span
    const quote = await res.json();
    quoteBody.textContent = quote.quote + " -" + quote.author;
  } else {
    // Error somehow
    alert("Error in request: " + res.status);
  }
}
