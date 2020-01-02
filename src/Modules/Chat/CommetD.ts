import {CometD} from 'cometd';

interface IJoinParams {
    userName: string,
    cometdUrl: string,
    postSubscribeAction: (message: string) => void;
}

// Пришлось переехать на класс по ошибочным причинам
export class Chat {
    static _cometd = new CometD();
    self = this;
    _connected = false;
    _username: string = '';
    _lastUser: string = '';
    _disconnecting: boolean = false;
    _chatSubscription: any;
    _membersSubscription: any;
    cometdUrl: string = 'http://10.10.10.17:9080/c/cometd';
    recieveMessage!: (message: string) => void;

    join = ({userName, cometdUrl, postSubscribeAction}: IJoinParams) => {
        this._disconnecting = false;
        this._username = userName;
        this.cometdUrl = cometdUrl;
        this.recieveMessage = postSubscribeAction;
        if (!this._username) {
            alert('Please enter a username');
            return;
        }

        Chat._cometd.configure({
            url: this.cometdUrl,
            logLevel: 'debug'
        });
        Chat._cometd.unregisterTransport('long-polling');
        Chat._cometd.handshake((handshake: any) => {
            if (handshake.successful) {
                this._subscribe()
            }
        });
    };

    leave = () => {
        Chat._cometd.batch(() => {
            Chat._cometd.publish('/chat', {
                user: this._username,
                membership: 'leave',
                chat: this._username + ' has left'
            });
            this._unsubscribe();
        });
        Chat._cometd.disconnect(() => console.log('disconnect'));

        this._username = '';
        this._lastUser = '';
        this._disconnecting = true;
    };

    send = (message: string) => {
        const text = message;

        if (!text || !text.length) {
            return;
        }

        var colons = text.indexOf('::');
        if (colons > 0) {
            Chat._cometd.publish('/service/privatechat', {
                room: '/chat',
                user: this._username,
                chat: text.substring(colons + 2),
                peer: text.substring(0, colons)
            });
        } else {
            Chat._cometd.publish('/chat', {
                user: this._username,
                chat: text
            });
        }
    };

    receive = (message: any, _postAction?: () => void) => {
        var fromUser = message.data.user;
        var membership = message.data.membership;
        var text = message.data.chat;
        this.recieveMessage(text);

        if (!membership && fromUser == this._lastUser) {
            fromUser = '...';
        } else {
            this._lastUser = fromUser;
            fromUser += ':';
        }

        if (membership) {
            this._lastUser = '';
        } else if (message.data.scope == 'private') {

        } else {

        }
    };

    /**
     * Updates the members list.
     * This function is called when a message arrives on channel /chat/members
     */
    members = function(message: any) {
        console.log(message);
    };

    _unsubscribe() {
        if (this._chatSubscription) {
            Chat._cometd.unsubscribe(this._chatSubscription);
        }

        this._chatSubscription = null;

        if (this._membersSubscription) {
            Chat._cometd.unsubscribe(this._membersSubscription);
        }

        this._membersSubscription = null;
    }

    _subscribe() {
        this._chatSubscription = Chat._cometd.subscribe('/chat', this.receive);
        this._membersSubscription = Chat._cometd.subscribe('/members/demo', this.members);
    }

    _connectionInitialized = () => {
        // first time connection for this client, so subscribe tell everybody.
        Chat._cometd.batch(() => {
            this._subscribe();
            Chat._cometd.publish('/chat', {
                user: this._username,
                membership: 'join',
                chat: this._username + ' has joined'
            });
        });
    }

    _connectionEstablished() {
        // connection establish (maybe not for first time), so just
        // tell local user and update membership
        this.receive({
            data: {
                user: 'system',
                chat: 'Connection to Server Opened'
            }
        });
        Chat._cometd.publish('/service/members', {
            user: this._username,
            room: '/chat'
        });
    }

    _connectionBroken() {
        this.receive({
            data: {
                user: 'system',
                chat: 'Connection to Server Broken'
            }
        });
        console.log('members are empty');
    }

    _connectionClosed() {
        this.receive({
            data: {
                user: 'system',
                chat: 'Connection to Server Closed'
            }
        });
    }

    _metaConnect(message: any) {
        if (this._disconnecting) {
            this._connected = false;
            this._connectionClosed();
        } else {
            var wasConnected = this._connected;
            this._connected = message.successful === true;
            if (!wasConnected && this._connected) {
                this._connectionEstablished();
            } else if (wasConnected && !this._connected) {
                this._connectionBroken();
            }
        }
    }

    _metaHandshake(message: any) {
        if (message.successful) {
            this._connectionInitialized();
        }
    }

    // Chat._cometd.registerExtension('reload', new org.cometd.ReloadExtension();

    handshake = Chat._cometd.addListener('/meta/handshake', this._metaHandshake);
    connect = Chat._cometd.addListener('/meta/connect', this._metaConnect);
}
