var currentQuestion						=0;
var score											=0;
var totalQuestions						=questions.length;
var optionOrder								=[0,1,2,3];
var numHintsCurrentQuestion		=0;
var currentHintNumber					=0;

var container									=document.getElementById('quizContainer');
var questionEl								=document.getElementById('question');
var option1										=document.getElementById('Option1');
var option2										=document.getElementById('Option2');
var option3										=document.getElementById('Option3');
var option4										=document.getElementById('Option4');
var hint1											=document.getElementById('Hint1');
var hint2											=document.getElementById('Hint2');
var hint3											=document.getElementById('Hint3');
var hint4											=document.getElementById('Hint4');

var nextButton								=document.getElementById('nextButton');
var submitButton							=document.getElementById('submitButton');
var hintButton								=document.getElementById('hintButton');

var resultCont								=document.getElementById('result');
var feedback									=document.getElementById('feedback');

function loadQuestion(questionIndex,optionOrder){
	currentHintNumber=0;
	var q=questions[questionIndex];
	numHintsCurrentQuestion=q.hints.length;
	if(numHintsCurrentQuestion>0){
		hintButton.style.display='';
	}
	else{
		hintButton.style.display='none';
	}
	hint1.style.display='none';
	hint2.style.display='none';
	hint3.style.display='none';
	hint4.style.display='none';


	questionEl.textContent=(questionIndex+1) + '. '+q.question;
	option1.textContent=q.options[optionOrder[0]];
	option2.textContent=q.options[optionOrder[1]];
	option3.textContent=q.options[optionOrder[2]];
	option4.textContent=q.options[optionOrder[3]];

};

function provideHint(){
	var q=questions[currentQuestion];
if(currentHintNumber==numHintsCurrentQuestion-1){
	hintButton.style.display='none';
}
 if(currentHintNumber==0){
	 hint1.style.display='';
	 hint1.innerHTML=q.hints[currentHintNumber];
 }
 if(currentHintNumber==1){
	 hint2.style.display='';
	 hint2.innerHTML=q.hints[currentHintNumber];
 }
 if(currentHintNumber==2){
	 hint3.style.display='';
	 hint3.innerHTML=q.hints[currentHintNumber];
 }
 if(currentHintNumber==3){
	 hint4.style.display='';
	 hint4.innerHTML=q.hints[currentHintNumber];
 }
 currentHintNumber++;
}
function provideFeedback(){

	var selectedOption=document.querySelector('input[type=radio]:checked');
	hintButton.style.display='none';
	if(!selectedOption){
		alert('Please select your answer!');
		return;
	}
	var answerIndex=selectedOption.value;
	if(questions[currentQuestion].answer==questions[currentQuestion].options[optionOrder[answerIndex-1]]){
		score+=5;
		feedback.style.display='';
		feedback.innerHTML="Correct answer";

	}
	else{
		feedback.style.display='';
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
