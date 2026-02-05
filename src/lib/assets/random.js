const random = Math.random();

const quotes = fetch("assets/quotes.json", {
	method: "GET",
	credentials: "include",
	mode: "no-cors",
})
	.then((response) => response.json())
	.then((data) => data.quotes)
	.then((quotes) => {
		document.getElementById("footer").textContent = quotes[Math.floor(random * quotes.length)];
	}).catch((error) => {
		console.error("Failed to fetch quotes", error);
		document.getElementById("footer").textContent = "Tell Mark he broke the quote grabber again!";
	})

