import {IPublicUtilityMonthPayments, IPublicUtilityPaymentsFilter} from '../../../Models/PublicUtilityPayments';
import {SERVER_PATH} from '../../../Consts/REST';
import {POST, GET} from '../../../Utils/REST';

/**
 * Сервисы для модуля коммунальных платежей.
 */
export class PublicUtilityPaymentsServices {

    /**
     * Сохранить новые данные по коммунальным платежам.
     *
     * @param {IPublicUtilityMonthPayments} newPublicUtilityPayments Новые данные по платежам за текущий месяц.
     */
    saveNewPublicUtilityPayments = (newPublicUtilityPayments: IPublicUtilityMonthPayments) => {
        return POST(`${SERVER_PATH}/public-utility-payments`, newPublicUtilityPayments);
    };

    /** TODO: Переделать на параметризованный фильтр.
     * Получение всех данных по коммунальным платежам.
     */
    getAllPublicUtilityPaymentsData = (_request: IPublicUtilityPaymentsFilter) => {
        return GET(`${SERVER_PATH}/public-utility-payments`);
    };
}
