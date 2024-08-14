import React, { useEffect, useState } from 'react';
import { Panel, DefaultButton, Label, Separator } from '@fluentui/react';
import { fetchAzureFunctionResponse } from '../../api'; // Adjust the path to your API file
import styles from '../../pages/chat/Chat.module.css';

interface Disaster {
    name: string;
    link: string;
}

export const DisastersPanel = ({ isOpen, onDismiss }: { isOpen: boolean, onDismiss: () => void }) => {
    const [disasters, setDisasters] = useState<Disaster[]>([]);

    useEffect(() => {
        const fetchDisasters = async () => {
            try {
                const data = await fetchAzureFunctionResponse();
                setDisasters(data);
            } catch (error) {
                const data = [{"name": "Arkansas Severe Storms", "link": "https://fema.gov/disaster/4788"}, {"name": "Florida Hurricane Debby", "link": "/disaster/4806"}, {"name": "Florida Severe Storms", "link": "/disaster/4794"}, {"name": "Hermit's Peak/Calf Canyon Fire", "link": "/disaster/current/hermits-peak"}, {"name": "Iowa Severe Storms (April)", "link": "/disaster/4779"}, {"name": "Iowa Severe Storms (May)", "link": "/disaster/4784"}, {"name": "Kentucky Severe Storms", "link": "/disaster/4804"}, {"name": "Mississippi Severe Storms", "link": "/disaster/4790"}, {"name": "Missouri Severe Storms", "link": "/disaster/4803"}, {"name": "New Mexico Wildfires", "link": "/disaster/4795"}, {"name": "Oklahoma Severe Storms (April)", "link": "/disaster/4776"}, {"name": "Oklahoma Severe Storms (May)", "link": "/disaster/4791"}, {"name": "Texas Hurricane Beryl", "link": "/disaster/4798"}, {"name": "Texas Severe Storms", "link": "/disaster/4781"}, {"name": "Wildfire Actions", "link": "/disaster/wildfire-actions"}]
                setDisasters(data);
                console.log('Error fetching disasters:', error);
            }
        };

        if (isOpen) {
            fetchDisasters();
        }
    }, [isOpen]);

    return (
        <Panel
            headerText="Disaster Information"
            isOpen={isOpen}
            isBlocking={false}
            onDismiss={onDismiss}
            closeButtonAriaLabel="Close"
            onRenderFooterContent={() => <DefaultButton onClick={onDismiss}>Close</DefaultButton>}
            isFooterAtBottom={true}
        >
            <Separator>Disaster List</Separator>
            {disasters.length === 0 ? (
                <Label>No disasters available</Label>
            ) : (
                <table className={styles.disastersTable}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disasters.map((disaster, index) => (
                            <tr key={index}>
                                <td>{disaster.name}</td>
                                <td>
                                    <a href={disaster.link} target="_blank" rel="noopener noreferrer">
                                        View Details
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Panel>
    );
};

