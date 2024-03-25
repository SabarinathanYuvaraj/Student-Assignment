import readline from 'readline-sync'
import studentList from './studentData.js';
let condition = true
while(condition){

    const userInput = readline.question("Enter the number \n 1) TakeTest \n 2) GenerateResult \n 3) StudentResult \n 4) Exit \n ");

    if(userInput == 1){
        takeTest()
    }

    if(userInput == 2){
        generateResult()
    }

    if(userInput == 3){
        studentResult()
    }

    if(userInput == 4){
        condition = false
        console.log("Thank you Visit again");
    }

}

function takeTest(){
        studentList.forEach(student => {
            if(student.test_score.length == 0)
            {
                let biologyMark = Math.floor(Math.random()*101)
                let csMark = Math.floor(Math.random()*101)
                let mathsMark = Math.floor(Math.random()*101)
     
               let studentObjects = [{
                 "subjectName" : "Biology",
                 "marks" : biologyMark
                },
                {
                 "subjectName" : "ComputerScience",
                 "marks" : csMark
                },
                {
                 "subjectName" : "Maths",
                 "marks" : mathsMark
                }
             ]
             student.test_score.push( ...studentObjects)
            }
        })
        
        }



        function generateResult() {
            studentList.forEach(student => {
                let totalScore = 0;
                let totalSubjects = student.test_score.length;
        
                for (let i = 0; i < student.test_score.length; i++) {
                    totalScore += student.test_score[i].marks;
                }
        
                if (totalSubjects !== 0) {
                    let percentage = ((totalScore / (totalSubjects * 100)) * 100).toFixed(2); 
                    student.totalScore = totalScore;
                    student.percentage = percentage;
                } else {
                    student.totalScore = 0;
                    student.percentage = 0;
                }
            });
        }
        


function studentResult()
{
console.log("+--------+---------------------+");
console.log("| TotalScore  |  Percentage    |");
console.log("+--------+---------------------+")
    studentList.forEach(student => {
        if(student.totalScore != 0 && student.percentage != 0)
        {
            const totalScore = student.totalScore.toString().padStart(6);
            const percentage = student.percentage.toString().padStart(6);
            console.log(`| ${totalScore}      | ${percentage}         |`);
            console.log("+--------+---------------------+")

        }})



        }

        




