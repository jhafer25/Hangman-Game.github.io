$(document).ready(function() {
	var easyWords = [
	 	'bat',
		'owl',
		'spider',
		'bug',
		'rat',
		'worm',
		'cat',
		'snake',
		'fear',
		'scary',
		'boo'
	];
	var mediumWords = [
	 	'bogeyman',
		'mummy',
		'werewolf',
		'extraterrestrial',
		'mutant',
		'witch',
		'ghost',
		'vampire',
		'zombie',
		'giant',
		'villain',
		'goblin',
		'warlock'
	];
	var hardWords = [
	 	'alarming',
		'bloodcurdling',
		'frighten',
		'shocking',
		'goosebumps',
		'spine-chilling',
		'chilling',
		'hair-rising',
		'spooky',
		'creepy',
		'horrify',
		'startling',
		'eek',
		'nightmare',
		'unnerving',
		'eerie',
		'petrify'
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
	var answerArrayDisplay = [];
	var currentWordLetters = [];
	var letterBtn;

	function startGame(currentWord){
		currentWord = currentWord.toLowerCase();
 		currentWordLetters = currentWord.split("");
		for(var i = 0; i < currentWordLetters.length; i++) {
				answerArrayDisplay[i] = ' _ ';
		}
		remainingLetters = currentWordLetters.length;
		var blankSpaces = answerArrayDisplay.join(' ');
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
		 		answerArrayDisplay[j] = ' '+letterGuessed+' ';
	 			$('#display').html(answerArrayDisplay);
	 			letterInWord = true;
	 		}
	 	}
	 	if(!letterInWord){
	        $('#guessesLeft').html(numOfGuesses);
	        wrongLetterGuesses.push(letterGuessed);
			$('#wrongGuesses').append(' '+letterGuessed+' ');
			numOfGuesses --;
	 		$('#guessesLeft').html(numOfGuesses);
	 	}
	 	gameComplete();
  	}
	function gameComplete(){
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
		instructionsDiv = $('<h1>');
       	instructionsDiv.addClass('instructionTxt');
       	instructionsDiv.html('Please choose a difficulty to play again!');
       	$('#display').append(instructionsDiv);
	}
	function resetGame(){
		answerArray = [];
		answerArrayDisplay = [];
		wrongLetterGuesses = [];
		$('#display').empty();
		$('#buttons').empty();
		$('.instructionTxt').empty();
		$('#wrongGuesses').empty();
		$('#guessesLeft').html(numOfGuesses);
	}

	$('#easyGame').click(function(){
		currentWord = easyWords[Math.floor(Math.random() * easyWords.length)];
		numOfGuesses = 10;
		resetGame();
		startGame(currentWord);
	});
	$('#mediumGame').click(function(){
		currentWord = mediumWords[Math.floor(Math.random() * mediumWords.length)];
		numOfGuesses = 8;
		resetGame();
		startGame(currentWord);
	});
	$('#hardGame').click(function(){
		currentWord = hardWords[Math.floor(Math.random() * hardWords.length)];
		numOfGuesses = 5;
		resetGame();
		startGame(currentWord);
	});
});


