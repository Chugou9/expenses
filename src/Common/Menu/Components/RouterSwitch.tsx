import {AuthContext} from "Common/Contexts/Auth.context";
import * as React from "react";
import {Route, Routes} from 'react-router-dom';
import {CONFIGURATION} from "../Config/Config";
import {ROUTES} from "../Consts";
import AuthorisationPage from 'Modules/Authorisation/AuthorisationPage';

/**
 * Свитч, который раскидывает юзера по конкретным компонентам.
 */
function RouterSwitch() {
    const {userId} = React.useContext(AuthContext);

    return (
        <Routes>
            {!userId && (
                <Route
                    key="auth"
                    path={ROUTES.AUTHORISATION.PATH}
                    element={<AuthorisationPage />}
                />
            )}

            {!!userId && CONFIGURATION.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.main}
                />
            ))}
        </Routes>
    );
}

export default RouterSwitch;