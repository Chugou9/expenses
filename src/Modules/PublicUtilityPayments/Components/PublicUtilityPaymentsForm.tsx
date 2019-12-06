import * as React from 'react';
import {Table} from 'Common/Table/Components/Table';
import {LayoutBlock} from 'Common/Layout/Components/LayoutBlock'
import {PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS, PublicUtilityPaymentsFormFields} from '../Consts';
import {IComplexFieldToRender, IFormFieldToRender} from 'Models/FormModels';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';

/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Модель состояния компонента.
 *
 * @prop {boolean} showEditFieldsModal Флаг, который показывает, нужно ли отображать форму редактирования полей.
 */
interface IState {
    showEditFieldsModal: boolean;
}

/**
 * Форма с коммунальными платежами.
 */
export class PublicUtilityPaymentsForm extends React.PureComponent<IOwnProps, IState> {

    constructor(props: IOwnProps) {
        super(props);

        this.state = {showEditFieldsModal: false};
    }

    /**
     * Обработчик открытия модального окна редактирования полей.
     */
    handleOpenEditModal = () => {
        this.setState({showEditFieldsModal: true});
    };

    /**
     * Рисует поля формы.
     */
    renderFields = () => {
        const result: JSX.Element[] = [];

        function renderSimple(label: string, placeholder: string) {
            return (
                <div className="form-group">
                    <label className="control-label col-xs-2">{label}</label>

                    <div className="col-xs-10">
                        <input className="form-control" placeholder={placeholder}/>
                    </div>
                </div>
            );
        }

        function renderComplex(complexObject: IComplexFieldToRender) {
            return (
                <React.Fragment>
                    {complexObject && Object.keys(complexObject).map((key: string) => {
                        if (key === 'subheader') {
                            return (
                                <React.Fragment>
                                    <span>{complexObject.subheader}</span>

                                    <hr className="dashed" />
                                </React.Fragment>
                            )
                        } else {
                            const {label, placeholder} = complexObject[key] as IFormFieldToRender;

                            return renderSimple(label as string, placeholder as string)
                        }
                    })}
                </React.Fragment>
            );
        }

        PublicUtilityPaymentsFormFields && Object.keys(PublicUtilityPaymentsFormFields).forEach((key: string) => {
            if ('subheader' in PublicUtilityPaymentsFormFields[key]) {
                result.push(renderComplex(PublicUtilityPaymentsFormFields[key]));
            } else {
                result.push(renderSimple(PublicUtilityPaymentsFormFields[key].label as string, PublicUtilityPaymentsFormFields[key].placeholder as string));
            }
        });

        return result;
    };

    render() {
        const {showEditFieldsModal} = this.state;

        return (
            <LayoutBlock>
                <div className="form-horizontal">
                    <div className="form-title-container">
                        <div className="form-title">
                            <p>Коммунальные расходы</p>
                        </div>

                        <div className="form-title-action-container">
                            <button
                                className="btn btn-icon"
                                title="Редактировать"
                                onClick={this.handleOpenEditModal}
                                tabIndex={1}
                            >
                                <FontAwesomeIcon 
                                    icon={faPencilAlt}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        Graph
                    </div>

                    <div className="row">
                        <Table 
                            tableColumnsConfig={PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS}
                        />
                    </div>

                    {showEditFieldsModal && (
                        <LayoutBlock
                            className="col-xs-5 mr-2"
                        >
                            {this.renderFields()}
                        </LayoutBlock>
                    )}
                </div>
            </LayoutBlock>
     
        );
    }
}