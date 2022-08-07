import * as React from 'react';
import {MemoryRouter, Navigate} from 'react-router-dom';
import {NavLinks} from './NavLinks';
import RouterSwitch from './RouterSwitch';
import { ROUTES } from '../Consts';
import {useAuth} from '../../Hooks/Auth.hook';
import {AuthContext} from '../../Contexts/Auth.context';
import {CompassIcon} from 'Common/BuildingBlocks/Icon'

/**
 * Компонент, возвращающий меню с роутером.
 */
function Menu<IOwnProps>({}: IOwnProps) {
    const [firstLogin, setFirstLogin] = React.useState<boolean>(true);
    const [isMenuShown, setIsMenuShown] = React.useState<boolean>(false);
    const [userId, login, logout] = useAuth();

    React.useEffect(() => {
        setFirstLogin(false);
    }, []);

    /**
     * Обработчик открытия меню.
     */
    const handleOpenMenu = () => {
        setIsMenuShown(true);
        const timerId = setTimeout(
            () => {
                setIsMenuShown(false)
                clearTimeout(timerId)
            },
            5000
        );
    };

    return (
        <AuthContext.Provider
            value={{
                userId: userId,
                login: login,
                logout: logout,
                isAuthentificated: !!userId
            }}
        >
            <div className="menu">
                <p onClick={handleOpenMenu}>
                    <CompassIcon/>    
                </p>

                <MemoryRouter>
                    <React.Fragment>
                        {firstLogin && !userId && <Navigate to={{pathname: ROUTES.AUTHORISATION.PATH}} />}
                        {firstLogin && !!userId && <Navigate to={{pathname: ROUTES.PUBLIC_UTILITY_PAYMENTS.PATH}} />}
                        <NavLinks className={isMenuShown ? 'menu-expanding' : 'menu-collapsing'}/>

                        <RouterSwitch/>
                    </React.Fragment>
                </MemoryRouter>
            </div>
        </AuthContext.Provider>
    );
}

export default Menu;
