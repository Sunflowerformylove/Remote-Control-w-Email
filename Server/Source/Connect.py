import socketio
from gevent.pywsgi import WSGIServer
port = 5000
sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)
sio.always_connect = True
sio.connect_timeout = 10
sio.ping_timeout = 10
sio.ping_interval = 10
sio.reconnection = True
sio.reconnection_attempts = 5
sio.reconnection_delay = 5
sio.reconnection_delay_max = 10
    
@sio.event
def connect(sid, environ):
    print('Connected to client: ', sid)

@sio.on('message')
def message(sid, data):
    if data == 'admin privileges requested':
        sio.emit('message', 'admin privileges granted')
        print('Admin privileges granted to client: ', sid)
        if http_server is not None:
            http_server.stop()
        return True
    else:
        sio.emit('message', 'message received')
        return False

def start_socketio():
    global sio
    global app
    global http_server
    print('Starting socketio...')
    http_server = WSGIServer(('', port), app)
    http_server.serve_forever()