import React, { useState, useEffect, useRef } from 'react';
import { DragActions } from '../entities';
import { getMovePosition } from '../utils/helpers';
import Image from '../components/Image';

const IMAGE_MAX_SIZE = 300;

const ImageContainer = ({
    x,
    y,
    img,
    width,
    height,
    pageWidth,
    removeImage,
    pageHeight,
    updateImageAttachment,
}) => {
    const canvasRef = useRef(null);
    const [canvasWidth, setCanvasWidth] = useState(width);
    const [canvasHeight, setCanvasHeight] = useState(height);
    const [mouseDown, setMouseDown] = useState(false);
    const [positionTop, setPositionTop] = useState(y);
    const [positionLeft, setPositionLeft] = useState(x);
    const [direction, setDirection] = useState([]);
    const [operation, setOperation] = useState(
        DragActions.NO_MOVEMENT
    );

    const [dimmerActive, setDimmerActive] = useState(false);

    const handleMouseDown = (event) => {
        event.preventDefault();
        setMouseDown(true);
        setOperation(DragActions.MOVE);
        const directions = event.currentTarget.dataset.direction;
        if (directions) {
            setDirection(directions.split('-'));
            setOperation(DragActions.SCALE);
        }
    };

    const handleMouseMove = (event) => {
        event.preventDefault();

        if (mouseDown) {
            const { top, left } = getMovePosition(
                positionLeft,
                positionTop,
                event.movementX,
                event.movementY,
                canvasWidth,
                canvasHeight,
                pageWidth,
                pageHeight
            );

            setPositionTop(top);
            setPositionLeft(left);
        }
    };

    const handleMouseUp = (event) => {
        event.preventDefault();
        setMouseDown(false);

        if (operation === DragActions.MOVE) {
            const { top, left } = getMovePosition(
                positionLeft,
                positionTop,
                event.movementX,
                event.movementY,
                canvasWidth,
                canvasHeight,
                pageWidth,
                pageHeight
            );

            updateImageAttachment({
                x: left,
                y: top,
            });
        }

        if (operation === DragActions.SCALE) {
            updateImageAttachment({
                x: positionLeft,
                y: positionTop,
            });
        }

        setOperation(DragActions.NO_MOVEMENT);
    };

    const handleMouseOut = (event) => {
        if (operation === DragActions.MOVE) {
            handleMouseUp(event);
        }
    };

    const handleImageScale = (event) => {
        event.preventDefault();

        if (mouseDown) {
            if (direction.includes('left')) {
                setPositionLeft(positionLeft + event.movementX);
                setCanvasWidth(canvasWidth - event.movementX);
            }

            if (direction.includes('top')) {
                setPositionTop(positionTop + event.movementY);
                setCanvasHeight(canvasHeight - event.movementY);
            }

            if (direction.includes('right')) {
                setCanvasWidth(canvasWidth + event.movementX);
            }

            if (direction.includes('bottom')) {
                setCanvasHeight(canvasHeight + event.movementY);
            }
        }
    };

    useEffect(() => {
        const renderImage = (img) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const context = canvas.getContext('2d');
            if (!context) return;

            let scale = 1;
            if (canvasWidth > IMAGE_MAX_SIZE) {
                scale = IMAGE_MAX_SIZE / canvasWidth;
            }

            if (canvasHeight > IMAGE_MAX_SIZE) {
                scale = Math.min(scale, IMAGE_MAX_SIZE / canvasHeight);
            }

            const newCanvasWidth = canvasWidth * scale;
            const newCanvasHeight = canvasHeight * scale;

            setCanvasWidth(newCanvasWidth);
            setCanvasHeight(newCanvasHeight);

            canvas.width = newCanvasWidth;
            canvas.height = newCanvasHeight;

            context.drawImage(img, 0, 0, newCanvasWidth, newCanvasHeight);
            canvas.toBlob((blob) => {
                updateImageAttachment({
                    file: blob,
                    width: newCanvasWidth,
                    height: newCanvasHeight,
                });
            });
        };

        renderImage(img);
    }, [img, canvasWidth, canvasHeight, updateImageAttachment]);

    const handleClick = () => setDimmerActive(true);
    const onCancelDelete = () => setDimmerActive(false);

    const deleteImage = () => {
        onCancelDelete();
        removeImage();
    };

    return (
        <Image
            onClick={handleClick}
            dimmerActive={dimmerActive}
            cancelDelete={onCancelDelete}
            deleteImage={deleteImage}
            positionLeft={positionLeft}
            positionTop={positionTop}
            canvasRef={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            handleImageScale={handleImageScale}
            handleMouseDown={handleMouseDown}
            handleMouseUp={handleMouseUp}
            handleMouseMove={handleMouseMove}
            handleMouseOut={handleMouseOut}
        />
    );
};

export default ImageContainer;