let userScore=0;
let compScore=0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

//function to generate computer choice
const genCompChoice =()=>{
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

//function for draw game
const drawGame = () =>{
    msg.innerText=" Game was Draw! Play Again ";
    msg.style.backgroundColor = "#081b31";

}

//function to show the winner of the game
const showWinner =(userWin, userChoice, compChoice) =>{
    if(userWin)
    {
        userScore++;
        userScorePara.innerText = userScore;

        msg.innerText = ` You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else
    {
        compScore++;
        compScorePara.innerText = compScore;

        msg.innerText= `You Lose! ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

//function to start the game
const playGame =(userChoice)=> {
    const compChoice = genCompChoice();

    if(userChoice === compChoice)
    {
        drawGame();
    }
    else
    {
        let userWin=true;
        if(userChoice==="rock")
        {
            userWin = compChoice=== "paper" ? false : true;
        }
        else if(userChoice === "paper")
        {
            userWin = compChoice === "scissors" ? false : true; 
        }
        else
        {
            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, compChoice);
    }
};

//to get choices for each of array index
choices.forEach((choice)=>{
    choice.addEventListener("click", ()=>{
        const userChoice= choice.getAttribute("id");
        playGame(userChoice);
    });
});
