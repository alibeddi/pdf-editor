import React from 'react';
import { AttachmentTypes } from '../entities';
import Image from '../containers/Image';
import Drawing from '../containers/Drawing';
import Text from '../containers/Text';

const Attachments = ({
    attachments,
    pdfName,
    pageDimensions,
    removeAttachment,
    updateAttachment,
}) => {
    const handleAttachmentUpdate = (index) => (attachment) =>
        updateAttachment(index, attachment);

    return attachments ? (
        <>
            {attachments.length
                ? attachments.map((attachment, index) => {
                    const key = `${pdfName}-${index}`;

                    if (attachment.type === AttachmentTypes.IMAGE) {
                        return (
                            <Image
                                key={key}
                                pageWidth={pageDimensions.width}
                                pageHeight={pageDimensions.height}
                                removeImage={() => removeAttachment(index)}
                                updateImageAttachment={handleAttachmentUpdate(index)}
                                {...attachment}
                            />
                        );
                    }

                    if (attachment.type === AttachmentTypes.DRAWING) {
                        return (
                            <Drawing
                                key={key}
                                pageWidth={pageDimensions.width}
                                pageHeight={pageDimensions.height}
                                removeDrawing={() => removeAttachment(index)}
                                updateDrawingAttachment={handleAttachmentUpdate(index)}
                                {...attachment}
                            />
                        );
                    }

                    if (attachment.type === AttachmentTypes.TEXT) {
                        return (
                            <Text
                                key={key}
                                pageWidth={pageDimensions.width}
                                pageHeight={pageDimensions.height}
                                updateTextAttachment={handleAttachmentUpdate(index)}
                                {...attachment}
                            />
                        );
                    }
                    return null;
                })
                : null}
        </>
    ) : null;
};

export default Attachments;
