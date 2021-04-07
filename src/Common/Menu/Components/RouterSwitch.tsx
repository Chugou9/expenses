import {AuthContext} from "Common/Contexts/Auth.context";
import * as React from "react";
import {Route, Switch} from 'react-router-dom';
import {CONFIGURATION} from "../Config/Config";
import {ROUTES} from "../Consts";
import AuthorisationPage from 'Modules/Authorisation/AuthorisationPage';

/**
 * Свитч, который раскидывает юзера по конкретным компонентам.
 */
function RouterSwitch() {
    const {token} = React.useContext(AuthContext);

    return (
        <Switch>
            {!token && (
                <Route
                    key="auth"
                    path={ROUTES.AUTHORISATION.PATH}
                    exact
                    children={<AuthorisationPage />}
                />
            )}

            {!!token && CONFIGURATION.map((route, index) => (
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