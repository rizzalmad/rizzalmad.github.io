//Tic-Tac-Toe

const boxes = document.getElementsByClassName("box")

let turn = 0

for(let i = 0; i < boxes.length; i++) {
	const box = boxes[i]
	box.onclick = function() {
		if (isWon() || isTie()) {
			reset()
		} 
		if (box.innerHTML == "" && !isWon()) {
			box.innerHTML = giveSymbol()
			if (isWon()) {
				alert( giveSymbol() + ", You Got Me")
			} else if(isTie()) {
				alert("Oh... let's restart")
			}
			turn++
			// botMove()
		}
	}
}

function giveSymbol() {
	if (turn % 2 == 0) {
		return "X"
	} else {
		return "O"
	}
}

function isWon() {
	const winningCondition = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	]
	for(let i = 0; i < winningCondition.length; i++) {
		const condition = winningCondition[i]
		// [0,1,2] || [3,4,5] .....
		if(boxes[condition[0]].innerHTML == boxes[condition[1]].innerHTML && boxes[condition[0]].innerHTML == boxes[condition[2]].innerHTML && boxes[condition[0]].innerHTML != "") {
			return true
		}
	}
	return false
}

function isTie() {
	if(!isWon() && turn == 9) {
		return true
	} else {
		return false
	}
}

function reset() {
	for(let i = 0; i < boxes.length; i++) {
		boxes[i].innerHTML = ""
	}
	turn = 0
}

// function botMove() {
// 	let index = giveRandomIndex()
// 	while (boxes[index].innerHTML != "") {
// 		index = giveRandomIndex()
// 	}
// 	const box = boxes[index]
// 	if (box.innerHTML == "" && !isWon()) {
// 		box.innerHTML = giveSymbol()
// 		if (isWon()) {
// 			alert( giveSymbol() + " Won")
// 		} else if(isTie()) {
// 			alert("Tie")
// 		}
// 		turn++
// 	}
// }

function giveRandomIndex() {
	return Math.floor(Math.random() * boxes.length)
}


//Guessing Tags

const buttons = document.getElementById('buttons');
const grid = document.querySelector('.grid')
const tagNames = ['Thailand','Indonesia','Malaysia','Philippines','Singapore', 'Laos', 
'Vietnam', 'Cambodia', 'Brunei', 'Myanmar',];

//create buttons
for (let i = 0; i < tagNames.length; i++) {
    let newButton = document.createElement('button');
    newButton.innerHTML = tagNames[i];
    newButton.classList.add('btn');
    newButton.classList.add('btn-info');
    newButton.classList.add('mr-3');
    buttons.appendChild(newButton);
}

//pick random tagName
let randomIndex = Math.floor(Math.random() * tagNames.length);
let tag = tagNames[randomIndex];

//last done https://api.tumblr.com/v2/tagged?tag='+ tag +'&api_key=(insert key here)

fetch ('https://api.tumblr.com/v2/tagged?tag='+ tag +'&api_key=wHF9M7K0h6bzwAgqBhosUzDvLTwsn6rLJw2GLM7gMywLRJ2Krm') 
// Call the fetch function and passes the url of the API as a parameter ('https..........tag=)
.then(function(response) {

	// The code for handling data is obtainable from the API on that site e.g., tumblr
    return response.json(); // need to extract the json body content from response
})
.then(function(result){
    let items = result.response;

    for (let i = 0; i < items.length; i++) {
        if (items[i].photos != undefined) {
            const imgSrc= items[i].photos[0].original_size.url;
            const img = document.createElement('img');
            img.src = imgSrc;

            grid.appendChild(img);
        }
    }
    
})

// upon clicking images, two possibilities can happen

buttons.onclick = function (event) {
    console.log(event.target.innerHTML);
    if (event.target.innerHTML == tag) {
        alert('spot on');
        location.reload();
    } else {
        alert('opps, look again, carefully');
        location.reload();
    }
}