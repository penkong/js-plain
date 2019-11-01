//
// (function() {
//   function Question(question, answers, correct) {
//     this.question = question;
//     this.answers = answers;
//     this.correct = correct;
//   }
//   var q1 = new Question('is js the coolest programing ?', ['yes', 'no'], 0);
//   var q2 = new Question('what is your name?', ['mkz', 'mmm', 'pier'], 0);
//   var q3 = new Question(
//     'what does best describe coding?',
//     ['boring', 'hard', 'fun'],
//     2
//   );
//   let questions = [q1, q2, q3];
//   let n = Math.floor(Math.random() * questions.length);
//   Question.prototype.displayQuestion = function() {
//     console.log(this.question);
//     for (let i = 0; i < this.answers.length; i++) {
//       console.log(i + ' : ' + this.answers[i]);
//     }
//   };
//   Question.prototype.checkAnswer = function(ans) {
//     if (ans === this.correct) {
//       console.log('correct answer!');
//     } else {
//       console.log('wrong answer!');
//     }
//   };
//   let answer = prompt(questions[n].question);
//   questions[n].displayQuestion();
//   questions[n].checkAnswer(answer);
// })();

//
(function() {
  function Question(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }
  var q1 = new Question('is js the coolest programing ?', ['yes', 'no'], 0);
  var q2 = new Question('what is your name?', ['mkz', 'mmm', 'pier'], 0);
  var q3 = new Question(
    'what does best describe coding?',
    ['boring', 'hard', 'fun'],
    2
  );

  Question.prototype.displayQuestion = function() {
    console.log(this.question);
    for (let i = 0; i < this.answers.length; i++) {
      console.log(i + ' : ' + this.answers[i]);
    }
  };

  Question.prototype.checkAnswer = function(ans, cb) {
    let sc;
    if (ans === this.correct) {
      console.log('correct answer!');
      sc = cb(true);
    } else {
      console.log('wrong answer!');
      sc = cb(false);
    }
    this.displayScore(sc);
  };

  Question.prototype.displayScore = function(score) {
    console.log('current score  : ' + score);
  };

  let questions = [q1, q2, q3];
  function score() {
    let sc = 0;
    return function(correct) {
      if (correct) sc++;
      return sc;
    };
  }
  let keepScore = score();
  function nextQ() {
    let n = Math.floor(Math.random() * questions.length);
    questions[n].displayQuestion(n);
    let answer = prompt(questions[n].question);
    if (answer !== 'exit') {
      questions[n].checkAnswer(parseInt(answer), keepScore);
      nextQ();
    }
  }
  nextQ();
})();
