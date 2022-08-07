import React from "react";
import { Bin } from "./Bin";
import { Pencil } from "./Pencil";
import { Sum } from "./Sum";
import {EIcons} from "Enums";
import { WaterValveIcon } from "./WaterValve";
import { FireIcon } from "./FIreIcon";
import { BulbIcon } from "./BulbIcon";
import { Bill } from "./Bill";
import { Wallet } from "./Wallet";

interface IProps {
    iconName: EIcons;
}
export function Icon({iconName}: IProps) {
    switch(iconName) {
        case EIcons.PENCIL_ICON:
            return <Pencil />;
        case EIcons.BIN_ICON:
            return <Bin />;
        case EIcons.SUM_ICON:
            return <Sum />;
        case EIcons.WATER_VALVE_ICON:
            return <WaterValveIcon />;
        case EIcons.FIRE_ICON:
            return <FireIcon />;
        case EIcons.BULB_ICON:
            return <BulbIcon />;
        case EIcons.BILL_ICON:
            return <Bill />;
        case EIcons.WALLET_ICON:
            return <Wallet />;
        default:
            return null;
    }
}