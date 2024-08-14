// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Text } from "@fluentui/react";
import { Info24Regular } from "@fluentui/react-icons";
import styles from "./DisastersButton.module.css";

interface Props {
    className?: string;
    onClick: () => void;
}

export const DisastersButton = ({ className, onClick }: Props) => {
    return (
        <div className={`${styles.container} ${className ?? ""}`} onClick={onClick}>
            <Info24Regular/>
            <Text>{"Disaster"}</Text>
        </div>
    );
};
