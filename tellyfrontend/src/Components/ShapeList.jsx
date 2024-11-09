import { capitalize } from 'lodash';
import { useState } from 'react';
import { useEditor, useValue } from 'tldraw';
import { VisibilityOff, VisibilityOn } from './VisibilityIcon';

const selectedBg = '#E8F4FE';
const childSelectedBg = '#F3F9FE';
const childBg = '#00000006';

function ShapeItem({
	shapeId,
	depth,
	parentIsSelected,
	parentIsHidden,
}) {
	const editor = useEditor();

	const shape = useValue('shape', () => editor.getShape(shapeId), [editor]);
	const children = useValue('children', () => editor.getSortedChildIdsForParent(shapeId), [editor]);
	const isHidden = useValue('isHidden', () => editor.isShapeHidden(shapeId), [editor]);
	const isSelected = useValue('isSelected', () => editor.getSelectedShapeIds().includes(shapeId), [
		editor,
	]);
	const shapeName = useValue('shapeName', () => getShapeName(editor, shapeId), [editor]);

	const [isEditingName, setIsEditingName] = useState(false);

	if (!shape) return null;

	return (
		<>
			{shape && (
				<div
					className="shape-item"
					onDoubleClick={() => setIsEditingName(true)}
					onClick={() => {
						if (editor.inputs.ctrlKey || editor.inputs.shiftKey) {
							if (isSelected) {
								editor.deselect(shape);
							} else {
								editor.select(...editor.getSelectedShapes(), shape);
							}
						} else {
							editor.select(shape);
						}
					}}
					style={{
						paddingLeft: 10 + depth * 20,
						opacity: parentIsHidden || isHidden ? 0.5 : 1,
						background: isSelected
							? selectedBg
							: parentIsSelected
							? childSelectedBg
							: depth > 0
							? childBg
							: undefined,
					}}
				>
					{isEditingName ? (
						<input
							autoFocus
							className="shape-name-input"
							defaultValue={shapeName}
							onBlur={() => setIsEditingName(false)}
							onChange={(ev) => {
								if (shape.type === 'frame') {
									editor.updateShape({ ...shape, props: { name: ev.target.value } });
								} else {
									editor.updateShape({ ...shape, meta: { name: ev.target.value } });
								}
							}}
							onKeyDown={(ev) => {
								if (ev.key === 'Enter' || ev.key === 'Escape') {
									ev.currentTarget.blur();
								}
							}}
						/>
					) : (
						<div className="shape-name">{shapeName}</div>
					)}
					<button
						className="shape-visibility-toggle"
						onClick={(ev) => {
							editor.updateShape({ ...shape, meta: { hidden: !shape.meta.hidden } });
							ev.stopPropagation();
						}}
					>
						{shape.meta.hidden ? <VisibilityOff /> : <VisibilityOn />}
					</button>
				</div>
			)}
			{children?.length > 0 && (
				<ShapeList
					shapeIds={children}
					depth={depth + 1}
					parentIsHidden={parentIsHidden || isHidden}
					parentIsSelected={parentIsSelected || isSelected}
				/>
			)}
		</>
	);
}

export function ShapeList({
	shapeIds,
	depth,
	parentIsSelected,
	parentIsHidden,
}) {
	if (!shapeIds.length) return null;
	return (
		<div className="shape-tree">
			{shapeIds.map((shapeId) => (
				<ShapeItem
					key={shapeId}
					shapeId={shapeId}
					depth={depth}
					parentIsHidden={parentIsHidden}
					parentIsSelected={parentIsSelected}
				/>
			))}
		</div>
	);
}

function getShapeName(editor, shapeId) {
	const shape = editor.getShape(shapeId);
	if (!shape) return 'Unknown shape';
	return (
		(shape.meta.name) ||
		editor.getShapeUtil(shape).getText(shape) ||
		capitalize(shape.type + ' shape')
	);
}