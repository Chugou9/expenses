import { IPublicUtilityPaymentsActionPanelParams } from "../Components/PublicUtilityPaymentsActionsPanel";
import {IAbstractActionDescriptor} from '../../../Models/Common';
import { EIcons } from "Enums";

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
        icon: EIcons.PENCIL_ICON,
        className: 'btn-success mr-1'
    },
    DELETE: {
        key: `delete_${selectedItem._id}`,
        action: () => services.deletePublicUtilityPayments(selectedItem._id as number),
        title: 'Изменить',
        icon: EIcons.BIN_ICON,
        className: 'btn-danger'
    }
})