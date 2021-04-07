import React, {useContext, useState} from 'react';
import {LayoutBlock} from '../../Common/Layout/Components/LayoutBlock';
import {FormGroup} from 'Common/BuildingBlocks/FormGroup/FormGroup'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {AuthServices} from 'Common/Services/AuthServices';
import {AuthContext} from 'Common/Contexts/Auth.context';

const services = new AuthServices();

const AuthorisationPage = (): JSX.Element => {
    const [passwordValue, setPasswordValue] = useState<string | undefined>(undefined);
    const [loginValue, setLoginValue] = useState<string | undefined>(undefined);
    const {login} = useContext(AuthContext);

    function handleLoginChange(event: React.SyntheticEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;

        setLoginValue(value);
    }

    function handlePasswordChange(event: React.SyntheticEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;

        setPasswordValue(value);
    }

    function handleAuthorisationClick() {
        services.logIn({email: loginValue, password: passwordValue}, login);
    }

    return (
        <LayoutBlock>
            <div className="auth-form form-horizontal">
                <FormGroup
                    label="Логин"
                >
                    <input
                        placeholder="Введите логин..."
                        value={loginValue}
                        onChange={handleLoginChange}
                    />
                </FormGroup>

                <FormGroup
                    label="Пароль"
                >
                    <input
                        placeholder="Введите пароль..."
                        value={passwordValue}
                        onChange={handlePasswordChange}
                    />
                </FormGroup>

                <button
                    onClick={handleAuthorisationClick}
                    title="Авторизоваться"
                    className=" btn btn-success"
                >
                    <FontAwesomeIcon icon={faCheck}/>
                    Авторизоваться
                </button>
            </div>
        </LayoutBlock>
    );
}

export default AuthorisationPage;