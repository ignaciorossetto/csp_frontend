import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomeView from './pages/HomeView/HomeView'
import Header from './components/Header/Header'
import DetailsView from './pages/DetailsView/DetailsView'
import AddQuoteView from './pages/AddQuoteView/AddQuoteView'
import LoginView from './pages/LoginView/LoginView'
import SignUpView from './pages/SignUpView/SignUpView'
import SettingsView from './pages/SettingsView/SettingsView'
import UsersView from './pages/SettingsView/UsersView/UsersView'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<HomeView/>}/>
        <Route path='/material/:id' element={<DetailsView/>}/>
        <Route path='/add' element={<AddQuoteView/>}/>
        <Route path='/login' element={<LoginView/>}/>
        <Route path='/private/sign-up' element={<SignUpView/>}/>
        <Route path='/private/settings' element={<SettingsView/>}/>
        <Route path='/private/settings/users' element={<UsersView/>}/>
      </Routes>
    </>
  )
}

export default App
