const questions = [["What is your first name?", "John"], ["Last name?", "Doe"], ["What is funnier than 24?", "25"]];
var question = document.getElementById("question"),
    questionCount = document.getElementById("questionNo"),
    textField = document.getElementById("text-field"),
    submitButton = document.getElementById("button"),
    questionNo = 1,
    score = 0;

function setupQuiz(){
    if(questions.length != 0){
        question.innerHTML = questions[0][0];
        questionCount.innerHTML = "Question " + questionNo;
        textField.value = '';  
    }else{
        questionCount.innerHTML = "You're done!";
        question.innerHTML = "Your score is: " + score;
        textField.remove();
        submitButton.remove();
    }
}

function submitAns(){
    checkAns();
    questions.shift();
    questionNo++;
    setupQuiz();  
}

function checkAns(){
    if(textField.value == questions[0][1]){
        score++;
    }
}

textField.addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
      submitAns()
    }
});