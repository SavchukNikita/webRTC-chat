import {DataConnection, MediaConnection} from "peerjs";

export type StreamCB = (stream: MediaStream) => any;

export type CallCB = (conn: MediaConnection) => any;

export type ConnectionCB = (conn: DataConnection) => any;