var currentQuestion						=0;
var score											=0;
var totalQuestions						=questions.length;
var optionOrder								=[0,1,2,3];
var optionOrderInverse				=[0,1,2,3];
var numHintsCurrentQuestion		=0;
var currentHintNumber					=0;
var container									=document.getElementById('quizContainer');
var introContainer						=document.getElementById('introContainer');

var questionContainer					=document.getElementById('questionContainer');
var feedbackContainer					=document.getElementById('feedbackContainer');
var nextButtonContainer				=document.getElementById('nextButtonContainer');
var startButtonContainer			=document.getElementById('startButtonContainer');
var container									=document.getElementById('quizContainer');
var nextButton								=document.getElementById('nextButton');
var submitButton							=document.getElementById('submitButton');
var hintButton								=document.getElementById('hintButton');
var resultContainer						=document.getElementById('resultContainer');
var feedback									=document.getElementById('feedback');

function showAudioClips(){
	}
function loadQuestion(questionIndex,optionOrder){
	/*Restting the hint number to 0*/
	currentHintNumber=0;
	numHintsCurrentQuestion=0;
	/*Making question container visible and hiding feedback container*/
	container.style.display='';
	questionContainer.style.display='';
	feedbackContainer.style.display='none';
	/*Loading the question*/
	var question=document.getElementById('questionBox');
	var q=questions[questionIndex];
	var questionEl=document.getElementById('question');
	questionEl.textContent=q.question;
	var questionImage=document.getElementById('quest');
	questionImage.innerHTML='';
	if(q.questionImage){
		questionImage.style.display='';
		imgsrc="img/"+q.questionImage[0];
		questionImage.innerHTML+='<img  class="image" src='+imgsrc+'>';
	}
	else{
		questionImage.style.display='none';
	}

	/*Loading the question image if present*/

	/*Displaying answer options with images, if present*/
	var imgsrc, imgid;
	var answerOptions=document.getElementById('answerOptions');
	var answerOption;
	answerOptions.innerHTML='';
	for (var i=0;i<q.options.length;i++){
		if(q.options.length==2){
			if(i==0){
				answerOption=document.createElement('div');
				answerOption.className='col-3';
				answerOptions.appendChild(answerOption);
			}
		}
		answerOption=document.createElement('div');
		if(q.answerImages){
			answerOption.className='col-3 col-s-6 col-m-6 left';
		}
		else{
			answerOption.className='col-12 col-s-12 col-m-12 left';
		}

		answerOptions.appendChild(answerOption);
		if(q.answerImages){
			if(q.answerImages[optionOrder[i]]){
				imgsrc="img/"+q.answerImages[optionOrder[i]];
				imgid="img"+(i+1);
			}
				answerOption.innerHTML='<img  id='+imgid+' class="image" src='+imgsrc+'>';
		}
		else{
			answerOption.style.textAlign="left";
		}
		answerOption.innerHTML+='<input type="radio" id="option'+(i+1)+'" name="option"'+' value='+ (i+1)+ ' /><label for="option'+(i+1)+'">'+q.options[optionOrder[i]]+'</label>';
		if(q.options.length==2){
			if(i==1)
			{
				answerOption=document.createElement('div');
				answerOption.className='col-3';
				answerOptions.appendChild(answerOption);
			}
		}
	}
	/* Displaying the hint button if hints are present for the current question.
	Deleting the previous hints*/
	hintButton.style.display='';
	if(q.hints){
		numHintsCurrentQuestion=q.hints.length;
	}
	if(numHintsCurrentQuestion>0){
		hintButton.textContent='Give Me a Hint';
	}
	else{
		hintButton.textContent='No Hints';
	}
	var hintBox=document.getElementById('hintBox');
	hintBox.style.display='none';
	hintBox.innerHTML='';
	/*Displaying image credits*/
	var imageCreditContainer=document.getElementById('imageCreditsContainer');
	var imageCreditBox=document.getElementById('creditsContainer');
	var credit;
	if(q.imageCredits){
		imageCreditsContainer.style.display='';
		imageCreditBox.innerHTML='';
		for(var i=0;i<q.imageCredits.length;i++){
			credit=document.createElement('div');
			credit.className='col-12 col-s-12 col-m-12 left';
			imageCreditBox.appendChild(credit);
			credit.innerHTML+=q.imageCredits[i];
		}
	}
	else {
		imageCreditsContainer.style.display='none';
	}
};
function provideHint(){
	var q=questions[currentQuestion];
	var hintBox=document.getElementById('hintBox');
	if(numHintsCurrentQuestion==0){
		alert('Sorry! There are no hints available.')
		return;
	}
	if(currentHintNumber>numHintsCurrentQuestion-1){
		alert('No more hints available.')
		return;
	}
	hintBox.style.display='';
	insertText(q.hints[currentHintNumber],'hintBox');
	if(currentHintNumber==numHintsCurrentQuestion-1){
		hintButton.textContent='No More Hints';
	}
	currentHintNumber++;
}
function insertText(text,parentNode){
	var parent=document.getElementById(parentNode);
	var para=document.createElement("p");
	var node=document.createTextNode(text);
	para.appendChild(node);
	parent.appendChild(para);
}
function getCheckedAnswers(checkedAnswers,optionIdName,numOptions){
	var id='';
	var nothingChecked=true;
	for(var i=0;i<numOptions;i++){
		checkedAnswers[i]=0;
		id=optionIdName+(i+1);
		if(document.getElementById(id).checked){
			checkedAnswers[i]=1;
			nothingChecked=false;
		}
	}
	return nothingChecked;
}
function checkIfCorrect(checkedAnswers,actualAnswers){
	for (var i=0;i<checkedAnswers.length;i++){
		if(checkedAnswers[i]!=actualAnswers[i]){
			return false;
		}
	}
	return true;
}
function getActualAnswersVector(fullAnswerVector,answerVector,optionOrderInverse,numOptions){
	for (var i=0;i<numOptions;i++){
		fullAnswerVector[i]=0;
	}
	for (var i=0;i<answerVector.length;i++){
		fullAnswerVector[optionOrderInverse[answerVector[i]]]=1;
	}
}
function provideFeedback(){
	var checkedAnswers=[];
	optionIdName='option';
	numOptions=questions[currentQuestion].options.length;
	var nothingChecked;
	nothingChecked=getCheckedAnswers(checkedAnswers,optionIdName,numOptions);
	if(nothingChecked){
		alert('Please select your answer!');
		return;
	}
	questionContainer.style.display='none';
	feedbackContainer.style.display='';
	hintButton.style.display='none';
	nextButton.style.display='';
	submitButton.style.display='none';
	var imageCreditsContainer=document.getElementById('imageCreditsContainer');
	imageCreditsContainer.style.display='none';
	fullAnswerVector=[];
	getActualAnswersVector(fullAnswerVector,questions[currentQuestion].answer,optionOrderInverse,questions[currentQuestion].options.length);
	var correct=checkIfCorrect(checkedAnswers,fullAnswerVector)
	if(correct){
		feedbackContainer.style.background='lightskyblue';
		score+=5;
	}
	else {
		feedbackContainer.style.background='burlywood';
	}
	//feedbackContainer.textContent=questions[currentQuestion].response[(correct+1)%2];
	insertText(questions[currentQuestion].response[(correct+1)%2],'feedbackContainer');

	var topic;
	var i=0;
	if(questions[currentQuestion].furthertopics){
		insertText("Select other topics that are of interest to you.",'feedbackContainer');
		for(i=0;i<questions[currentQuestion].furthertopics.length;i++){
			topic=document.createElement('div');
			topic.className='col-12 col-s-12 col-m-12 left';
			feedbackContainer.appendChild(topic);
			topic.innerHTML+='<input type="checkbox" id="furthertopic'+(i+1)+'" name="furthertopic"'+' value='+ (i+1)+ ' /><label for="furthertopic'+(i+1)+'">'+questions[currentQuestion].furthertopics[i]+'</label>';
		}
	}

}

function loadNextQuestion(){

	container.style.display='';
	quizContainer.style.display='';
	feedbackContainer.style.display="none";
	feedbackContainer.innerHTML='';
	currentQuestion++;
	if(currentQuestion==totalQuestions-1){
		nextButton.textContent='Finish';
	}
	if(currentQuestion==totalQuestions){
		questionContainer.style.display='none';
		feedbackContainer.style.display='none';
		nextButton.style.display='none';
		nextButtonContainer.style.display='none';
		resultContainer.style.display='';
		var text='Your score: '+ score;
	  insertText(text,'resultContainer');
		showAudioClips();
		return;
	}
	loadQuestion(currentQuestion,optionOrder);
	nextButton.style.display='none';
	submitButton.style.display='';
};
function showIntro()
{
	container.style.display='none';
	feedbackContainer.style.display='none';
	imageCreditsContainer.style.display='none';
	var intro=document.getElementById('introBox');
	var textContent='Take our quizzes and indicate the topics that you are interested in after each question.';
	insertText(textContent,'introBox');
	textContent='Let Audio Orbis teach you these topics while you drive, exercise or relax during your work in the form of short audo clips';
	insertText(textContent,'introBox');
	textContent='Over time, the quizzes will adapt to your interests. Using the power of machine learning, Audio Orbis will find topics that you will like without having you look for them.';
	insertText(textContent,'introBox');
}
function startQuiz(){
	introContainer.style.display='none';
	startButtonContainer.style.display='none';
	loadQuestion(currentQuestion,optionOrder);
}

showIntro();
