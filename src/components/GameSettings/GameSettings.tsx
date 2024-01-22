import { FC, FormEvent, useState, MouseEvent, ChangeEvent } from "react"
import { GameSettingsProps, PORT, RNG_HOSTNAME } from "./GameSettings.types"
import { BOARD_RADIUS } from "../../types.global";

import "./GameSettings.scss";

export const GameSettings: FC<GameSettingsProps> = ({ setSearchParams }) => {
    const [settings, setSettings] = useState({
        port: PORT.DEFAULT as string,
        hostname: RNG_HOSTNAME.RNG_SERVER as string,
        radius: BOARD_RADIUS.MIN
    });

    const handleFormSubmit = (event: FormEvent): void => {
        event.preventDefault();

        setSearchParams({
            port: settings.port,
            hostname: settings.hostname,
            radius: String(settings.radius)
        });
    }

    const handleExamplesClick = (event: MouseEvent, settingName: 'port' | 'hostname'): void => {
        if ((event.target as HTMLElement).className !== 'examples__option') {
            return;
        }

        setSettings({
            ...settings,
            [settingName]: (event.target as HTMLElement).textContent || settings[settingName],
        });
    }

    const handleInputChange = (event: ChangeEvent): void => {
        setSettings({
            ...settings,
            [event.target.id]: (event.target as HTMLInputElement).value,
        });
    }

    return (
        <div className="settings-container">
            <form className="settings-form" onSubmit={handleFormSubmit} data-testid="settings-form">
                <label className="settings-form__label" htmlFor="port">Port</label>
                <input className="settings-form__input--text" type="text" id="port" value={settings.port} onChange={handleInputChange} />
                <span className="settings-form-examples" onClick={(e) => handleExamplesClick(e, "port")}>
                    Example:&nbsp;
                    <span className="examples__option">{PORT.DEFAULT}</span>
                    ,&nbsp;
                    <span className="examples__option">{PORT.LOCALHOST}</span>
                </span>

                <label className="settings-form__label" htmlFor="hostname">Hostname</label>
                <input className="settings-form__input--text" type="text" id="hostname" value={settings.hostname} onChange={handleInputChange} />
                <span className="settings-form-examples" onClick={(e) => handleExamplesClick(e, "hostname")}>
                    Example:&nbsp;
                    <span className="examples__option">{RNG_HOSTNAME.RNG_SERVER}</span>
                    ,&nbsp;
                    <span className="examples__option">{RNG_HOSTNAME.LOCALHOST}</span>
                </span>

                <label className="settings-form__label" htmlFor="radius">Radius - {settings.radius}</label>
                <input className="settings-form__input--range"
                    type="range"
                    id="radius"
                    min={BOARD_RADIUS.MIN}
                    max={BOARD_RADIUS.MAX}
                    defaultValue={settings.radius}
                    onChange={handleInputChange}
                />

                <button className="settings-form__button" type="submit">Start</button>
            </form>
        </div>
    );
}