import { DefaultColorThemePalette, Tldraw, useEditor, useValue} from 'tldraw'
import 'tldraw/tldraw.css'
import { ContextToolbarComponent} from './EditorFunctions'
import '../Styles/layer-panel.css'
import { ShapeList } from './ShapeList'

DefaultColorThemePalette.lightMode.black.solid= 'aqua'

function LayerPanelComponent (){
	const editor = useEditor()
	const shapeIds = useValue(
		'shapeIds',
		() => editor.getSortedChildIdsForParent(editor.getCurrentPageId()),
		[editor]
	)
	return (
		<div className="layer-panel">
			<div className="layer-panel-title">Shapes</div>

			<ShapeList
				// [2]
				shapeIds={shapeIds}
				depth={0}
			/>
		</div>
	)
}



const InFrontOfTheCanvasWrapper = () => (
	<>
		<ContextToolbarComponent />
		<LayerPanelComponent />
	</>
);



const componentsCanvas = {
    InFrontOfTheCanvas: InFrontOfTheCanvasWrapper,
};



export default function Draw() {


	return (
		<div style={{ position: 'fixed', inset: 0 }} className='tldraw__editor'>
			<Tldraw components={componentsCanvas} persistenceKey='example1'/>
		</div>
	)
}

