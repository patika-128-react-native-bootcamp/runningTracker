import React from "react";
import Router from "./Router";
import Provide from "./context/provider";

export default () => {
    return (
        <Provide>
            <Router />
        </Provide>
    )
}