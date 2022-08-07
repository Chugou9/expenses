import React, {useContext, useState} from 'react';
import {LayoutBlock} from '../../Common/Layout/Components/LayoutBlock';
import {FormGroup} from 'Common/BuildingBlocks/FormGroup/FormGroup'
import {AuthServices} from 'Common/Services/AuthServices';
import {AuthContext} from 'Common/Contexts/Auth.context';
import {ROUTES} from 'Common/Menu/Consts';
import {useNavigate} from 'react-router';
import { Check } from 'Common/BuildingBlocks/Icon';

const services = new AuthServices();

const AuthorisationPage = (): JSX.Element => {
    const [passwordValue, setPasswordValue] = useState<string | undefined>(undefined);
    const [loginValue, setLoginValue] = useState<string | undefined>(undefined);
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

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
        navigate(ROUTES.PUBLIC_UTILITY_PAYMENTS.PATH);
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
                    <Check />
                    Авторизоваться
                </button>
            </div>
        </LayoutBlock>
    );
}

export default AuthorisationPage;