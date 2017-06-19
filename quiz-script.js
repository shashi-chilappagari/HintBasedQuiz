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
var nextButton								=document.getElementById('nextButton');
var submitButton							=document.getElementById('submitButton');
var hintButton								=document.getElementById('hintButton');
var resultContainer						=document.getElementById('resultContainer');
var feedback									=document.getElementById('feedback');
var playlistInitialized='false';
var contentInitialized='false';

function showAudioClips(){
}
function loadQuestion(questionIndex,optionOrder){
	/*Restting the hint number to 0*/
	currentHintNumber=0;
	numHintsCurrentQuestion=0;
	var furthertopicsContainer=document.getElementById('furthertopicsContainer');
	var nextButtonContainer=document.getElementById('nextButtonContainer');
	/*Making question container visible and hiding feedback container*/
	container.style.display='';
	questionContainer.style.display='';
	feedbackContainer.style.display='none';
	nextButtonContainer.style.display='none';
	furthertopicsContainer.style.display='none';
	/*Loading the question*/
	var question=document.getElementById('questionBox');
	var q=questions[questionIndex];
	var questionEl=document.getElementById('question');
	questionEl.textContent=q.question;
	var questionImage=document.getElementById('questionImage');
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
		answerOption.id='answerOption'+i;
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
			answerOption.innerHTML+='<label for="option'+(i+1)+'"><img  id='+imgid+' class="image" src='+imgsrc+'></label>';
			answerOption.innerHTML+='<input type="radio" id="option'+(i+1)+'" name="option"'+' value='+ (i+1)+ ' /><label for="option'+(i+1)+'">'+q.options[optionOrder[i]]+'</label>';
		}
		else{
			answerOption.style.textAlign="left";
			answerOption.innerHTML+='<input type="radio" id="option'+(i+1)+'" name="option"'+' value='+ (i+1)+ ' /><label for="option'+(i+1)+'">'+q.options[optionOrder[i]]+'</label>';
		}

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
		hintButton.textContent='Give a Hint';
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

	submitButton.style.display='none';
	nextButtonContainer.style.display='';
	var imageCreditsContainer=document.getElementById('imageCreditsContainer');
	imageCreditsContainer.style.display='none';
	fullAnswerVector=[];
	getActualAnswersVector(fullAnswerVector,questions[currentQuestion].answer,optionOrderInverse,questions[currentQuestion].options.length);
	var correct=checkIfCorrect(checkedAnswers,fullAnswerVector);
	var responseBox=document.createElement('div');
	if(correct){
		responseBox.id='correct';
		//feedbackContainer.style.color='#c5c8c6';
		score+=5;
	}
	else {
		responseBox.id='incorrect';
		//feedbackContainer.style.color='burlywood';
	}
	feedbackContainer.appendChild(responseBox);
	//feedbackContainer.textContent=questions[currentQuestion].response[(correct+1)%2];
	insertText(questions[currentQuestion].response[(correct+1)%2],responseBox.id);
	var topic;
	var i=0;
	var furthertopicsContainer=document.getElementById('furthertopicsContainer');
	furthertopicsContainer.innerHTML='';
	if(questions[currentQuestion].furthertopics){

		furthertopicsContainer.style.display='';
		//insertText("Pin topics that are of interest to you.",'furthertopicsContainer');
		for(i=0;i<questions[currentQuestion].furthertopics.length;i++){
			var topicId=questions[currentQuestion].topicIds[i];
			topic=document.createElement('div');
			topic.className='col-6 col-s-12 col-m-12 left';
			furthertopicsContainer.appendChild(topic);
			var imageBox=document.createElement('div');
			topic.appendChild(imageBox);
			imageBox.className='image-box col-3 col-m-3 col-s-3';
			var imgsrc='img/'+topics[((questions[currentQuestion].topicIds[i]-1)%12)].topicImage;
			imageBox.innerHTML+='<img  class="image" src="'+imgsrc+'">';
			imageBox.innerHTML+='<button type="button"><span class="glyphicon glyphicon-pushpin"></span> Pin Topic </button>';
			var textBox=document.createElement('div');
			textBox.id=topicId+'text';
			textBox.className='textBox col-9 col-m-9 col-s-9';
			topic.appendChild(textBox);
			/*insertText(('This is topic text for topic ID= This is topic text for topic ID= This is topic text for topic ID= This is topic text for topic ID= '+topicId),textBox.id);*/

			textBox.innerHTML+='<input type="checkbox" id="furthertopic'+(i+1)+'" name="furthertopic"'+' value='+ (i+1)+ ' /><label for="furthertopic'+(i+1)+'">'+questions[currentQuestion].furthertopics[i]+'</label>';
		}
	}

}
function addItemsToPlaylist()
{
	var checkedTopics=[];
	var numTopics=questions[currentQuestion].furthertopics.length;
	var optionIDName='furthertopic';
	var nothingChecked;
	nothingChecked=getCheckedAnswers(checkedTopics,optionIDName,numTopics);
	if((playlistInitialized)|(!nothingChecked)){
		playlistContainer.style.display='';
	}
	var playlistBox=document.getElementById('playlist');
	var topicId;

	/*for(var i=0;i<numTopics;i++){
		if(checkedTopics[i]==1){
			topicId='topic'+questions[currentQuestion].topicIds[i];
			var topicDiv=document.createElement('div');
			topicDiv.id='divtopic'+questions[currentQuestion].topicIds[i];
			topicDiv.className="col-12 col-m-12 col-s-12 contentdiv";
			var buttonDiv=document.createElement('div');
			buttonDiv.className="row";
			var pinBtn=document.createElement('BUTTON');
			pinBtn.className="col-1 col-m-1 col-s-1";
			var btn=document.createElement('BUTTON');
			btn.className="col-11 col-m-11 col-s-11";
			var textDiv=document.createElement('div');
			textDiv.className="col-12 col-m-12 col-s-12";
			textDiv.style.display='none';
			pinBtn.id='pin'+topicId;
			btn.id=topicId;
			textDiv.id='text'+topicId;
			pinBtn.className+=" pin-btn";
			btn.className+=" playlist-btn";
			textDiv.className+=" topictext";
			var c=document.createTextNode('X');
			pinBtn.onclick=function(){removeTopic(this.parentNode.id)};
			topicDiv.appendChild(pinBtn);
			var t = document.createTextNode(questions[currentQuestion].furthertopics[i]);
			pinBtn.appendChild(c);
			btn.appendChild(t);
			btn.onclick=function(){displayText(this.id,this.value)};
			btn.value=0;
			topicDiv.appendChild(pinBtn);
			topicDiv.appendChild(btn);
			//topicDiv.appendChild(buttonDiv);
			topicDiv.appendChild(textDiv);
			document.getElementById('playlist').appendChild(topicDiv);

		}
	}*/

if(1){
	for(var i=0;i<numTopics;i++){
		if(checkedTopics[i]==1){
			var flipContainer=document.createElement('div');
			var flipper=document.createElement('div');
			flipContainer.className='flip-container col-6 col-m-12 col-s-12';
			flipper.className='flipper col-12 col-m-12 col-s-12';
			flipContainer.appendChild(flipper);
			document.getElementById('playlist').appendChild(flipContainer);
			topicId='topic'+questions[currentQuestion].topicIds[i];
			var topicDiv=document.createElement('div');
			topicDiv.id='divtopic'+questions[currentQuestion].topicIds[i];
			topicDiv.className="contentdiv front col-12 col-m-12 col-s-12";
			flipper.appendChild(topicDiv);
			topicDiv.innerHTML='';
			var imageBox=document.createElement('div');
			topicDiv.appendChild(imageBox);
			imageBox.className='image-box col-3 col-m-3 col-s-3';
			var imgsrc='img/'+topics[((questions[currentQuestion].topicIds[i]-1)%12)].topicImage;
			imageBox.innerHTML+='<img  class="image" src="'+imgsrc+'">';
			var textBox=document.createElement('div');
			textBox.id=topicDiv.id+'text';
			textBox.className='textBox col-9 col-m-9 col-s-9';
			topicDiv.appendChild(textBox);
			insertText(('This is topic text for topic ID= This is topic text for topic ID= This is topic text for topic ID= This is topic text for topic ID= '+topicId),textBox.id);
			topicDiv=document.createElement('div');
			topicDiv.id='divtopic'+questions[currentQuestion].topicIds[i]+'back';
			topicDiv.style.display='';
			topicDiv.className="contentdiv back col-12 col-m-12 col-s-12";
			topicDiv.innerHTML='';
			topicDiv.textContent=topics[(questions[currentQuestion].topicIds[i]-1)%3].topicText;
			flipper.appendChild(topicDiv);
		}
	}
}

if(0){
	for(var i=0;i<numTopics;i++){
		if(checkedTopics[i]==1){

			topicId='topic'+questions[currentQuestion].topicIds[i];
			var topicDivFront=document.createElement('div');
			var topicDivBack=document.createElement('div');
			topicDivFront.id='divtopic'+questions[currentQuestion].topicIds[i];
			topicDivBack.id='divtopic'+questions[currentQuestion].topicIds[i]+'back';
			topicDivFront.className="col-3 col-m-6 col-s-6 contentdiv";
			topicDivBack.className="col-6 col-m-12 col-s-12 contentdiv";
			document.getElementById('playlist').appendChild(topicDivFront);
			document.getElementById('playlist').appendChild(topicDivBack);
			topicDivBack.style.display='none';
			topicDivFront.onclick=function(){flipdiv(this.id)};
			topicDivBack.onclick=function(){flipdiv(this.id)};
			topicDivFront.innerHTML='';
			var imgsrc='img/'+topics[(questions[currentQuestion].topicIds[i]-1)%12].topicImage;
			topicDivFront.innerHTML+='<img  class="image" src="'+imgsrc+'">';
			insertText(('This is topic text for topic ID= '+topicId),topicDivFront.id);
			topicDivBack.innerHTML='';
			topicDivBack.textContent=topics[(questions[currentQuestion].topicIds[i]-1)%3].topicText;

			/*var topicDivPopup=document.createElement('div');
			topicDivPopup.className='popup';
			topicDivPopup.textContent='Read';
			topicDivPopup.id=topicId+'popup';

			var popupText=document.createElement('div');
			popupText.textContent=topics[(questions[currentQuestion].topicIds[i]-1)%3].topicText;
			popupText.className='popuptext';
			popupText.id=topicId+'popuptext';
			topicDivFront.appendChild(topicDivPopup);
			topicDivPopup.appendChild(popupText);
			topicDivPopup.onclick=function(){myFunction(this.id)};*/
			/*var buttonDiv=document.createElement('div');
			buttonDiv.className="row";
			var pinBtn=document.createElement('BUTTON');
			pinBtn.className="col-1 col-m-1 col-s-1";
			var btn=document.createElement('BUTTON');
			btn.className="col-11 col-m-11 col-s-11";
			var textDiv=document.createElement('div');
			textDiv.className="col-12 col-m-12 col-s-12";
			textDiv.style.display='none';
			pinBtn.id='pin'+topicId;
			btn.id=topicId;
			textDiv.id='text'+topicId;
			pinBtn.className+=" pin-btn";
			btn.className+=" playlist-btn";
			textDiv.className+=" topictext";
			var c=document.createTextNode('X');
			pinBtn.onclick=function(){removeTopic(this.parentNode.id)};
			topicDiv.appendChild(pinBtn);
			var t = document.createTextNode(questions[currentQuestion].furthertopics[i]);
			pinBtn.appendChild(c);
			btn.appendChild(t);
			btn.onclick=function(){displayText(this.id,this.value)};
			btn.value=0;
			topicDiv.appendChild(pinBtn);
			topicDiv.appendChild(btn);
			//topicDiv.appendChild(buttonDiv);
			topicDiv.appendChild(textDiv);
			document.getElementById('playlist').appendChild(topicDiv);*/

		}
	}
}

}
function myFunction(popupid)
{
		var popup = document.getElementById((popupid+'text'));
    popup.classList.toggle("show");

}
function flipdiv(topicId){
	if(topicId.endsWith("back"))
	{
		document.getElementById(topicId).style.display='none';
		document.getElementById((topicId.substr(0,topicId.length-4))).style.display='';
	}
	else{
		//document.getElementById(topicId).style.display='none';
		document.getElementById((topicId+'back')).style.display='';

	}
}
function removeTopic(topicId){
	var div=document.getElementById(topicId);
	var playlist=document.getElementById('playlist');
	playlist.removeChild(div);

}
function displayText(topicId,value){
	var topicContainer=document.getElementById(topicId);
	if(value==0)
	{
		insertText('Hey, its a success',('text'+topicId));
		document.getElementById(('text'+topicId)).style.display='';
		document.getElementById(topicId).value=1;
	}
	if(value==1)
	{
		document.getElementById(('text'+topicId)).style.display='none';
		document.getElementById(topicId).value=2;
	}
	if(value==2)
	{
		document.getElementById(('text'+topicId)).style.display='';
		document.getElementById(topicId).value=1;
	}

}
function nextButtonFunction()
{
	addItemsToPlaylist();
	loadNextQuestion();

}
function skipButton(){
	loadNextQuestion();
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
		furthertopicsContainer.style.display='none';
		nextButton.style.display='none';
		nextButtonContainer.style.display='none';
		resultContainer.style.display='';
		var text='Your score: '+ score;
		insertText(text,'resultContainer');
		showAudioClips();
		return;
	}
	loadQuestion(currentQuestion,optionOrder);
	nextButtonContainer.style.display='none';
	submitButton.style.display='';
};
function showIntro()
{
	container.style.display='none';
	feedbackContainer.style.display='none';
	imageCreditsContainer.style.display='none';
	var playlistContainer=document.getElementById('playlistContainer');
	var contentContainer=document.getElementById('contentContainer');
	playlistContainer.style.display='none';
	contentContainer.style.display='none';

	var intro=document.getElementById('introBox');
	var textContent='Take our quizzes and pin the topics that you are interested in after each question.';
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
