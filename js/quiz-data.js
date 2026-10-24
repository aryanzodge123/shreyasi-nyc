/*
  Data for the "Who knows who better?" quiz. It loads only after the trip page unlocks.

  Every question needs:
    q        The question, written about one person. {name} is the person whose answer is being guessed.
             {other} is the person who is playing.
    answers  The real answer from each person.
    decoys   Three believable wrong answers for each person's answer.

  When Aryan plays, he guesses Shreyasi's answers: the real answer is answers.Shreyasi and the wrong
  options are decoys.Shreyasi. When Shreyasi plays, it is the other way around.

  These are FILLER answers. Replace every "(replace me)" with the real answers before sharing the link.
  A question that is missing an answer or has fewer than 3 decoys for a person is skipped, and the score is
  always out of the questions that are complete.
*/
window.NYC_QUIZ = {
  names: ["Aryan", "Shreyasi"],
  questions: [
    {
      q: "What is {name}'s favorite food or cuisine?",
      answers: { Aryan: "Q1 Aryan real answer (replace me)", Shreyasi: "Q1 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q1 decoy 1 for Aryan (replace me)", "Q1 decoy 2 for Aryan (replace me)", "Q1 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q1 decoy 1 for Shreyasi (replace me)", "Q1 decoy 2 for Shreyasi (replace me)", "Q1 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is {name}'s go-to coffee shop order (or drink of choice)?",
      answers: { Aryan: "Q2 Aryan real answer (replace me)", Shreyasi: "Q2 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q2 decoy 1 for Aryan (replace me)", "Q2 decoy 2 for Aryan (replace me)", "Q2 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q2 decoy 1 for Shreyasi (replace me)", "Q2 decoy 2 for Shreyasi (replace me)", "Q2 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is {name}'s favorite movie or TV show?",
      answers: { Aryan: "Q3 Aryan real answer (replace me)", Shreyasi: "Q3 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q3 decoy 1 for Aryan (replace me)", "Q3 decoy 2 for Aryan (replace me)", "Q3 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q3 decoy 1 for Shreyasi (replace me)", "Q3 decoy 2 for Shreyasi (replace me)", "Q3 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is {name}'s favorite dessert?",
      answers: { Aryan: "Q4 Aryan real answer (replace me)", Shreyasi: "Q4 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q4 decoy 1 for Aryan (replace me)", "Q4 decoy 2 for Aryan (replace me)", "Q4 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q4 decoy 1 for Shreyasi (replace me)", "Q4 decoy 2 for Shreyasi (replace me)", "Q4 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is {name}'s favorite way to spend a lazy Sunday?",
      answers: { Aryan: "Q5 Aryan real answer (replace me)", Shreyasi: "Q5 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q5 decoy 1 for Aryan (replace me)", "Q5 decoy 2 for Aryan (replace me)", "Q5 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q5 decoy 1 for Shreyasi (replace me)", "Q5 decoy 2 for Shreyasi (replace me)", "Q5 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "Is {name} a morning person or a night owl?",
      answers: { Aryan: "Q6 Aryan real answer (replace me)", Shreyasi: "Q6 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q6 decoy 1 for Aryan (replace me)", "Q6 decoy 2 for Aryan (replace me)", "Q6 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q6 decoy 1 for Shreyasi (replace me)", "Q6 decoy 2 for Shreyasi (replace me)", "Q6 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is {name}'s biggest pet peeve?",
      answers: { Aryan: "Q7 Aryan real answer (replace me)", Shreyasi: "Q7 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q7 decoy 1 for Aryan (replace me)", "Q7 decoy 2 for Aryan (replace me)", "Q7 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q7 decoy 1 for Shreyasi (replace me)", "Q7 decoy 2 for Shreyasi (replace me)", "Q7 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "How does {name} handle stress?",
      answers: { Aryan: "Q8 Aryan real answer (replace me)", Shreyasi: "Q8 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q8 decoy 1 for Aryan (replace me)", "Q8 decoy 2 for Aryan (replace me)", "Q8 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q8 decoy 1 for Shreyasi (replace me)", "Q8 decoy 2 for Shreyasi (replace me)", "Q8 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is {name}'s comfort food on a bad day?",
      answers: { Aryan: "Q9 Aryan real answer (replace me)", Shreyasi: "Q9 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q9 decoy 1 for Aryan (replace me)", "Q9 decoy 2 for Aryan (replace me)", "Q9 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q9 decoy 1 for Shreyasi (replace me)", "Q9 decoy 2 for Shreyasi (replace me)", "Q9 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is {name}'s most dramatic reaction to a minor inconvenience?",
      answers: { Aryan: "Q10 Aryan real answer (replace me)", Shreyasi: "Q10 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q10 decoy 1 for Aryan (replace me)", "Q10 decoy 2 for Aryan (replace me)", "Q10 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q10 decoy 1 for Shreyasi (replace me)", "Q10 decoy 2 for Shreyasi (replace me)", "Q10 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "According to {name}, where was your first date?",
      answers: { Aryan: "Q11 Aryan real answer (replace me)", Shreyasi: "Q11 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q11 decoy 1 for Aryan (replace me)", "Q11 decoy 2 for Aryan (replace me)", "Q11 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q11 decoy 1 for Shreyasi (replace me)", "Q11 decoy 2 for Shreyasi (replace me)", "Q11 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "When did {name} first realize they were falling for {other}?",
      answers: { Aryan: "Q12 Aryan real answer (replace me)", Shreyasi: "Q12 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q12 decoy 1 for Aryan (replace me)", "Q12 decoy 2 for Aryan (replace me)", "Q12 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q12 decoy 1 for Shreyasi (replace me)", "Q12 decoy 2 for Shreyasi (replace me)", "Q12 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What small thing does {other} do that makes {name} feel loved?",
      answers: { Aryan: "Q13 Aryan real answer (replace me)", Shreyasi: "Q13 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q13 decoy 1 for Aryan (replace me)", "Q13 decoy 2 for Aryan (replace me)", "Q13 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q13 decoy 1 for Shreyasi (replace me)", "Q13 decoy 2 for Shreyasi (replace me)", "Q13 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is {name}'s favorite memory of the two of you together?",
      answers: { Aryan: "Q14 Aryan real answer (replace me)", Shreyasi: "Q14 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q14 decoy 1 for Aryan (replace me)", "Q14 decoy 2 for Aryan (replace me)", "Q14 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q14 decoy 1 for Shreyasi (replace me)", "Q14 decoy 2 for Shreyasi (replace me)", "Q14 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What song makes {name} think of the two of you?",
      answers: { Aryan: "Q15 Aryan real answer (replace me)", Shreyasi: "Q15 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q15 decoy 1 for Aryan (replace me)", "Q15 decoy 2 for Aryan (replace me)", "Q15 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q15 decoy 1 for Shreyasi (replace me)", "Q15 decoy 2 for Shreyasi (replace me)", "Q15 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is one thing about {other} that {name} hopes never changes?",
      answers: { Aryan: "Q16 Aryan real answer (replace me)", Shreyasi: "Q16 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q16 decoy 1 for Aryan (replace me)", "Q16 decoy 2 for Aryan (replace me)", "Q16 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q16 decoy 1 for Shreyasi (replace me)", "Q16 decoy 2 for Shreyasi (replace me)", "Q16 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is one trip or adventure {name} wants the two of you to take together?",
      answers: { Aryan: "Q17 Aryan real answer (replace me)", Shreyasi: "Q17 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q17 decoy 1 for Aryan (replace me)", "Q17 decoy 2 for Aryan (replace me)", "Q17 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q17 decoy 1 for Shreyasi (replace me)", "Q17 decoy 2 for Shreyasi (replace me)", "Q17 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "If {name} were an animal, what would they be?",
      answers: { Aryan: "Q18 Aryan real answer (replace me)", Shreyasi: "Q18 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q18 decoy 1 for Aryan (replace me)", "Q18 decoy 2 for Aryan (replace me)", "Q18 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q18 decoy 1 for Shreyasi (replace me)", "Q18 decoy 2 for Shreyasi (replace me)", "Q18 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What would {name} do first during a zombie apocalypse?",
      answers: { Aryan: "Q19 Aryan real answer (replace me)", Shreyasi: "Q19 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q19 decoy 1 for Aryan (replace me)", "Q19 decoy 2 for Aryan (replace me)", "Q19 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q19 decoy 1 for Shreyasi (replace me)", "Q19 decoy 2 for Shreyasi (replace me)", "Q19 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is {name}'s go-to karaoke song?",
      answers: { Aryan: "Q20 Aryan real answer (replace me)", Shreyasi: "Q20 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q20 decoy 1 for Aryan (replace me)", "Q20 decoy 2 for Aryan (replace me)", "Q20 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q20 decoy 1 for Shreyasi (replace me)", "Q20 decoy 2 for Shreyasi (replace me)", "Q20 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What snack would {name} never share?",
      answers: { Aryan: "Q21 Aryan real answer (replace me)", Shreyasi: "Q21 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q21 decoy 1 for Aryan (replace me)", "Q21 decoy 2 for Aryan (replace me)", "Q21 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q21 decoy 1 for Shreyasi (replace me)", "Q21 decoy 2 for Shreyasi (replace me)", "Q21 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What is the weirdest food combination {name} enjoys?",
      answers: { Aryan: "Q22 Aryan real answer (replace me)", Shreyasi: "Q22 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q22 decoy 1 for Aryan (replace me)", "Q22 decoy 2 for Aryan (replace me)", "Q22 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q22 decoy 1 for Shreyasi (replace me)", "Q22 decoy 2 for Shreyasi (replace me)", "Q22 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "If {name} were a cartoon character, who would they be?",
      answers: { Aryan: "Q23 Aryan real answer (replace me)", Shreyasi: "Q23 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q23 decoy 1 for Aryan (replace me)", "Q23 decoy 2 for Aryan (replace me)", "Q23 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q23 decoy 1 for Shreyasi (replace me)", "Q23 decoy 2 for Shreyasi (replace me)", "Q23 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "If {name} won the lottery tomorrow, what is the first thing {name} would buy or do?",
      answers: { Aryan: "Q24 Aryan real answer (replace me)", Shreyasi: "Q24 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q24 decoy 1 for Aryan (replace me)", "Q24 decoy 2 for Aryan (replace me)", "Q24 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q24 decoy 1 for Shreyasi (replace me)", "Q24 decoy 2 for Shreyasi (replace me)", "Q24 decoy 3 for Shreyasi (replace me)"]
      }
    },
    {
      q: "What would {name}'s perfect date night look like?",
      answers: { Aryan: "Q25 Aryan real answer (replace me)", Shreyasi: "Q25 Shreyasi real answer (replace me)" },
      decoys: {
        Aryan: ["Q25 decoy 1 for Aryan (replace me)", "Q25 decoy 2 for Aryan (replace me)", "Q25 decoy 3 for Aryan (replace me)"],
        Shreyasi: ["Q25 decoy 1 for Shreyasi (replace me)", "Q25 decoy 2 for Shreyasi (replace me)", "Q25 decoy 3 for Shreyasi (replace me)"]
      }
    }
  ]
};
