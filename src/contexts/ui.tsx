import { createContext, useReducer, Dispatch } from 'react'

type UIAction = 'show loader' | 'hide loader'

type UIState = {
	isLoading : boolean
	dispatch : Dispatch<UIAction>
}

const defaultUIState : UIState = {
	isLoading: false,
	dispatch: ()=>{}
}

export const UIContext = createContext(defaultUIState)

function uiReducer(state : UIState, action : UIAction) {
	switch (action) {
		case 'show loader':
			return {...state, isLoading: true}

		case 'hide loader':
			return {...state, isLoading: true}

		default:
			console.error(`Unsupported UI action: ${action}`)
	}

	return {...state}
}

type UIContextComponentProps = {
	children : React.ReactNode
}

export function UIContextComponent({
	children,
} : UIContextComponentProps) {
	const [state, dispatch] = useReducer(uiReducer, defaultUIState)

	return <UIContext.Provider
		value={{
			...state,
			dispatch,
		}}
	>
		{children}
	</UIContext.Provider>
}