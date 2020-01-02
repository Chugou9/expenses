import * as React from 'react';
import {ChatForm} from '../Components/ChatForm';

interface IOwnProps {}

interface IState {}

export class ChatPage extends React.PureComponent<IOwnProps, IState> {

    render() {
        return (
            <ChatForm />
        );
    }
}
