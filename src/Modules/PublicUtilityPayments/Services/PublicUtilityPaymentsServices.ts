import {IPublicUtilityMonthPayments, IPublicUtilityPaymentsFilter} from '../../../Models/PublicUtilityPayments';
import {SERVER_PATH} from '../../../Consts/REST';
import {POST, GET, DELETE, PUT} from '../../../Utils/REST';

/**
 * Сервисы для модуля коммунальных платежей.
 */
export class PublicUtilityPaymentsServices {

    /**
     * Сохранить новые данные по коммунальным платежам.
     *
     * @param {IPublicUtilityMonthPayments} newPublicUtilityPayments Новые данные по платежам за текущий месяц.
     */
    saveNewPublicUtilityPayments = (newPublicUtilityPayments: IPublicUtilityMonthPayments): Promise<IPublicUtilityMonthPayments> => {
        return POST(`${SERVER_PATH}/public-utility-payments`, newPublicUtilityPayments);
    };

    /** TODO: Переделать на параметризованный фильтр.
     * Получение всех данных по коммунальным платежам.
     */
    getAllPublicUtilityPaymentsData = (_request: IPublicUtilityPaymentsFilter): Promise<IPublicUtilityMonthPayments[]> => {
        return GET(`${SERVER_PATH}/public-utility-payments`);
    };

    /**
     * Сохранить новые данные по коммунальным платежам.
     *
     * @param {IPublicUtilityMonthPayments} editedPublicUtilityPayments Обновленные данные по платежам за текущий месяц.
     */
    updatePublicUtilityPayments = (editedPublicUtilityPayments: IPublicUtilityMonthPayments): Promise<IPublicUtilityMonthPayments> => {
        return PUT(`${SERVER_PATH}/public-utility-payments/${editedPublicUtilityPayments._id}`, editedPublicUtilityPayments);
    };

    /**
     * Удаление выбранного коммунального платежа.
     *
     * @param {number} itemId Идентификатор платежа.
     */
    deletePublicUtilityPayments(itemId: number) {
        return DELETE(`${SERVER_PATH}/public-utility-payments/${itemId}`);
    }
}
