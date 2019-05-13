broker="postman.cloudmqtt.com"
port=18569
username="vomjuvox"
password="qZhDtGK09JuN"

client = mqtt.Client("Python1",clean_session=CLEAN_SESSION)
client.username_pw_set(username, password)
client.connect(broker,port)