import * as React from 'react';
import {ClockLoader} from 'react-spinners';
import {css} from '@emotion/core';

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

const override = css`
    position: absolute;
    display: block;
    margin: auto;
    border-color: grey;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;

export class CustomSpinner extends React.PureComponent<IOwnProps, IState> {
    constructor(props: IOwnProps) {
        super(props);

        this.state = {target: null}
    }

    render() {
        const {show} = this.props;

        return (
            <ClockLoader
                css={override}
                size={"50px"}
                color={"#123abc"}
                loading={show}
            />
        );
    }
}
