import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
import CatBouncePage from './pages/CatBouncePage';

// http://localhost:5000/api/v1/users?summary=count
import UsersPage from './pages/UsersPage';
import EventsPage from './pages/EventsPage';

function App() {
    return (
        <BrowserRouter>
        <Routes>

        <Route path="/events" element={<EventsPage />} />
        {/* <Route path="/users" element={<UsersPage />} /> */}
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/" element={<CatBouncePage />} /> */}
        {/* <Route path="/profile/:token" element={<ProfilePage />} /> */}
            
            {/* <Route path="/descriptions" element={<DescriptionsListPage />} />
            <Route path="/descriptions/new" element={<DescriptionsFormInsertPage />} />
            <Route path="/descriptions/view/:id" element={<DescriptionsView />} />
            <Route path="/descriptions/view/:id/ia" element={<DescriptionsViewIA />} />
            <Route path="/descriptions/edit/:id" element={<DescriptionsFormEditPage />} /> */}

                
        </Routes>


        </BrowserRouter>
    );
}

export default App;