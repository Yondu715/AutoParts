import { BrowserRouter } from "react-router-dom"

export const withRouter = (component) => () => {
    return (
        <BrowserRouter>
            {component()}
        </BrowserRouter>
    )
}