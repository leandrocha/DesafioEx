import Menu from "../../components/layout/Menu";
import Content from "../../components/layout/Content";
import { BrowserRouter } from "react-router-dom";
import '../App/App.css'

export default function App() {

    return (
        <>
            <BrowserRouter>
                <Menu />
                <Content />
            </BrowserRouter>        
        </>
    );
}