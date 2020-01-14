import * as React from 'react';
import {LayoutBlock} from 'Common/Layout/Components/LayoutBlock';
import {FormGroup} from 'Common/BuildingBlocks/FormGroup/FormGroup'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {Chat} from '../CommetD';

const cometd = new Chat();

interface IOwnProps {}

interface IState {
    userMessage: string;
    answer: string[];
    user26Message: string;
    cometdUrl: string;
    showJoinButton: boolean;
    user: {
        name: string,
        message: string,
        answer: string[],
        isConnected: boolean;
    }
    anotherServerValue: boolean;
}

export class ChatForm extends React.PureComponent<IOwnProps, IState> {

    constructor(props: IOwnProps) {
        super(props);
        const user = {
            name: '',
            message: '',
            answer: [''],
            isConnected: false
        };
        const cometdUrl = 'https://10.10.10.17:9443/c/cometd';

        this.state = {
            userMessage: '',
            answer: [''],
            user26Message: '',
            user,
            cometdUrl,
            showJoinButton: true,
            anotherServerValue: false
        };
    }

    componentDidMount() {
    }

    renderInput = () => {
        const {userMessage} = this.state;

        return (
            <input placeholder="Введите уже..." value={userMessage} />
        );
    }

    handleJoin = () => {
        const {user, cometdUrl} = this.state;

        this.setState({showJoinButton: false}, () => {
            cometd.join({userName: user.name, cometdUrl, postSubscribeAction: this.handleRecieveMessage});
        });
    }

    handleRecieveMessage = (message: string) => {
        const {answer} = this.state;

        this.setState({answer: [...answer, message]});
    }

    handleSend = () => {
        const {user: {
            message
        }} = this.state;

        this.setState((prevState: IState) => ({
            ...prevState,
            user: {
                ...prevState.user,
                message: ''
            }
        }),
        () => cometd.send(message));
    };

    handleInputChange = (event: any) => {
        const {showJoinButton} = this.state;
        const value = event.target.value;

        if (showJoinButton) {
            this.setState((prevState: IState) => ({...prevState, user: {...prevState.user, name: value}}));
        } else {
            this.setState((prevState: IState) => ({...prevState,user: {...prevState.user, message: value}}));
        }
    }

    handleSetAnotherServer = () => {
        this.setState({cometdUrl: 'http://10.10.10.17:10039/c/cometd', anotherServerValue: true})
    }

    render() {
        const {
            answer,
            showJoinButton,
            user: {
                name,
                message
            },
            anotherServerValue
        } = this.state;
        const inputValue = showJoinButton ? name : message;

        return (
            <LayoutBlock>
                <div className="form-horizontal">
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="col-xs-12">
                                {answer.map((message) => (
                                    <div className="row">
                                        <p>{message}</p>
                                    </div>
                                ))}
                            </div>

                            <FormGroup
                                label="Сообщение"
                            >
                                <input placeholder="Введите уже..." value={inputValue} onChange={this.handleInputChange}/>

                                {showJoinButton && (
                                    <button
                                        onClick={this.handleJoin}
                                        className="btn btn-success ml-1"
                                    >
                                        <FontAwesomeIcon icon={faCheck}/>
                                        Присоединиться
                                    </button>
                                )}

                                <button
                                    onClick={this.handleSend}
                                    className="btn btn-success ml-1"
                                >
                                    <FontAwesomeIcon icon={faCheck}/>
                                    Отправить
                                </button>
                            </FormGroup>

                            <div>
                                <input
                                    type="checkbox"
                                    id="26_server"
                                    checked={anotherServerValue}
                                    onClick={this.handleSetAnotherServer}
                                    title="http://10.10.10.17:10039/c/cometd"
                                />

                                <label htmlFor="26_server">Другой сервер</label>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutBlock>
        );
    }
}