import './App.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import {Container} from 'react-bootstrap';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {withAxiosIntercepted} from "./hooks/withAxiosIntercepted";
import {AppRouter} from "./router/AppRouter";
import {UserContextProvider} from "./context/UserContext";
import {BoardContextProvider} from "./context/BoardContext";


function App() {

    return (
        <UserContextProvider>
            <BoardContextProvider>
                <Header/>
                <main>
                    <Container>
                        <AppRouter />
                        <ToastContainer />
                    </Container>
                </main>
                <Footer/>
            </BoardContextProvider>
        </UserContextProvider>

    );
}

export default withAxiosIntercepted(App);
