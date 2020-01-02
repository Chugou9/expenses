import * as React from 'react';
import {Table} from 'Common/Table/Components/Table';
import {ModalWindow} from 'Common/ModalWindow/ModalWindow';
import {LayoutBlock} from 'Common/Layout/Components/LayoutBlock'
import {PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS, PublicUtilityPaymentsFormFields} from '../Consts';
import {IComplexFieldToRender, IFormFieldToRender} from 'Models/FormModels';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt, faCheck} from '@fortawesome/free-solid-svg-icons';
import {IPublicUtilityMonthPayments} from 'Models/PublicUtilityPayments';
import {FormGroup} from 'Common/BuildingBlocks/FormGroup/FormGroup';
/**
 * Модель собственных свойств компонента.
 */
interface IOwnProps {}

/**
 * Модель состояния компонента.
 *
 * @prop {boolean} showEditFieldsModal Флаг, который показывает, нужно ли отображать форму редактирования полей.
 * @prop {IPublicUtilityMonthPayments} currentMonthUtilityPayments Данные о коммунальных платежах за текущий месяц.
 */
interface IState {
    showEditFieldsModal: boolean;
    currentMonthUtilityPayments: IPublicUtilityMonthPayments;
}

/**
 * Форма с коммунальными платежами.
 */
export class PublicUtilityPaymentsForm extends React.PureComponent<IOwnProps, IState> {

    constructor(props: IOwnProps) {
        super(props);

        this.state = {showEditFieldsModal: false, currentMonthUtilityPayments: {}};
    }

    /**
     * Обработчик открытия модального окна редактирования полей.
     */
    handleOpenEditModal = () => {
        this.setState({showEditFieldsModal: true});
    };

    /**
     * Обработчик сохранения данных текущего месяца.
     */
    handleSave = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => (currentMonthUtilityPayments: IPublicUtilityMonthPayments) => {
        this.setState({currentMonthUtilityPayments});
    };

    /**
     * Рисует поля формы.
     */
    renderFields = () => {
        const result: JSX.Element[] = [];

        function renderSimple(label: string, placeholder: string) {
            return (
                <FormGroup
                    label={label}
                    labelClassName="col-xs-4"
                    elementClassName="col-xs-8"
                >
                    <input className="form-control" placeholder={placeholder}/>
                </FormGroup>
            );
        }

        function renderComplex(complexObject: IComplexFieldToRender) {
            return (
                <React.Fragment>
                    {complexObject && Object.keys(complexObject).map((key: string) => {
                        if (key === 'subheader') {
                            return (
                                <React.Fragment>
                                    <hr className="dashed" />
        
                                    <span>{complexObject.subheader}</span>
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

        return <React.Fragment>{result}</React.Fragment>;
    };

    /**
     * Отрисовывает заголовок модального окна.
     */
    renderEditModalTitle = () => {
        return <label>Редактирование коммунальных расходов текущего месяца</label>
    }

    renderEditModalFooter = () => {
        return (
            <React.Fragment>
                <button
                    title={"Сохранить"}
                    className="btn btn-success"
                    onClick={this.handleSave}
                >
                    <FontAwesomeIcon icon={faCheck}/>
                    <span>Сохранить</span>
                </button>
            </React.Fragment>
        );
    }

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
                        <ModalWindow
                            title={this.renderEditModalTitle()}
                            className="form-horizontal modal-500"
                            body={this.renderFields()}
                        />
                    )}
                </div>
            </LayoutBlock>
     
        );
    }
}