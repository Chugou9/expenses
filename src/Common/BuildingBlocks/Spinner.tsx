import * as React from 'react';
import {ClockLoader} from 'react-spinners';

/**
 * Модель собсвтенных свойств компонента.
 *
 * @prop {boolean} show Показывает спинер.
 */
interface IOwnProps {
    show: boolean;
}

interface IState {
    target: HTMLElement | null;
}
export class CustomSpinner extends React.PureComponent<IOwnProps, IState> {
    constructor(props: IOwnProps) {
        super(props);

        this.state = {target: null}
    }

    render() {
        const {show} = this.props;

        return (
            <ClockLoader
                size={"50px"}
                color={"#123abc"}
                loading={show}
            />
        );
    }
}
