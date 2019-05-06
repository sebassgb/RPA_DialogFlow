from uuid import uuid4
f = open('file.txt','w')
f.write(format(uuid4()))
f.close()