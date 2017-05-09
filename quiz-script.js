var currentQuestion						=0;
var score											=0;
var totalQuestions						=questions.length;
var optionOrder								=[0,1,2,3];
var numHintsCurrentQuestion		=0;
var currentHintNumber					=0;

var container									=document.getElementById('quizContainer');
var questionContainer					=document.getElementById('questionContainer');
var feedbackContainer					=document.getElementById('feedbackContainer');
var container									=document.getElementById('quizContainer');

var nextButton								=document.getElementById('nextButton');
var submitButton							=document.getElementById('submitButton');
var hintButton								=document.getElementById('hintButton');

var resultCont								=document.getElementById('result');
var feedback									=document.getElementById('feedback');

function loadQuestion(questionIndex,optionOrder){
	var questionEl=document.getElementById('question');
	currentHintNumber=0;
	questionContainer.style.display='';
	feedbackContainer.style.display='none';

	var q=questions[questionIndex];
	questionEl.textContent=q.question;

	var optionTable=document.getElementById("optionTable");
	if(optionTable){
			var numRows=optionTable.rows.length;
			for (var i=0;i<numRows;i++){
				optionTable.deleteRow(-1);
			}
		}
		var imageRow;
		var textRow;
		if(q.answer_images.length>0){
			imageRow=optionTable.insertRow(-1);
		}
		if(q.options.length>0){
			textRow=optionTable.insertRow(-1);
		}
	var imgsrc, imgid, imgcol, textCol;
	for (var i=0;i<q.answer_images.length;i++){
		imgsrc="img/"+q.answer_images[optionOrder[i]];
		imgid="img"+(i+1);
		imgcol=imageRow.insertCell(i);
		imgcol.innerHTML='<img + id='+imgid+' class="image" src='+imgsrc+'>';
	}
	for (var i=0;i<q.options.length;i++){
		textCol=textRow.insertCell(i);
		textCol.innerHTML='<input type="radio" name="option"'+' value='+ (i+1)+ ' />'+q.options[optionOrder[i]];
	}
	numHintsCurrentQuestion=q.hints.length;
	if(numHintsCurrentQuestion>0){
		hintButton.style.display='';
	}
	else{
		hintButton.style.display='none';
	}
	var hintBox=document.getElementById('hintBox');
	hintBox.style.display='none';
	var hintTable=document.getElementById("hintTable");
	if(hintTable){
			var numRows=hintTable.rows.length;
			for (var i=0;i<numRows;i++){
				hintTable.deleteRow(-1);
			}
		}
};

function provideHint(){
	var q=questions[currentQuestion];
	var hintBox=document.getElementById('hintBox');
	hintBox.style.display='';
	var hintTable=document.getElementById("hintTable");
	var newRow=hintTable.insertRow(currentHintNumber);
	newRow.innerHTML=q.hints[currentHintNumber];
	if(currentHintNumber==numHintsCurrentQuestion-1){
		hintButton.style.display='none';
	}
	currentHintNumber++;
}
function provideFeedback(){

	var selectedOption=document.querySelector('input[type=radio]:checked');
	if(!selectedOption){
		alert('Please select your answer!');
		return;
	}
	questionContainer.style.display='none';
	feedbackContainer.style.display='';
	hintButton.style.display='none';
	var answerIndex=selectedOption.value;
	if(questions[currentQuestion].answer==questions[currentQuestion].options[optionOrder[answerIndex-1]]){
		score+=5;
		feedback.style.display='';
		feedback.style.background="lightgreen";
		feedback.innerHTML="Correct answer";
	}
	else{
		feedback.style.display='';
		feedback.style.background="crimson";
		feedback.innerHTML="Incorrect answer";
	}
	nextButton.style.display='';
	submitButton.style.display='none';
}

function loadNextQuestion(){
	var selectedOption=document.querySelector('input[type=radio]:checked');
	selectedOption.checked=false;
	feedback.style.display="none";
	currentQuestion++;
	if(currentQuestion==totalQuestions-1){
		nextButton.textContent='Finish';
	}
	if(currentQuestion==totalQuestions){
		container.style.display='none';
		resultCont.style.display='';
		resultCont.textContent='Your score: '+ score;
		return;
	}
	loadQuestion(currentQuestion,optionOrder);
	nextButton.style.display='none';
	submitButton.style.display='';

};

loadQuestion(currentQuestion,optionOrder);
