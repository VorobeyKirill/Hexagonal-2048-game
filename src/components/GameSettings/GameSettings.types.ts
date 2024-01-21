import { SetURLSearchParams } from "react-router-dom";

export interface GameSettingsProps {
    setSearchParams: SetURLSearchParams;
}

export enum RNG_HOSTNAME {
    LOCALHOST = "localhost",
    RNG_SERVER = "hex2048-lambda.octa.wtf"
}

export enum PORT {
    LOCALHOST = "13337",
    DEFAULT = "80"
}
