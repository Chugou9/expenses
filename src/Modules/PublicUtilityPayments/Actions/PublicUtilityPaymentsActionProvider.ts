import { IPublicUtilityPaymentsActionPanelParams } from "../Components/PublicUtilityPaymentsActionsPanel";
import {IAbstractActionDescriptor} from '../../../Models/Common';
import {faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';

type IPublicUtilityPaymentsActionProvider = {
    EDIT: IAbstractActionDescriptor,
    DELETE: IAbstractActionDescriptor
}


export const PublicUtilityPaymentsActionsProvider = ({
    onEdit,
    selectedItem,
    services
}: IPublicUtilityPaymentsActionPanelParams): IPublicUtilityPaymentsActionProvider => ({
    EDIT: {
        key: `edit_${selectedItem._id}`,
        action: () => onEdit(selectedItem),
        title: 'Изменить',
        icon: faPencilAlt,
        className: 'btn-success mr-1'
    },
    DELETE: {
        key: `delete_${selectedItem._id}`,
        action: () => services.deletePublicUtilityPayments(selectedItem._id as number),
        title: 'Изменить',
        icon: faTimes,
        className: 'btn-danger'
    }
})