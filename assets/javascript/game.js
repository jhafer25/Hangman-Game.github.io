$(document).ready(function() {
	var easyWords = [
	 	'broncos',
	 	'test',
	 	'look',
	 	'easy'
	];
	var mediumWords = [
	 	'medium',
	 	'juniper',
	 	'Battle',
	 	'Mississippi'
	];
	var hardWords = [
	 	'Optomology',
	 	'Exhausted',
	 	'Perpetual',
	 	'Superbowl'
	];
	var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];
	var currentWord = '';
	var remainingLetters = 0;
	var lettersForAnswer = 0;
	var wrongLetterGuesses = [];
	var numOfWins = 0;
	var numOfLosses = 0;
	var numOfGuesses = 15;
	var answerArray = [];
	var currentWordLetters = [];
	var letterBtn;

	function startGame(currentWord){
		currentWord = currentWord.toLowerCase();
 		currentWordLetters = currentWord.split("");
		for(var i = 0; i < currentWordLetters.length; i++) {
				answerArray[i] = ' _ ';
		}
		remainingLetters = currentWordLetters.length;
		var blankSpaces = answerArray.join(' ');
		$('#display').html(blankSpaces);

		for(var i=0; i<letters.length; i++){
	        letterBtn = $("<button>");
	        letterBtn.addClass("btn-danger letter-button letter");
	        letterBtn.attr("data-letter", letters[i]);
	        letterBtn.html(letters[i]);
	        $('#buttons').append(letterBtn);
	    }
	    $('.letter-button').click(function(){
		    var guessedLetter = $(this).attr("data-letter");
		    guesses(guessedLetter);
		    $(this).prop('disabled', true);
		    $(this).addClass('btn-disabled');
		});
	}
	function guesses(letter){
		var letterGuessed = letter.toLowerCase();
 		var letterInWord = false;
 		var letterAlreadyGuessed = false;
 		for(var j = 0; j < currentWordLetters.length; j++) {
		 	if (currentWordLetters[j] === letterGuessed) {
	 			remainingLetters--;
		 		answerArray[j] = letterGuessed;
	 			$('#display').html(answerArray);
	 			letterInWord = true;
	 		}
	 	}
	 	if(!letterInWord){
	        $('#guessesLeft').html(numOfGuesses);
	        wrongLetterGuesses.push(letterGuessed);
			$('#wrongGuesses').append(letterGuessed);
	 	}
	 	gameComplete();
  	}
	function gameComplete(){
		numOfGuesses --;
	 	$('#guessesLeft').html(numOfGuesses);
		currentWord = currentWord.toLowerCase();
	    if(currentWord === answerArray.join("")){
	        numOfWins++;
	        alert("You won!! Choose a difficulty to play again!");
	        $('#win-counter').html(numOfWins);
	        $('.letter-button').prop('disabled', true);
	        $('.letter-button').addClass('btn-disabled');
	        gameOverInstructions()
	    }
	    else if(numOfGuesses === 0){
	    	numOfLosses ++;
	        $('#loss-counter').html(numOfLosses);
	        alert("You lost. Choose a difficulty to play again!");
	        $('.letter-button').prop('disabled', true);
	        $('.letter-button').addClass('btn-disabled');
	        gameOverInstructions()
	    }
	    
	}
	function gameOverInstructions(){
		instructionsDiv = $('<div>');
       	instructionsDiv.addClass('instructionTxt');
       	instructionsDiv.html('Please choose a difficulty to play again!');
       	$('#display').append(instructionsDiv);
	}

	$('#easyGame').click(function(){
		currentWord = easyWords[Math.floor(Math.random() * easyWords.length)];
		numOfGuesses = currentWord.length + 7;
		answerArray = [];
		wrongLetterGuesses = [];
		$('#buttons').empty();
		$('#wrongGuesses').empty();
		$('#guessesLeft').html(numOfGuesses);
		console.log(currentWord);
		startGame(currentWord);
	});
	$('#mediumGame').click(function(){
		currentWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
		numOfGuesses = currentWord.length + 5;
		answerArray = [];
		wrongLetterGuesses = [];
		$('#buttons').empty();
		$('#wrongGuesses').empty();
		$('#guessesLeft').html(numOfGuesses);
		console.log(currentWord);
		startGame(currentWord);
	});
	$('#hardGame').click(function(){
		currentWord = hardWords[Math.floor(Math.random() * hardWords.length)];
		numOfGuesses = currentWord.length + 3;
		answerArray = [];
		wrongLetterGuesses = [];
		$('#buttons').empty();
		$('#wrongGuesses').empty();
		$('#guessesLeft').html(numOfGuesses);
		console.log(currentWord);
		startGame(currentWord);
	});
});


