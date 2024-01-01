let count = document.querySelector(".quiz-info .count span");
    let bullets = document.querySelector(".bullets .spans");
    let quizArea =document.querySelector(".quiz-area"); 
    let answerArea =document.querySelector(".answer-area");
    let submitButton = document.querySelector(".submit-button");
    let bulletsContainer = document.querySelector(".bullets");
    let mainResults = document.querySelector(".results");
   let coutndownElement= document.querySelector(".coutndown");


    let currentIndex = 0;
    let goodAnswer = 0 ;
    let countdownInterval ;

     function getQuestion() {
        let myRequest = new XMLHttpRequest();
        myRequest.onreadystatechange = function(){
            if(this.readyState === 4 &&  this.status === 200){
                let questionObject = JSON.parse(this.responseText)
              let  questionCount = questionObject.length;
              console.log(questionObject);
              createBullets(questionCount);
              addQuestions(questionObject[currentIndex],questionCount);
              countdwn(20, questionCount)

            submitButton.onclick = () =>{
                let theRightAnswer = questionObject[currentIndex].right_answer;
                currentIndex ++;

                checkAnswer(theRightAnswer,questionCount);

                quizArea.innerHTML = '';
                answerArea.innerHTML = '';

                addQuestions(questionObject[currentIndex],questionCount);

                handelBullets();
                showResults(questionCount);
                clearInterval(countdownInterval);
                countdwn(20, questionCount)


            }




            }
        }
        myRequest.open("GET", "team.json", true);
        myRequest.send()
     }
     getQuestion();
    function createBullets(num){
        count.innerHTML = num ;
        for(let i=0 ; i < num; i++){
           let bullet = document.createElement('span') ;
           if(i == 0){
            bullet.className = 'on';
           }
           bullets.appendChild(bullet);
        }

    }
   function addQuestions(obj , count){
    if(currentIndex < count){
            
    
    let title =  document.createElement('h2') ;
    let titleText = document.createTextNode(obj.title);
    title.appendChild(titleText);
    quizArea.appendChild(title);

    for( let i = 1 ; i<= 5 ; i++ ){
      let questinsDiv =  document.createElement('div');
      questinsDiv.className = 'answer'

     let radioInput = document.createElement('input');
     radioInput.name = 'question';
     radioInput.type ='radio';
     radioInput.id =`answer_${i}`;
     radioInput.dataset.answer =obj[ `answer_${i}`];

     if(i == 1){
        radioInput.checked = true;
     }


     let theLabel = document.createElement('label');
     theLabel.htmlFor = `answer_${i}`;
     let labelText =  document.createTextNode (obj[ `answer_${i}`]);
     theLabel.appendChild(labelText)

     questinsDiv.appendChild(radioInput);
     questinsDiv.appendChild(theLabel);

     answerArea.appendChild(questinsDiv);
    }

}
    }


    function checkAnswer(rAnswer , count){
        

        let answers = document.getElementsByName('question');
        let theChoosenAnswer;

        for (let i = 0 ; i < answers.length ; i++){
            if(answers[i].checked){
                theChoosenAnswer = answers[i].dataset.answer;
            }

            
        }
        console.log(theChoosenAnswer);
        console.log(rAnswer);


        if( rAnswer === theChoosenAnswer){
            goodAnswer ++;
            console.log("good")
            console.log(goodAnswer);



        }


    };

   function handelBullets(){
   let bulletsSpan = document.querySelectorAll(".bullets .spans span");
   Array.from(bulletsSpan);
   bulletsSpan.forEach((span, index) => {
    if(currentIndex === index){
        span.className = 'on';
    }
    
   });


    }


  function  showResults(count) {
    let results
    if(currentIndex === count){
        quizArea.remove();
        answerArea.remove();
        submitButton.remove();
        bulletsContainer.remove();

    if(goodAnswer > count / 2 && goodAnswer < count){
        results = `<span class='good'>Is Good Your Answer</span>, ${goodAnswer} from ${count}`; 
    }else if (goodAnswer === count){
        results = `<span class='perfect'>Is Perfect Your Answer</span> ${goodAnswer} from ${count}`; 
        
    }else{

        results = `<span class='bad'>Is Bad Your Answer</span> ${goodAnswer} from ${count}`; 

    }

    mainResults.innerHTML = results;
    mainResults.style.padding = '10px';
    mainResults.style.backgroundColor = 'white';
    mainResults.style.marginTop = '10px';

    }

  };


  function countdwn(duration, count){
    let minutes, seconds ;

    if(currentIndex < count){

    
    countdownInterval = setInterval(() =>{

        minutes = parseInt(duration / 60);
        seconds = parseInt(duration %  60);
        minutes = minutes < 10 ? `0 ${minutes}` : minutes;
        seconds = seconds < 10 ? `0 ${seconds}` : seconds;
        coutndownElement.innerHTML = `${minutes} : ${seconds}`


        if(--duration < 0){
            clearInterval(countdownInterval);
            submitButton.onclick();
        }



    },1000)
}

  }

