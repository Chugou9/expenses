import * as React from 'react';
import {Table} from 'Common/Table/Components/Table';
import {ModalWindow} from 'Common/ModalWindow/ModalWindow';
import {LayoutBlock} from 'Common/Layout/Components/LayoutBlock'
import {PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS, PublicUtilityPaymentsFormFields} from '../Consts';
import {IFormFieldToRender} from 'Models/FormModels';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt, faCheck, faLightbulb, faFire} from '@fortawesome/free-solid-svg-icons';
import {IPublicUtilityMonthPayments} from 'Models/PublicUtilityPayments';
import {FormGroup} from 'Common/BuildingBlocks/FormGroup/FormGroup';
import {PublicUtilityPaymentsServices} from '../Services/PublicUtilityPaymentsServices';
import { IAbstractFuel, IAbstractOption } from 'Models/Common';

const services = new PublicUtilityPaymentsServices();

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
     * Возвращает опции для селекта месяца.
     */
    getSelectMonthOptions = (): IAbstractOption[] => {
        return ([
            {
                value: 0,
                label: 'Январь'
            },
            {
                value: 1,
                label: 'Февраль'
            },
            {
                value: 2,
                label: 'Март'
            },
            {
                value: 3,
                label: 'Апрель'
            },
            {
                value: 4,
                label: 'Май'
            },
            {
                value: 5,
                label: 'Июнь'
            },
            {
                value: 6,
                label: 'Июль'
            },
            {
                value: 7,
                label: 'Август'
            },
            {
                value: 8,
                label: 'Сентябрь'
            },
            {
                value: 9,
                label: 'Октябрь'
            },
            {
                value: 10,
                label: 'Ноябрь'
            },
            {
                value: 11,
                label: 'Декабрь'
            }]
        );
    }

    /**
     * Обработчик открытия модального окна редактирования полей.
     */
    handleOpenEditModal = () => {
        this.setState({showEditFieldsModal: true});
    };

    /**
     * Обработчик закрытия модального окна редактирования полей.
     */
    handleCloseEditModal = () => {
        this.setState({showEditFieldsModal: false});
    };

    /**
     * Обработчик изменения полей модального окна.
     *
     * @param {keyof IPublicUtilityMonthPayments} field Наименование поля.
     */
    handleEditModalChangeField = (
        field: keyof IPublicUtilityMonthPayments
    ) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
          
        this.setState((prevState: IState) => ({
            currentMonthUtilityPayments: {
                ...prevState.currentMonthUtilityPayments,
                [field]: value ? parseInt(value) : null
            }
        }));
    };

    /**
     * Обработчик сохранения данных текущего месяца.
     */
    handleSave = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {currentMonthUtilityPayments} = this.state;
        const {saveNewPublicUtilityPayments} = services;
        
        saveNewPublicUtilityPayments(currentMonthUtilityPayments).then(
            (value: any) => {
                console.log(value);
                this.handleCloseEditModal();
            },
            (error) => console.log(error)
        );
    };

    /**
     * Обрабатывает выбор месяца для редактирования данных.
     */
    handleSelectMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        const currentMonthUtilityPayments = {...this.state.currentMonthUtilityPayments};

        currentMonthUtilityPayments.month = value;
        this.setState({currentMonthUtilityPayments});
    }

    /**
     * Рисует поля формы.
     */
    renderFields = () => {
        const {electricity, gas} = PublicUtilityPaymentsFormFields;
        const {currentMonthUtilityPayments} = this.state;
        const result: JSX.Element[] = [];

        const renderSimple = (label: string, placeholder: string, field: keyof IPublicUtilityMonthPayments) => {
            return (
                <FormGroup
                    label={label}
                    labelClassName="col-xs-4"
                    elementClassName="col-xs-8"
                >
                    <input
                        className="form-control"
                        placeholder={placeholder}
                        value={currentMonthUtilityPayments[field as keyof IPublicUtilityMonthPayments] as string | number}
                        onChange={this.handleEditModalChangeField(field)}
                    />
                </FormGroup>
            );
        };

        const renderMonth = (label: string, placeholder: string, field: keyof IPublicUtilityMonthPayments) => {
            const options = this.getSelectMonthOptions().map((option) => <option label={option.label} value={option.value} title={option.label}>{option.label}</option>)
            return (
                <FormGroup
                    label={label}
                    labelClassName="col-xs-4"
                    elementClassName="col-xs-8"
                >
                    <select
                        className="form-control"
                        placeholder={placeholder}
                        value={currentMonthUtilityPayments[field as keyof IPublicUtilityMonthPayments] as string | number}
                        onChange={this.handleSelectMonthChange}
                    >
                        {options}
                    </select>
                </FormGroup>
            );
        }

        // Отрисовывает поля для блока "Электроэнергия".
        const renderElectricityField = () => {
            const {electricity: data} = currentMonthUtilityPayments;

            return (
                <div className="col-xs-12">
                    <hr className="dashed" />

                    <div className="col-xs-2 field-icon">
                        <FontAwesomeIcon icon={faLightbulb} title={electricity.subheader as string}/>
                    </div>

                    <div className="col-xs-10">
                        <FormGroup
                            label={(electricity.actualSum as IFormFieldToRender).label}
                            labelClassName="col-xs-4"
                            elementClassName="col-xs-8"
                        >
                            <input
                                className="form-control"
                                placeholder={(electricity.actualSum as IFormFieldToRender).placeholder}
                                value={data ? data.actualSum : ''}
                                onChange={this.handleChangeFormField('electricity', 'actualSum')}
                            />
                        </FormGroup>

                        <FormGroup
                            label={(electricity.data as IFormFieldToRender).label}
                            labelClassName="col-xs-4"
                            elementClassName="col-xs-8"
                        >
                            <input
                                className="form-control"
                                placeholder={(electricity.data as IFormFieldToRender).placeholder}
                                value={data ? data.data : ''}
                                onChange={this.handleChangeFormField('electricity', 'data')}
                            />
                        </FormGroup>
                    </div>
                </div>
            );
        };

        // Отрисовывает поля для блока "Газ".
        const renderGasField = () => {
            const {gas: data} = currentMonthUtilityPayments;

            return (
                <div className="col-xs-12">
                    <hr className="dashed" />

                    <div className="col-xs-2 field-icon">
                        <FontAwesomeIcon icon={faFire} title={gas.subheader as string}/>
                    </div>

                    <div className="col-xs-10">
                        <FormGroup
                            label={(gas.actualSum as IFormFieldToRender).label}
                            labelClassName="col-xs-4"
                            elementClassName="col-xs-8"
                        >
                            <input
                                className="form-control"
                                placeholder={(gas.actualSum as IFormFieldToRender).placeholder}
                                value={data ? data.actualSum : ''}
                                onChange={this.handleChangeFormField('gas', 'actualSum')}
                            />
                        </FormGroup>

                        <FormGroup
                            label={(gas.data as IFormFieldToRender).label}
                            labelClassName="col-xs-4"
                            elementClassName="col-xs-8"
                        >
                            <input
                                className="form-control"
                                placeholder={(gas.data as IFormFieldToRender).placeholder}
                                value={data ? data.data : ''}
                                onChange={this.handleChangeFormField('gas', 'data')}
                            />
                        </FormGroup>
                    </div>
                </div>
            );
        }

        PublicUtilityPaymentsFormFields && Object.keys(PublicUtilityPaymentsFormFields).forEach((key: string) => {
            if(key === 'month') {
                result.push(renderMonth(
                    PublicUtilityPaymentsFormFields[key].label as string,
                    PublicUtilityPaymentsFormFields[key].placeholder as string,
                    key as keyof IPublicUtilityMonthPayments
                    )
                );
            } else if (key === 'electricity') {
                result.push(renderElectricityField());
            } else if (key === 'gas') {
                result.push(renderGasField());
                result.push(<hr />)
            } else {
                result.push(
                    renderSimple(
                        PublicUtilityPaymentsFormFields[key].label as string,
                        PublicUtilityPaymentsFormFields[key].placeholder as string,
                        key as keyof IPublicUtilityMonthPayments
                    )
                );
            }
        });

        return <React.Fragment>{result}</React.Fragment>;
    };

    /**
     * Обновляет поле комплексного объекта (электричество или газ).
     */
    handleEditModalChangeComplexField = (field: keyof IPublicUtilityMonthPayments, value: IAbstractFuel) => {
        let {currentMonthUtilityPayments} = this.state;
        const newField = currentMonthUtilityPayments[field] ? {
            ...currentMonthUtilityPayments[field] as IAbstractFuel,
            ...value
        } : {
            ...value
        };

        this.setState((prevState: IState) => ({
            currentMonthUtilityPayments: {
                ...prevState.currentMonthUtilityPayments,
                [field]: {...newField}
            }
        }));
    };

    /**
     * Метод обработчик, собирает объект ключ-значение и прокидывает в метод для изменения состояния.
     *
     * @param {keyof IPublicUtilityMonthPayments} field Поле, значение в котором необходимо поменять.
     * @param {keyof IAbstractFuel} key Ключ, для которого надо изменить значение.
     * @param {number} value Значение.
     */
    handleChangeFormField = (field: keyof IPublicUtilityMonthPayments, key: keyof IAbstractFuel) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        
        this.handleEditModalChangeComplexField(field, {[key]: value ? parseInt(value) : null});
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
                            onClose={this.handleCloseEditModal}
                            footer={this.renderEditModalFooter()}
                        />
                    )}
                </div>
            </LayoutBlock>
     
        );
    }
}