import Peer, {DataConnection, MediaConnection} from 'peerjs';
import {CallCB, ConnectionCB, StreamCB} from "../core/types/peer";

const peer = new Peer();

const incomingCallCB: CallCB[] = [];
const incomingConnCB: ConnectionCB[] = [];
const incomingStreamCB: StreamCB[] = [];

export function usePeer() {
    function connect(id: string): DataConnection {
        return peer.connect(id);
    }

    function getId(): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                if (peer.open) {
                    return resolve(peer.id);
                }

                peer.on('open', resolve);
            } catch (err) {
                reject(err);
            }
        });
    }

    function openRoom(): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                if (peer.open) {
                    return resolve(peer.id);
                }

                peer.on('open', resolve);
            } catch (err) {
                reject(err);
            }
        });
    }

    function startCall(id: string, stream: MediaStream): MediaConnection {
       const conn = peer.call(id, stream);

       console.log('позвонили')

       conn.on('stream', (stream) => {
           incomingStreamCB.forEach((cb) => {
               cb(stream);
           })
       });

       return conn;

    }

    function registerIncomingCallCB(cb: CallCB) {
        incomingCallCB.push(cb);
    }

    function registerIncomingConnectionCB(cb: ConnectionCB) {
        incomingConnCB.push(cb);
    }

    function registerIncomingStreamCB(cb: StreamCB) {
        incomingStreamCB.push(cb);
    }

    peer.on('connection', (d) => {
        console.log('has connect', d);
    });

    peer.on('call', (call) => {
        console.log('звонят');

        call.on('stream', (stream) => {
            console.log('стримим')
            incomingStreamCB.forEach((cb) => {
                cb(stream);
            })
        });

        incomingCallCB.forEach((cb) => {
            cb(call);
        });
    });

    return {
        connect,
        openRoom,
        getId,
        startCall,
        registerIncomingCallCB,
        registerIncomingConnectionCB,
        registerIncomingStreamCB,
    }
}
