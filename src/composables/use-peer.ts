import Peer, {MediaConnection} from 'peerjs';

const peer = new Peer();

export function usePeer() {

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

    function call(id: string, stream: MediaStream): MediaConnection {
	    return peer.call(id, stream);
    }

	function listenIncomingCall(): Promise<MediaConnection> {
		return new Promise((resolve) => {
			peer.on('call', (call: MediaConnection) => {
				resolve(call)
			})
		})
	}

    return {
        getId,
	    call,
	    listenIncomingCall,
    }
}
