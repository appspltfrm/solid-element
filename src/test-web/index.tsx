/* @refresh reload */
import {Route, Router} from "@solidjs/router";
import {lazy} from "solid-js";
import {render} from "solid-js/web";
import App from "./App";

render(() => <Router>
    <Route path="/" component={App}/>
    <Route path="/lazy" component={lazy(() => import("./lazy"))}/>
    <Route path="/custom-element" component={lazy(() => import("./custom-element"))}/>
    <Route path="/light-dom-element" component={lazy(() => import("./light-dom-element"))}/>
    <Route path="/vars" component={lazy(() => import("./vars"))}/>
    <Route path="/reactivity" component={lazy(() => import("./reactivity"))}/>
    <Route path="/elements" component={lazy(() => import("./elements"))}/>
    <Route path="/ext-element-component" component={lazy(() => import("./ext-element-component"))}/>
    <Route path="/literal-templates" component={lazy(() => import("./literal-templates"))}/>
</Router>, document.getElementById("root") as HTMLElement);
