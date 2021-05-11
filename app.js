/// 1) Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

// let numberRequest = axios.get('http://numbersapi.com/22?json').then(res => {
// 	console.log(res.data);
// });

// 2) Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// let multipleNumbers = [42, 32, 11];
// let numberRequest = axios.get(`http://numbersapi.com/${multipleNumbers}?json`).then(res => {
// 	console.log(res.data);
// });

// 3) Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// const numberRequests = [];
// for (let i = 0; i < 4; i++) {
// 	numberRequests.push(axios.get('http://numbersapi.com/22?json'));
// }

// const resolvedPromises = Promise.all(numberRequests);

// resolvedPromises.then(arr => {
// 	let ul = document.createElement('ul');
// 	for (let num of arr) {
// 		let li = document.createElement('li');
// 		li.innerText = num.data.text;
// 		ul.append(li);
// 	}
// 	document.body.append(ul);
// });

//Part 2 - deck of cards

// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonlds”).

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// axios
// 	.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
// 	.then(res => {
// 		return axios.get(`https://deckofcardsapi.com/api/deck/${res['data']['deck_id']}/draw/?count=1`);
// 	})
// 	.then(res => {
// 		addCardToDom(res);
// 		return axios.get(`https://deckofcardsapi.com/api/deck/${res['data']['deck_id']}/draw/?count=1`);
// 	})
// 	.then(res => {
// 		addCardToDom(res);
// 	});

function addCardToDom(res) {
	let img = document.createElement('img');
	img.src = res['data']['cards'][0]['image'];
	document.querySelector('.img-container').append(img);
}

// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

let deck_id;
let remaining;
axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(res => {
	deck_id = res;
});

document.querySelector('.deck-form').addEventListener('click', e => {
	e.preventDefault();

	if (remaining === 0) {
		document.querySelector('.output').innerText = 'No more cards left!';
	} else {
		axios.get(`https://deckofcardsapi.com/api/deck/${deck_id['data']['deck_id']}/draw/?count=1`).then(res => {
			remaining = res['data']['remaining'];
			addCardToDom(res);
		});
	}
});
