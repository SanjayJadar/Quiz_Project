var score = document.getElementById('score');
var scoreBox = document.createElement('div');
scoreBox.style.backgroundColor = 'white';
scoreBox.style.padding = '15px 40px 50px 20px';
scoreBox.style.borderRadius = '5px';
scoreBox.style.marginLeft = '10px';
// scoreBox.style.position = 'sticky';
// scoreBox.style.position = 'relative';
// scoreBox.style.position = 'absolute';
scoreBox.style.position = 'fixed';
// scoreBox.style.position = 'static';
var p = document.createElement('p');
p.innerText = 'Score:';
p.style.fontSize = '18px';
var span1 = document.createElement('span');
span1.innerText = '0';
span1.style.fontSize = '30px';
span1.style.fontWeight = 'bold';
var span2 = document.createElement('span');
span2.innerText = '/';
span2.style.fontSize = '30px';
span2.style.fontWeight = 'bold';
var span3 = document.createElement('span');
span3.innerText = "5";
span3.style.fontSize = '30px';
span3.style.fontWeight = 'bold';
scoreBox.append(p,span1,span2,span3);
score.append(scoreBox);

function main() {
  function onsuccess(data) {
    // console.table(data);
    var quizpage = document.getElementById('quizpage');
    var studentAnswer;
    var rightAnswer;
    var count = 0;   //Number of marks scored
    var number = 0;   //Used to generate different id and for values in radio section
    for(var i = 0;i < data.length;i++){
      console.log('hi');
      current = data[i];
      var paper = document.getElementById('paper');
      
      var qno = document.createElement('span');
      qno.innerText = 'Q' + current.id + '.';
      qno.style.color = '#fad744';

      var questions = document.createElement('span');
      questions.style.color = '#fad744';
      questions.innerText = current.question;
      var subsection = document.createElement('div');
      for(var j = 0; j < data[i].options.length; j++){
        var radioInput = document.createElement('input');
        radioInput.setAttribute('type', 'radio');
        var opt = j + number;
        var opts = i + 'x';
        radioInput.setAttribute('name', opts);
        radioInput.setAttribute('id',opt);
        radioInput.setAttribute('value', j+1);
        radioInput.style.cursor = 'pointer';

        presentOption = data[i].options[j];
        var label = document.createElement('label');
        label.setAttribute('for', opt)
        label.style.cursor = 'pointer';
        label.style.color = '#fad744';

        var description = document.createTextNode(presentOption);
        label.appendChild(description);

        var linebreak3 = document.createElement('br');
        var linebreak4 = document.createElement('br');
        subsection.style.cursor = 'pointer';
        subsection.style.borderBottom = '2px solid #fad744';
        subsection.style.padding = '22px 0 30px 10px';
        subsection.append(radioInput,label,linebreak3,linebreak4);
        number += 5; 
      }
      var linebreak = document.createElement('br');
      var linebreak2 = document.createElement('br');
      paper.appendChild(qno);
      paper.appendChild(questions);
      paper.appendChild(linebreak);
      paper.append(subsection);
      paper.appendChild(linebreak2);

    }
    function onClickHandler(e) {
      e.preventDefault();
      let input = $("input[type=radio]");
        let selectedAns = [];
        let correctAns = [];
        let count = 0;
        //to get all correct answers in a single array
        for(let j = 0; j<data.length; j++){
            correctAns.push(data[j].answer)
        }
        //to get all selected answers by user in a single array
        for(let i =0; i<input.length; i++){
            if(input[i].checked == true){
                selectedAns.push(Number(input[i].value)); 
            }
        }
        console.log(correctAns);
        console.log(selectedAns);
        if(selectedAns.length != data.length){
          alert('Complete All 5 Questions')
        }
        else{
          for( let k = 0; k<correctAns.length; k++){
            if(correctAns[k] === selectedAns[k]){
                 count++;
             }
          }
        }

        console.log(count);
        span1.innerText = count;
        
    }
    var button = document.createElement('button');
    button.innerText = 'Submit';
    button.style.backgroundColor = '#fad744';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.borderRadius = '5px';
    button.style.fontSize = '20px';
    button.style.marginTop = '50px';
    button.style.marginLeft = '130px';
    button.style.cursor = 'pointer';
    button.addEventListener('click',onClickHandler);
    // quizpage.append(paper);
    paper.append(button);
  }  
  function onerror() {
    console.log('fail');
  }
  $.ajax({
    method: 'GET',
    url: 'https://5d76bf96515d1a0014085cf9.mockapi.io/quiz',
    success: onsuccess,
    error: onerror
  })
}
$(document).ready(main);


 