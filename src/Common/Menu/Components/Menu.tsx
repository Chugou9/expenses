import * as React from 'react';
import {MemoryRouter, Redirect} from 'react-router-dom';
import {NavLinks} from './NavLinks';
import RouterSwitch from './RouterSwitch';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCompass} from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../Consts';
import {useAuth} from 'Modules/Authorisation/Auth';

/**
 * Компонент, возвращающий меню с роутером.
 */
function Menu<IOwnProps>({}: IOwnProps) {
    // const [firstLogin, setFirstLogin] = React.useState<boolean>(true);
    const [isMenuShown, setIsMenuShown] = React.useState<boolean>(false);
    const {user} = useAuth();

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
        <div className="menu">
            <FontAwesomeIcon
                className="menu-icon fa-sm"
                icon={faCompass}
                onClick={handleOpenMenu}
            />

            <MemoryRouter>
                <React.Fragment>
                    {!user?.token && <Redirect to={{pathname: ROUTES.AUTHORISATION.PATH}} />}
                    {!!user?.token && <Redirect to={{pathname: ROUTES.PUBLIC_UTILITY_PAYMENTS.PATH}} />}
                    <NavLinks className={isMenuShown ? 'menu-expanding' : 'menu-collapsing'}/>

                    <RouterSwitch/>
                </React.Fragment>
            </MemoryRouter>
        </div>
    );
}

export default Menu;
