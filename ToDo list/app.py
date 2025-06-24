#open folder in vscode
# open terminal in vscode use pip install virtualenv
#then use virtualenv venv
#set-execution-policy unrestricted run this command in powershell(as adnministrator) then type A
# then use venv\Scripts\activate.ps1 the environment will be activated
# then use pip install flask
## run this file using python app.py
#then click on the link in the terminal to open the app in your browser
# this is a simple flask app that returns "Hello, World!" when you go to the
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'  # Using SQLite for simplicity
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable track modifications to save resources   
db = SQLAlchemy(app)

class Todo(db.Model):
    sno=db.Column(db.Integer, primary_key=True)  # sno is the primary key
    title = db.Column(db.String(200), nullable=False)  # Title of the todo item
    desc = db.Column(db.String(500), nullable=False)  # Description of the todo item
    date_created = db.Column(db.DateTime, default=datetime.utcnow)  # Date when the todo item was created

    def __repr__(self) -> str:
        return f"{self.sno} - {self.title}"


@app.route("/" , methods=["GET", "POST"])  # This is the main route of the app from where the app will be accessed
def hello_world():
    if request.method == "POST":
        title = request.form['title']  # Get the title from the form
        desc = request.form['desc']
        # Handle form submission if needed
        print(request.form['title'])  # This will print the form data in the terminal
    todo = Todo(title = title , desc = desc)  # Creating a new todo item
    db.session.add(todo)
    db.session.commit()
    # This will add the todo item to the database
    allTodo = Todo.query.all()
    return render_template("index.html",allTodo=allTodo)#This will render the index.html file in the templates folder
    #return "<p>Hello, World!</p>"

@app.route("/show")
def products():
    allTodo = Todo.query.all()
    # This will fetch all the todo items from the database
    print(allTodo)
    return "<p>This is products page!</p>"#this will return a simple text when you go to /products

 
if __name__ == "__main__":#this two lines will run the app
    with app.app_context():
        print("Creating database tables...")
        db.create_all()
    app.run(debug=True, port=8000)  # You can change the port number if needed   