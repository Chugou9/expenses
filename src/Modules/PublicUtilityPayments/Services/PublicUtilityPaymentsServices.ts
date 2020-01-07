import {IPublicUtilityMonthPayments} from '../../../Models/PublicUtilityPayments';
import {SERVER_PATH} from '../../../Consts/REST';
import {POST} from '../../../Utils/REST';

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
}
