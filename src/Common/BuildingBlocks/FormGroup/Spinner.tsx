import * as React from 'react';
import {ScaleLoader} from 'react-spinners';
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
    margin: 0 auto;
    border-color: grey;
`;

export class CustomSpinner extends React.PureComponent<IOwnProps, IState> {
    constructor(props: IOwnProps) {
        super(props);

        this.state = {target: null}
    }

    render() {
        const {show} = this.props;

        return (
            <ScaleLoader
                css={override}
                height='150px'
                width='150px'
                //size={"150px"} this also works
                color={"#123abc"}
                loading={show}
            />
        );
    }
}
