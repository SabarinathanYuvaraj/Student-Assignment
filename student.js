import readline from 'readline-sync'
import studentList from './studentData.js';
let condition = true
while(condition){

    const userInput = readline.question("\nPlease Select Any Of The Given Options \n 1) TakeTest \n 2) GenerateResult \n 3) StudentResult \n 4) ClassBasedResult \n 5) DetailAnalysisResult \n 6) topThreePerformer \n 7) Exit \n  \n");

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
        viewClassResult()
    }

    if(userInput == 5){
        DetailAnalysisResult()
    }

    if(userInput == 6){
        viewTopPerformers()
    }

    if(userInput == 7){
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
        console.log("the test has been taken successfully");
        }



function generateResult() {
    let testRequired = false
    studentList.forEach(student => {
        let totalScore = 0;
        let totalSubjects = student.test_score.length;

        for (let i = 0; i < student.test_score.length; i++) {
            totalScore += student.test_score[i].marks;
        }

        if (totalSubjects !== 0) {
            let percentage = parseFloat(((totalScore / totalSubjects).toFixed(2))) 
            student.totalScore = totalScore;
            student.percentage = percentage;

            } else {
                testRequired = true
            }

        });

            if(testRequired){
                console.log("please take the test first \n");
                return
            }
   
    console.log("the result generated successfully \n");
}



function studentResult()
{
    for(let i = 0 ; i<studentList.length ; i++){

        if(studentList[i].test_score.length == 0){
            console.log("please take the test and generate result  \n ");
            return
        }

       else if(studentList[i].totalScore == undefined && studentList[i].totalScore == null){
            console.log("please generate result and come back \n ");
            return
        }
    }
    console.log("+--------+----------------------+-------+--------+------------+----------------+");
    console.log("| RollNO |        Name          | Class | Gender | TotalScore | Percentage     |");
    console.log("+--------+----------------------+-------+--------+------------+----------------+");

    studentList.forEach(studentResult => {
        
            const rollNo = studentResult.Roll_no.toString().padStart(6);
            const name = studentResult.Name.padEnd(20);
            const studentClass = studentResult.Class.toString().padEnd(5);
            const gender = studentResult.Gender.padEnd(6);
            const totalScore = studentResult.totalScore.toString().padStart(10);
            const percentage = studentResult.percentage.toString().padStart(11) + "%";
            
            console.log(`| ${rollNo} | ${name} | ${studentClass} | ${gender} | ${totalScore} | ${percentage}   |`);
      
        
            console.log("+--------+----------------------+-------+--------+------------+----------------+ ");
        })

        }


function viewClassResult(){

    for(let i = 0 ; i<studentList.length ; i++){

        
        if(studentList[i].test_score.length == 0){
            console.log("please take the test and generate result  \n ");
            return
        }

       else if(studentList[i].totalScore == undefined && studentList[i].totalScore == null){
            generateResult = takeTest
            console.log("please generate result and come back");
            return
        }
    }

   let classResults = {}
    studentList.forEach(student => {
        if(!classResults[student.Class]){
            classResults[student.Class]=[]
        }
        classResults[student.Class].push(student)
    })

    for(let cls in classResults){
        console.log(`The results of class ${cls}`);
        
        console.log("+--------+----------------------+-------+--------+------------+----------------+");
        console.log("| RollNO |        Name          | Class | Gender | TotalScore | Percentage     |");
        console.log("+--------+----------------------+-------+--------+------------+----------------+");

        classResults[cls].forEach(studentResult => {
    
            const rollNo = studentResult.Roll_no.toString().padStart(6);
            const name = studentResult.Name.padEnd(20);
            const studentClass = studentResult.Class.toString().padEnd(5);
            const gender = studentResult.Gender.padEnd(6);
            const totalScore = studentResult.totalScore.toString().padStart(10);
            const percentage = studentResult.percentage.toString().padStart(11) + "%";
            
            console.log(`| ${rollNo} | ${name} | ${studentClass} | ${gender} | ${totalScore} | ${percentage}   |`);
      
        
            console.log("+--------+----------------------+-------+--------+------------+----------------+\n ");
        })
                
    }
    console.log("the studentResult generated successfully");
}


function DetailAnalysisResult() {

    for(let i = 0 ; i<studentList.length ; i++){

        
        if(studentList[i].test_score.length == 0){
            console.log("please take the test and generate result  \n ");
            return
        }

       else if(studentList[i].totalScore == undefined && studentList[i].totalScore == null){
            generateResult = takeTest
            console.log("please generate result and come back");
            return
        }
    }

    let overAllResult = {};
    studentList.forEach(student => {
        if (!overAllResult[student.Class]) {
            overAllResult[student.Class] = [];
        }
        overAllResult[student.Class].push(student);
    });

    Object.keys(overAllResult).forEach(cls => {
        let totalMarks = 0;
        let totalPercentage = 0;
        let failedStudentCount = 0;
        let passedStudentCount = 0;
        let failedStudentMarks = 0;
        let passedStudentMarks = 0;

        overAllResult[cls].forEach(student => {
            totalMarks += student.totalScore;
            totalPercentage += student.percentage;
            if (student.percentage < 35) {
                failedStudentCount++;
                failedStudentMarks += student.totalScore;
            } else {
                passedStudentCount++;
                passedStudentMarks += student.totalScore;
            }
        });

        let studentCount = overAllResult[cls].length;
        console.log(studentCount);
        let averageTotalMark = (totalMarks / studentCount).toFixed(2);
        let averageTotalPercentage = (totalPercentage / studentCount).toFixed(2);
        let failedStudentPercentage = failedStudentCount > 0 ? ((failedStudentCount/studentCount)*100 ).toFixed(2) : 0;
        let passedStudentPercentage = passedStudentCount > 0 ? (( passedStudentCount/studentCount)*100 ).toFixed(2) : 0;
        let overallGradeClass = '';

        if (averageTotalPercentage > 80) {
            overallGradeClass = 'A';
        } else if (averageTotalPercentage > 60) {
            overallGradeClass = 'B';
        } else if (averageTotalPercentage >= 35) {
            overallGradeClass = 'C';
        } else {
            overallGradeClass = 'D';
        }
        console.log(typeof averageTotalMark );
        console.log(typeof failedStudentPercentage);

        console.log("+-----------+-------+-------+-------+--------------+-------------------+-------------+------------------+");
        console.log("| Avg Mark  | Avg % | Class | Grade | Failed Count | Failed Percentage | Passed Count | Passed Percentage |");
        console.log("+-----------+-------+-------+-------+--------------+-------------------+-------------+------------------+");
        console.log(`| ${averageTotalMark.padStart(9)} | ${averageTotalPercentage.padStart(5)} | ${cls.padStart(5)} | ${overallGradeClass.padStart(5)} | ${failedStudentCount.toString().padStart(6)} | ${failedStudentPercentage.toString().padStart(6)}% | ${passedStudentCount.toString().padStart(11)} | ${passedStudentPercentage.padStart(16)}% |`);
        console.log("+-----------+-------+-------+-------+--------------+-------------------+-------------+------------------+");
    });
}



function viewTopPerformers() {

    for(let i = 0 ; i<studentList.length ; i++){

        
        if(studentList[i].test_score.length == 0){
            console.log("please take the test and generate result  \n ");
            return
        }

       else if(studentList[i].totalScore == undefined && studentList[i].totalScore == null){
            generateResult = takeTest
            console.log("please generate result and come back");
            return
        }
    }

    let topPerformers = {};
    
    studentList.forEach(student => {
        if (!topPerformers[student.Class]) {
            topPerformers[student.Class] = [];
        }
        topPerformers[student.Class].push(student);
    });


    for (let cls in topPerformers) {
        topPerformers[cls].sort((a, b) => b.totalMarks - a.totalMarks);
        topPerformers[cls] = topPerformers[cls].slice(0, 3); 
    }


    console.log("+--------+---------------------+-----------+");
    console.log("| Class  |  Student Name       |  Percentage");
    console.log("+--------+---------------------+-----------+");


    for (let cls in topPerformers) {
        topPerformers[cls].forEach(student => {
            const ClassNo = cls.toString().padStart(6);
            const studentName = student.Name.padEnd(15);
            const studentPercentage = student.percentage.toString().padStart(7)
            console.log(`| ${ClassNo} | ${studentName} | ${studentPercentage}       |`);
        });
        console.log("--------------------------------------------");
    }
    console.log("+--------+---------------------+-----------+");
}
