import * as React from "react";
import {Route, Switch} from 'react-router-dom';
import {CONFIGURATION} from "../Config/Config";

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Свитч, который раскидывает юзера по конкретным компонентам.
 */
export class RouterSwitch extends React.PureComponent<IOwnProps, {}> {
    render() {
        return (
            <Switch>
                {CONFIGURATION.map((route, index) => (
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
}