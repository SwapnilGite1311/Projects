import pyttsx3
import speech_recognition as sr
import webbrowser
import datetime
import pyjokes
import os

def sptext():#function to convert speech to text
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:#uses the device microphone to take the input as voice 
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)#this method removes unwanted noise
        audio = recognizer.listen(source)
        try:
            print("Recognizing...")
            data = recognizer.recognize_google(audio)#converts the speech to text
            print(data)           
            return data
        except sr.UnknownValueError:
            print("Not Understanding...")

def speechtx(x):
    engine = pyttsx3.init()#init is a class from pyttsx3 module we use it here to get the data
    voices = engine.getProperty('voices')
    engine.setProperty('voice',voices[0].id)#0 for male voice and 1 for female voice
    rate = engine.getProperty('rate')
    engine.setProperty('rate',150)
    engine.say(x)
    engine.runAndWait()

if __name__ == '__main__':

   
          while True: 
     
              
                         
               data1=sptext().lower()

               if "your name" in data1:
                    name = "My name is Jarvis"
                    speechtx(name)
               
               elif "old are you" in data1:
                    age = "i am two years old"
                    speechtx(age)
               
               elif 'time' in data1:
                    time = datetime.datetime.now().strftime("%I%M%p")
                    speechtx(time)
               
               elif 'youtube' in data1:
                    webbrowser.open("https://www.youtube.com")

               elif 'joke' in data1:
                    joke_1 = pyjokes.get_joke(language="en",category="neutral")
                    print(joke_1)
                    speechtx(joke_1)
               
               elif 'sleep jarvis' in data1:
                    speechtx("Thank you")
                    break

               elif 'idiot' in data1:
                    speechtx("you stupid motherfucker fuck off")
               
               elif 'hello' in data1:
                    speechtx("hello There! how can I help you today?")
               

          #    elif 'play song' in data1:
          #         add =  r"C:\Users\Swapnil gite\Videos\Anime\One Piece"
          #         listsong = os.listdir(add)
          #         print(listsong)
          #         os.startfile(os.path.join(add,listsong[0]))
     # else:
     #      print("Thanks")