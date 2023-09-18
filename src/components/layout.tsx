import { Loader, Nav } from '@/components'
import { UIContext, UIContextComponent } from '@/contexts';
import { useContext } from 'react'

type LayoutProps = {
	children : JSX.Element | JSX.Element[]
}

function Layout({children} : LayoutProps) {
	const {isLoading} = useContext(UIContext)

	return <>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<UIContextComponent>
			<Nav />
			<div>{children}</div>
			{
				isLoading && <Loader />
			}
		</UIContextComponent>
	</>
}

export default Layout;