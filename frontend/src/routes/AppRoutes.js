import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import EmailVerification from '../pages/authentication/EmailVerification';
import Register from '../pages/authentication/Register';
import Login from '../pages/authentication/Login';
import AdminPageForEvents from '../pages/admin/admin';
import EventDetails from '../pages/Event/Edetails';

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route exact path='/verify_signup_email/:token' element={<EmailVerification />}/>
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/admin' element={<AdminPageForEvents />}/>
                <Route path="/event/:name" element={<EventDetails />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;