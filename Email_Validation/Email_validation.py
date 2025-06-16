email = input("Enter your Email : ")
k,j,d=0,0,0

if len(email)>=6:
    if email[0].isalpha():#condition to check if the first letter of the email is alphabet or not
        if ("@" in email) and (email.count("@")==1):#condition to check if the email contains @ at the correct position
            if (email[-4:]==".com") ^ (email[-3]==".in"):#condition to check if the dot is placed at the correct position
                # (^) this is known as xor operator why we used it?
                #to make sure that . comes only single time in the email
                for i in email:#to iterate over the entire email string to make sure that email does not contain any spaces of uppercase letters
                    if i.isspace():#inbuilt function used to check spaces in the string
                        k=1
                    elif i.isalpha():
                        if i == i.upper():#contition to check if i in email is a uppercase letter or not
                            j=1
                    elif i.isdigit():#check if the email contains any digit if yes then it will continue the loop
                        continue
                    elif i=="_" or i=="."or i=="@":
                        continue
                    else:
                        d = 1

                if(k==1 or j==1 or d==1):
                    print("Wrong email 5")
                else:
                    print("Valid Email")
            else:
                print("Wrong Email 4 ")
        else:
            print("Wrong Email! 3")
    else:
        print("Wrong Email!! 2 ")
else:
    print("Wron Email!!! 1  ")

#if we measure the length of the string from right to left it has negative value 