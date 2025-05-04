import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

// http://localhost:5000/api/v1/users?summary=count

function App() {
    return (
        <BrowserRouter>
        <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:token" element={<ProfilePage />} />
            
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