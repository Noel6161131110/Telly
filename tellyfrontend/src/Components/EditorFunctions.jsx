import { DefaultSizeStyle, track, useEditor} from 'tldraw'
import { exportToBlob} from 'tldraw'
import 'tldraw/tldraw.css'
import { sendImageAndGetMathExpression, convertBlobToBase64, sendImageAndGetExplanation} from './testGemini'
import React, { useState } from 'react';

function getMostCommonSize(sizes) {
    const sizeCount = sizes.reduce((acc, size) => {
        acc[size] = (acc[size] || 0) + 1;
        return acc;
    }, {});

    const mostCommonSize = Object.keys(sizeCount).reduce((a, b) => {
        return sizeCount[a] > sizeCount[b] ? a : b;
    });

    return mostCommonSize;
}



const ContextToolbarComponent = track(() => {
    const editor = useEditor();
    const [loading, setLoading] = useState(false);
    const [loadingExplain, setLoadingExplain] = useState(false);
    const [error, setError] = useState(null);

    const showToolbar = editor.isIn('select.idle');
    if (!showToolbar) return null;

    const selectionRotatedPageBounds = editor.getSelectionRotatedPageBounds();
    if (!selectionRotatedPageBounds) return null;

    const size = editor.getSharedStyles().get(DefaultSizeStyle);
    if (!size) return null;

    const pageCoordinates = editor.pageToViewport(selectionRotatedPageBounds.point);

    const handleClick = async (actionType) => {
        const setLoadingState = actionType === 'compute' ? setLoading : setLoadingExplain;
        setLoadingState(true);
        setError(null);

        try {
            const shapeIds = editor.getSelectedShapeIds();
            if (shapeIds.length === 0) throw new Error('No shapes on the canvas');

            const blob = await exportToBlob({
                editor,
                ids: [...shapeIds],
                format: 'png',
                opts: { background: false },
            });

            const positionShapes = shapeIds.map((id) => {
                const shape = editor.getShape(id);
                return { x: shape.x, y: shape.y, size: shape.props.size };
            });

            const avgPosition = positionShapes.reduce(
                (acc, { x, y }) => {
                    acc.x += x;
                    acc.y += y;
                    return acc;
                },
                { x: 0, y: 0 }
            );

            let avgX = avgPosition.x / positionShapes.length;
            let avgY = avgPosition.y / positionShapes.length;

            if (actionType === 'explain'){
                // avgX = avgX;
                avgY = avgY + 100;
            }

            const sizeValues = positionShapes.map((shape) => shape.size);
            const mostCommonSize = getMostCommonSize(sizeValues);

            const base64Image = await convertBlobToBase64(blob);
            let result;
            if (actionType === 'compute') {
                result = await sendImageAndGetMathExpression(base64Image);
            } else {
                result = await sendImageAndGetExplanation(base64Image);

                //result = 'Explanation not implemented';
            }

            if (actionType === 'compute') {
                editor.deleteShapes(shapeIds);
            }

            editor.createShape({
                type: 'text',
                x: avgX,
                y: avgY,
                props: {
                    text: result,
                    size: mostCommonSize,
                    scale: 3,
                },
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoadingState(false);
        }
    };



    return (
        <div
            style={{
                position: 'absolute',
                pointerEvents: 'all',
                top: pageCoordinates.y - 42,
                left: pageCoordinates.x,
                width: selectionRotatedPageBounds.width * editor.getZoomLevel(),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPointerDown={(e) => e.stopPropagation()}
        >
            <div
                style={{
                    borderRadius: 8,
                    display: 'flex',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)',
                    background: 'var(--color-panel)',
                    width: 'fit-content',
                    alignItems: 'center',
                    padding: '0 16px',
                    cursor: 'pointer',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 32,
                        color: 'black',
                        fontWeight: 'bold',
                        opacity: loading ? 0.5 : 1,
                        pointerEvents: loading ? 'none' : 'all',
                        marginRight: '2px',
                    }}
                    onClick={() => handleClick('compute')}
                    className="compute-button"
                >
                    {loading ? 'Processing...' : 'Compute'}
                </div>

                {/* Divider */}
                <div
                    style={{
                        height: '20px',
                        width: '1px',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        margin: '0 16px',
                    }}
                ></div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 32,
                        color: 'black',
                        fontWeight: 'bold',
                        opacity: loadingExplain ? 0.5 : 1,
                        pointerEvents: loadingExplain ? 'none' : 'all',
                    }}
                    onClick={() => handleClick('explain')}
                    className="explain-button"
                >
                    {loadingExplain ? 'Processing...' : 'Explain'}
                </div>
            </div>
            {error && (
                <div style={{ color: 'red', marginTop: '8px' }}>
                    {error}
                </div>
            )}
        </div>
    );
    
});



export { ContextToolbarComponent};
