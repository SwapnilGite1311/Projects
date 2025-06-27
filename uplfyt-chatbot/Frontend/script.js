//this script handles the user input and fetches product data from the backend
//and displays it in the chatbox
let currentUser = null;

async function sendMessage() {
  const inputBox = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const message = inputBox.value;

  if (!message.trim()) return;

  // Display user message
  chatbox.innerHTML += `<div class="user">You: ${message}</div>`;
  inputBox.value = "";

  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: currentUser,
        message: message
      })
    });

    const data = await response.json();
    const reply = data.reply; // ✅ correct this line

    // Display bot reply
    chatbox.innerHTML += `<div class="bot">Bot: ${reply}</div>`;
  } catch (error) {
    chatbox.innerHTML += `<div class="bot">❌ Error: Could not connect to server.</div>`;
  }

  chatbox.scrollTop = chatbox.scrollHeight;
}



//this function will handle the login functionality
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");

    try{
        const response = await fetch("http://localhost:5000/login", {
            method: "Post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username,password})
        });

        const data = await response.json();

        if(data.status === "success") {
            //script to hide the login form and show the chatbot
            currentUser = username;
            document.getElementById("loginForm").style.display="none";
            document.getElementById("chatSection").style.display="block";
            await loadChatHistory();
        } else{
            loginError.textContent = data.message;
        }
    } catch(error){
        loginError.textContent = "Server error. Try again.";
    }
}

//Logout button 
function logout(){
    //hide chatbot
    document.getElementById("chatSection").style.display = "none";

    //show login form again
    document.getElementById("loginForm").style.display = "block";

    //clear input fields (optional)
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("userInput").value = "";
    document.getElementById("chatbox").innerHTML = "";
}

//Load chat history
async function loadChatHistory() {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML = ""; // Clear previous chat history

    try{
        const response = await fetch(`http://localhost:5000/history/${currentUser}`);
        const history = await response.json();

        history.forEach(entry => {
            chatbox.innerHTML += `
            <div class="user"> You: ${entry.user} </div>
            <div style="font-size: 10px; color:gray;"> ${entry.timestamp}</div>`;
        });

        chatbox.scrollTop = chatbox.scrollHeight;
    }catch(error){
        chatbox.innerHTML += `<div class="bot"> Failed to load history. </div>`;
    }
}