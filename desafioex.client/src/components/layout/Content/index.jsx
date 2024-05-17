import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../../views/Home";
import Dados from "../../../views/Dados";
import NotFound from "../../../views/NotFound";
import "../Content/Content.css"

export default function Content() {
    return <>
        <main className="content_main">
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/Dados" element={<Dados />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    </>
}