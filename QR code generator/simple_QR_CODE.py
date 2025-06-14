import qrcode as qr #the qr name has been assigned
#to the qrocde module it is an alias(substitute) name given to that module 
img =qr.make("Hello there! this is Swapnil's QR")
#make function is one of the inbuilt function of qrcode module
#in make function we can pass anything we want to make qr code of like url etc.
img.save("Swapnil's_QR.png")
print("QRcode has been created in your folder...! ")
