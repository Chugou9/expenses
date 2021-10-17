import * as React from "react";
import {Route, Switch} from 'react-router-dom';
import {CONFIGURATION} from "../Config/Config";
import {ROUTES} from "../Consts";
import AuthorisationPage from 'Modules/Authorisation/AuthorisationPage';
import {useAuth} from "Modules/Authorisation/Auth";

/**
 * Свитч, который раскидывает юзера по конкретным компонентам.
 */
function RouterSwitch() {
    const {user} = useAuth();

    return (
        <Switch>
            {!user?.token && (
                <Route
                    key="auth"
                    path={ROUTES.AUTHORISATION.PATH}
                    exact
                    children={<AuthorisationPage />}
                />
            )}

            {!!user?.token && CONFIGURATION.map((route, index) => (
                <Route
                    key={index}
                    exact={route.exact}
                    path={route.path}
                    children={route.main}
                />
            ))}
        </Switch>
    );
}

export default RouterSwitch;