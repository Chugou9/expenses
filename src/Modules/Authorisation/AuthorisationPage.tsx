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

    const handleAuthorisationClick = () => {
        services.logIn({email: loginValue, password: passwordValue}, login);
    }

    return (
        <LayoutBlock className="auth-container">
            <form className="auth-form" onSubmit={handleAuthorisationClick}>
                <FormGroup
                    label="Логин"
                    containerClassName="auth-form__form-group"
                    labelClassName="auth-form__form-group__label"
                    elementClassName="auth-form__form-group__element"
                >
                    <input
                        placeholder="Введите логин..."
                        value={loginValue}
                        onChange={handleLoginChange}
                    />
                </FormGroup>

                <FormGroup
                    label="Пароль"
                    containerClassName="auth-form__form-group"
                    labelClassName="auth-form__form-group__label"
                    elementClassName="auth-form__form-group__element"
                >
                    <input
                        placeholder="Введите пароль..."
                        value={passwordValue}
                        onChange={handlePasswordChange}
                    />
                </FormGroup>

                <button
                    type="submit"
                    title="Авторизоваться"
                    className="btn btn-success"
                    onClick={handleAuthorisationClick}
                >
                    <FontAwesomeIcon icon={faCheck}/>
                    Авторизоваться
                </button>
            </form>
        </LayoutBlock>
    );
}

export default AuthorisationPage;