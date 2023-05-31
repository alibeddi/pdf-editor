import React from 'react';
import { Header, Button } from 'semantic-ui-react';

const ConfirmContent = ({
    title,
    onConfirm,
    onDismiss,
}) => (
    <div>
        <Header as="h4" inverted>
            {title}
        </Header>

        <Button onClick={onDismiss}>No</Button>
        <Button negative onClick={onConfirm}>
            Yes
        </Button>
    </div>
);

export default ConfirmContent;
