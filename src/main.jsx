import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
        domain="dev-1amhow0a0ahynq64.eu.auth0.com"
        clientId="uhFlwMcdC6oEmQB1cjPbQR3jCOTOu900"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <App />
    </Auth0Provider>
)
