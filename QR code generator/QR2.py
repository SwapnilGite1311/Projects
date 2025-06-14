import qrcode
from PIL import Image
import qrcode.constants
#Error correction H,L etc... this handles the errors in the qr
qr=qrcode.QRCode(version=1,
                 error_correction=qrcode.constants.ERROR_CORRECT_H,
                 box_size=20,border=4,)

qr.add_data("https://www.hackerrank.com/challenges/list-comprehensions/problem?isFullScreen=true")
qr.make(fit=True)
img=qr.make_image(fill_color="red",back_color="white")
img.save("Hackerrank.png")
print("Qr has been created.....")