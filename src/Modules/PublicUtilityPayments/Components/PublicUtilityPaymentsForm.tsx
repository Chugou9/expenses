import * as React from 'react';
import {Table} from 'Common/Table/Components/Table';
import {ModalWindow} from 'Common/ModalWindow/ModalWindow';
import {LayoutBlock} from 'Common/Layout/Components/LayoutBlock'
import {PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS, PublicUtilityPaymentsFormFields} from '../Consts';
import {IFormFieldToRender} from 'Models/FormModels';
import {IPublicUtilityMonthPayments} from 'Models/PublicUtilityPayments';
import {FormGroup} from 'Common/BuildingBlocks/FormGroup/FormGroup';
import { IAbstractFuel, IAbstractOption } from 'Models/Common';
import { PublicUtilityPaymentsServices } from '../Services/PublicUtilityPaymentsServices';
import {EModalMode} from 'Enums/Modal'
import {PublicUtilityPaymentsActionPanel} from './PublicUtilityPaymentsActionsPanel';
import {Input} from 'Common/BuildingBlocks/Input/Input';
import isEmpty from 'lodash.isempty';
import { Add, BulbIcon, Check, FireIcon, Sync, WaterValveIcon } from 'Common/BuildingBlocks/Icon';

/**
 * Модель собственных свойств компонента.
 *
 * @prop {PublicUtilityPaymentsServices} services Сервисы для использования.
 * @prop {IPublicUtilityMonthPayments[]} publicUtilityPayments Данные о коммунальных платежах.
 * @prop {Funtion} onRefreshData Колбэк на обновление данных.
 */
interface IOwnProps {
    services: PublicUtilityPaymentsServices;
    publicUtilityPayments: IPublicUtilityMonthPayments[];
    onRefreshData: (year?: number) => void;
}

/**
 * Модель состояния компонента.
 *
 * @prop {boolean} showEditFieldsModal Флаг, который показывает, нужно ли отображать форму редактирования полей.
 * @prop {IPublicUtilityMonthPayments} currentMonthUtilityPayments Данные о коммунальных платежах за текущий месяц.
 */
interface IState {
    showEditFieldsModal: boolean;
    currentMonthUtilityPayments: IPublicUtilityMonthPayments;
    modalMode: EModalMode | null;
    showedYear: number;
}

/**
 * Форма с коммунальными платежами.
 */
export class PublicUtilityPaymentsForm extends React.PureComponent<IOwnProps, IState> {

    constructor(props: IOwnProps) {
        super(props);

        this.state = {
            showEditFieldsModal: false,
            currentMonthUtilityPayments: {},
            modalMode: EModalMode.ADD,
            showedYear: new Date().getFullYear()
        };
    }

    /**
     * Показывает модальное окно и кладет данные выбранного месяца в state.
     *
     * @param {IPublicUtilityMonthPayments} selectedItem Данные выбранного месяца для редактирования.
     */
    handleEditPublicUtilityPayment = (selectedItem: IPublicUtilityMonthPayments) => {
        this.setState({
            showEditFieldsModal: true,
            currentMonthUtilityPayments: selectedItem,
            modalMode: EModalMode.EDIT
        });
    };

    /**
     * Кастомный художник строк.
     *
     * @param {IPublicUtilityMonthPayments[]} publicUtilityPayments Данные о коммунальных платежах.
     */
    customPublicUtilityPaymentsRowsRender = (publicUtilityPayments: IPublicUtilityMonthPayments[]) => {
        const {services} = this.props;
        let result: JSX.Element[] = [];

        if (!isEmpty(publicUtilityPayments)) {
            result = publicUtilityPayments.map((publicUtilityPayment: IPublicUtilityMonthPayments, index) => (
                <tr key={`${publicUtilityPayment.month}_${publicUtilityPayment.year}`}>
                    <td>{index + 1}</td>
                    <td>{this.getMonth(publicUtilityPayment.month as number)}</td>
                    <td>{publicUtilityPayment?.electricity?.actualSum || '-'}</td>
                    <td>{publicUtilityPayment?.electricity?.countedSum || '-'}</td>
                    <td>{publicUtilityPayment?.electricity?.data || '-'}</td>
                    <td>{publicUtilityPayment?.gas?.actualSum || '-'}</td>
                    <td>{publicUtilityPayment?.gas?.countedSum || '-'}</td>
                    <td>{publicUtilityPayment?.gas?.data || '-'}</td>
                    <td>{publicUtilityPayment?.water?.actualSum || '-'}</td>
                    <td>{publicUtilityPayment?.water?.countedSum || '-'}</td>
                    <td>{publicUtilityPayment?.water?.data || '-'}</td>
                    <td>{publicUtilityPayment.hus}</td>
                    <td>{publicUtilityPayment.rent}</td>
                    <td>{publicUtilityPayment?.sum?.actualSum || '-'}</td>
                    <td>{publicUtilityPayment?.sum?.countedSum || '-'}</td>
                    <td><PublicUtilityPaymentsActionPanel
                        selectedItem={publicUtilityPayment}
                        onEdit={this.handleEditPublicUtilityPayment}
                        services={services}
                    /></td>
                </tr>
            ))
        }

        return result;
    };

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
     * Вернет строку месяца по числовому формату.
     *
     * @param {number} month Номер месяца.
     */
    getMonth(month: number) {
        const foundedMonth = this.getSelectMonthOptions().find((option: IAbstractOption) => option.value === month);

        return foundedMonth ? foundedMonth.label : '';
    }

    /**
     * Обработчик открытия модального окна редактирования полей.
     */
    handleOpenAddModal = () => {
        this.setState({showEditFieldsModal: true, modalMode: EModalMode.ADD}); 
    };

    /**
     * Обработчик закрытия модального окна редактирования полей.
     */
    handleCloseEditModal = () => {
        this.setState({showEditFieldsModal: false, modalMode: null});
    };

    /**
     * Обработчик изменения полей модального окна.
     *
     * @param {keyof IPublicUtilityMonthPayments} field Наименование поля.
     */
    handleChangeModalField = (
        field: keyof IPublicUtilityMonthPayments
    ) => (
        value: string | null
    ) => {         
        this.setState((prevState: IState) => ({
            currentMonthUtilityPayments: {
                ...prevState.currentMonthUtilityPayments,
                [field]: value ? parseFloat(value) : null
            }
        }));
    };

    /**
     * Обработчик сохранения данных текущего месяца.
     */
    handleSave = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {services} = this.props;
        const {currentMonthUtilityPayments, modalMode} = this.state;
        const {saveNewPublicUtilityPayments, updatePublicUtilityPayments} = services;
        const action = modalMode === EModalMode.ADD
            ? saveNewPublicUtilityPayments
            : updatePublicUtilityPayments;

        action(currentMonthUtilityPayments).then(
            (_value: any) => {
                console.log(currentMonthUtilityPayments);
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
        const {electricity, gas, water} = PublicUtilityPaymentsFormFields;
        const {currentMonthUtilityPayments} = this.state;

        const renderSimple = (label: string, placeholder: string, field: keyof IPublicUtilityMonthPayments) => {
            const value: number = currentMonthUtilityPayments[field] as number;

            return (
                <FormGroup
                    label={label}
                    labelClassName="public-utility-payments-modal__form-group-label"
                    elementClassName="public-utility-payments-modal__form-group-element"
                >
                    {Input({
                        step:0.1,
                        placeholder,
                        value,
                        onChange:this.handleChangeModalField(field),
                        type: 'number',
                        className: "public-utility-payments-modal__input"
                    })}
                </FormGroup>
            );
        };

        const renderMonth = (label: string, placeholder: string, field: keyof IPublicUtilityMonthPayments) => {
            const options = this.getSelectMonthOptions().map((option) => <option label={option.label} value={option.value} title={option.label}>{option.label}</option>)
            return (
                <FormGroup
                    label={label}
                >
                    <select
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
                <div className="public-utility-payments-modal__resource">

                    <div className="fields-block__field-icon">
                        <BulbIcon />
                    </div>

                    <div className="fields-block__inputs-container">
                        <FormGroup
                            label={(electricity.actualSum as IFormFieldToRender).label}
                        >
                            {Input({
                                type:"number",
                                placeholder:(electricity.actualSum as IFormFieldToRender).placeholder as string,
                                value:data ? data.actualSum as number : null,
                                onChange:this.handleChangeFormField('electricity', 'actualSum')
                            })}
                        </FormGroup>

                        <FormGroup
                            label={(electricity.data as IFormFieldToRender).label}
                        >
                            {Input({
                                type:"number",
                                placeholder:(electricity.data as IFormFieldToRender).placeholder as string,
                                value:data ? data.data as number : null,
                                onChange:this.handleChangeFormField('electricity', 'data')
                            })}
                        </FormGroup>
                    </div>
                </div>
            );
        };

        // Отрисовывает поля для блока "Газ".
        const renderGasField = () => {
            const {gas: data} = currentMonthUtilityPayments;

            return (
                <div className="public-utility-payments-modal__resource">

                    <div className="fields-block__field-icon">
                        <FireIcon />
                    </div>

                    <div className="fields-block__inputs-container">
                        <FormGroup
                            label={(gas.actualSum as IFormFieldToRender).label}
                        >
                            {Input({
                                type:"number",
                                placeholder:(gas.actualSum as IFormFieldToRender).placeholder as string,
                                value:data ? data.actualSum as number : null,
                                onChange:this.handleChangeFormField('gas', 'actualSum')
                            })}
                        </FormGroup>

                        <FormGroup
                            label={(gas.data as IFormFieldToRender).label}
                        >
                            {Input({
                                type:"number",
                                placeholder:(gas.data as IFormFieldToRender).placeholder as string,
                                value:data ? data.data as number : null,
                                onChange:this.handleChangeFormField('gas', 'data'),
                            })}
                        </FormGroup>
                    </div>
                </div>
            );
        }

        // Отрисовывает поля для блока "Вода".
        const renderWaterField = () => {
            const {water: data} = currentMonthUtilityPayments;

            return (
                <div className="fields-block public-utility-payments-modal__resource">

                    <div className="fields-block__field-icon">
                        <WaterValveIcon />
                    </div>

                    <div className="fields-block__inputs-container">
                        <FormGroup
                            label={(water.actualSum as IFormFieldToRender).label}
                        >
                            {Input({
                                type:"number",
                                placeholder:(water.actualSum as IFormFieldToRender).placeholder as string,
                                value:data ? data.actualSum as number : null,
                                onChange:this.handleChangeFormField('water', 'actualSum')
                            })}
                        </FormGroup>

                        <FormGroup
                            label={(water.data as IFormFieldToRender).label}
                        >
                            {Input({
                                type:"number",
                                placeholder:(water.data as IFormFieldToRender).placeholder as string,
                                value:data ? data.data as number : null,
                                onChange:this.handleChangeFormField('water', 'data'),
                            })}
                        </FormGroup>
                    </div>
                </div>
            );
        }

        return (
            <div className="public-utility-payments-modal__body">
                {renderMonth(
                    PublicUtilityPaymentsFormFields.month.label as string,
                    PublicUtilityPaymentsFormFields.month.placeholder as string,
                    'month' as keyof IPublicUtilityMonthPayments
                    )
                }
                <hr />
                <div className="public-utility-payments-modal__row">
                    {renderSimple(
                        PublicUtilityPaymentsFormFields.hus.label as string,
                        PublicUtilityPaymentsFormFields.hus.placeholder as string,
                        'hus' as keyof IPublicUtilityMonthPayments
                    )}
                    {renderSimple(
                        PublicUtilityPaymentsFormFields.rent.label as string,
                        PublicUtilityPaymentsFormFields.rent.placeholder as string,
                        'rent' as keyof IPublicUtilityMonthPayments
                    )}
                </div>
                <hr/>
                <div className="public-utility-payments-modal__row">
                    {renderElectricityField()}
                    {renderGasField()}
                </div>
                <hr />
                <div className="public-utility-payments-modal__row">
                    {renderWaterField()}
                </div>
            </div>
        );
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
                [field]: newField
            }
        }));
    };

    /**
     * Метод обработчик, собирает объект ключ-значение и прокидывает в метод для изменения состояния.
     *
     * @param {keyof IPublicUtilityMonthPayments} field Поле, значение в котором необходимо поменять.
     * @param {keyof IAbstractFuel} key Ключ, для которого надо изменить значение.
     * @param {number | string} value Значение.
     */
    handleChangeFormField = (
        field: keyof IPublicUtilityMonthPayments,
        key: keyof IAbstractFuel
    ) => (
        value: string | number | null
    ) => {        
        this.handleEditModalChangeComplexField(field, {[key]: value ? value : null});
    };

    /**
     * Отрисовывает заголовок модального окна.
     */
    renderEditModalTitle = () => {
        const {currentMonthUtilityPayments: {
            gas,
            electricity,
            water
        }} = this.state;

        return (
            <div className="public-utility-payments-modal-title">
                <label>Редактирование коммунальных расходов текущего месяца</label>
                <div className="public-utility-payments-modal-title-actions">
                    <div className="label row">
                        <p className="mb-0">Тарифы</p>
                    </div>
                    <div className="row mt-1">
                        <FireIcon/>
                        {Input({
                            className: 'rate-input form-control',
                            value: gas?.rate ?? null,
                            onChange: this.handleChangeFormField('gas', 'rate'),
                            type: 'number'
                        })}
                    </div>
                    <div className="row mt-1">
                        <BulbIcon/>
                        {Input({
                            className: 'rate-input form-control',
                            value: electricity?.rate ?? null,
                            onChange: this.handleChangeFormField('electricity', 'rate'),
                            type: "number"
                        })}
                    </div>
                    <div className="row mt-1">
                        <WaterValveIcon />
                        {Input({
                            className: 'rate-input form-control',
                            value: water?.rate ?? null,
                            onChange: this.handleChangeFormField('water', 'rate'),
                            type: "number"
                        })}
                    </div>
                </div>
            </div>
        );
    }

    renderEditModalFooter = () => {
        return (
            <React.Fragment>
                <button
                    title={"Сохранить"}
                    className="btn btn-success"
                    onClick={this.handleSave}
                >
                    <Check />
                    <span>Сохранить</span>
                </button>
            </React.Fragment>
        );
    }

    handleShowedYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);

        this.setState({showedYear: value}, () => this.props.onRefreshData(value));
    }

    render() {
        const {publicUtilityPayments, onRefreshData} = this.props;
        const {showEditFieldsModal, showedYear} = this.state;

        return (
            <LayoutBlock>
                <div className="form-horizontal">
                    <div className="form-title-container">
                        <div className="form-title">
                            <p>Коммунальные расходы</p>
                        </div>

                        <div className="form-title-action-container">
                            <select
                                className="form-control"
                                placeholder="Год"
                                value={showedYear}
                                onChange={this.handleShowedYearChange}
                            >
                                {[
                                    {
                                        value: 2019,
                                        label: '2019'
                                    },
                                                         {
                                        value: 2020,
                                        label: '2020'
                                    },
                                                         {
                                        value: 2021,
                                        label: '2021'
                                    },
                                                         {
                                        value: 2022,
                                        label: '2022'
                                    }
                                ].map((option) => <option key={option.label} label={option.label} value={option.value} title={option.label}>{option.label}</option>)}
                            </select>
                            <button
                                className="btn btn-icon mb-2"
                                title="Добавить"
                                onClick={this.handleOpenAddModal}
                                tabIndex={1}
                            >
                                <Add />
                            </button>

                            <button
                                className="btn btn-icon mb-2 ml-1"
                                title="Обновить"
                                onClick={() => onRefreshData(showedYear)}
                                tabIndex={2}
                            >
                                <Sync/>
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        Graph
                    </div>

                    <Table 
                        data={publicUtilityPayments}
                        tableColumnsConfig={PUBLIC_UTILITY_PAYMENTS_TABLE_COLUMNS}
                        customRowsRender={this.customPublicUtilityPaymentsRowsRender}
                    />

                    {showEditFieldsModal && (
                        <ModalWindow
                            title={this.renderEditModalTitle()}
                            className="form-horizontal modal-500 public-utility-payments-modal"
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