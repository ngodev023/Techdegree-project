/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance: 
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/*** 
 * `quotes` array 
***/
let quotes = [{quote: "Frankly, my dear, I don't give a damn.",
               source: "Clark Gable",
               citation: "Gone With The Wind",
               year: 1939
              },
              {quote: "Our greatest glory is, not in never falling, but in rising every time we fall.",
               source: "Oliver Goldsmith",
               citation: "The Vicar of Wakefield",
               year: 1762
              },
              {quote: "Here's looking at you, kid.",
               source: "Humphrey Bogart",
               citation: "Casablanca",
               year: 1942
              },
              {quote: "The voyage of the best ship is a zigzag line of a hundred tacks.",
               source: "Ralph Waldo Emerson",
               citation: "Self-Reliance",
               year: "1950's"
              },
              {quote: "That's one small step for man, one giant leap for mankind.",
               source: "Neil Armstrong",
               citation: "Apollo 11",
               year: 1969
              },
              {quote: "Many of life's faiilures are people who did not realize how close they were to success when they gave up.",
               source: "Thomas Edison",
               citation: "From Telegraph to Light Bulb with Thomas Edison",
               year: 1877
              },
              {quote: "Float like a butterfly, sting like a bee.",
               source: "Muhammad Ali",
               citation: "Heavyweight Championship",
               year: 1964
              },
              {quote: "I have never let my schooling interfere with my education.",
               source: "Mark Twain",
               citation: "Ad-A Daisy Air Rifle",
               year: 1907
              },
              {quote: "When I'm good, I'm very good. When I'm bad, I'm better.",
               source: "Mae West",
               citation: "I'm No Angel",
               year: 1933
              },
              {quote: "It is a time for martyrs now, and if I am to be one, it will be for the cause of brotherhood. That's the only thing that can save this country.",
               source: "Malcolm X",
               citation: "Crowd speech",
               year: "Feb. 19, 1965"
              }
            ]


/***
 * `getRandomQuote` function
***/
let getRandomObject = () =>  quotes[Math.floor(Math.random() * quotes.length)];

/***
 * `printQuote` function
***/
function printQuote () {
  let getRandomQuote = getRandomObject();
  let quoteBox = document.getElementById('quote-box');
  quoteBox.innerHTML= `<p class="quote">${getRandomQuote.quote}</p>
  <p class="source">${getRandomQuote.source}<span class="citation">${getRandomQuote.citation}</span><span class="year">${getRandomQuote.year}</span></p>`;
}


/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);