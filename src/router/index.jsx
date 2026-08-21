import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import DefultError from '../component/Errors/DefultError'
import Dashboard from '../layouts/Dashboard'
import Toast from '../component/Toast/Toast'
import PrivateRoute from './PrivateRoute'
import DashError from '../component/Dashboard/DashError'
import { useEffect, useState } from 'react'

import HomePage from '../pages/home/HomePage'
import Shop from '../pages/shop/Shop'
import Pricing from '../pages/pricing/Pricing'
import RentGuide from '../pages/rent-guide/RentGuide'
import SignIn from '../pages/auth/SignIn'
import Registation from '../pages/auth/Registation'
import ForgetPassword from '../pages/auth/ForgetPassword'
import VerifybackupCodes from '../pages/auth/VerifybackupCodes'
import VerifyPassRestOPT from '../pages/auth/VerifyPassRestOPT'
import UpdatePassword from '../pages/auth/UpdatePassword'
import DownloadCodes from '../pages/auth/DownloadCodes'
import Unauthorized from './Unauthorized'
import MyProfile from '../pages/dashbord/profiles/MyProfile'
import AuditLogs from '../pages/dashbord/superAdmin/security/AuditLogs'
import LoginHistory from '../pages/dashbord/superAdmin/security/LoginHistory'
import UserAuditLog from '../pages/dashbord/superAdmin/security/UserAuditLog'
import Users from '../pages/dashbord/superAdmin/plaftfromUsers/Users'
import ViewUser from '../pages/dashbord/superAdmin/plaftfromUsers/ViewUser'
import CreateUser from '../pages/dashbord/superAdmin/plaftfromUsers/CreateUser'
import ChatBotManage from '../pages/dashbord/superAdmin/ChatbotData/ChatBotManage'
import AddNewDocs from '../pages/dashbord/superAdmin/ChatbotData/AddNewDocs'
import CreateBranch from '../pages/dashbord/superAdmin/Branch/CreateBranch'
import Branches from '../pages/dashbord/superAdmin/Branch/Branches'
import AssignStaff from '../pages/dashbord/superAdmin/Branch/AssignStaff'
import Products from '../pages/dashbord/products/products/Products'
import ViewProduct from '../pages/dashbord/products/products/ViewProduct'
import Categories from '../pages/dashbord/products/category/Categories'
import CreateCategory from '../pages/dashbord/products/category/CreateCategory'
import ViewCategory from '../pages/dashbord/products/category/ViewCategory'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<HomePage />} />
                    <Route path='shop' element={<Shop />} />
                    <Route path='pricing' element={<Pricing />} />
                    <Route path='rent-guide' element={<RentGuide />} />

                    <Route path='login' element={<SignIn />} />
                    <Route path='registation' element={<Registation />} />
                    <Route path='download-codes' element={<DownloadCodes />} />

                    <Route path='verify-backupcodes' element={<VerifybackupCodes />} />

                    <Route path='forget-password' element={<ForgetPassword />} />
                    <Route path='verify-otp' element={<VerifyPassRestOPT />} />
                    <Route path='update-password' element={<UpdatePassword />} />

                    <Route path='unauthorized' element={<Unauthorized />} />

                </Route>

                <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff', 'customer']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff', 'customer']} ><DashError /></PrivateRoute>} />
                    <Route path='my-profile' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff', 'customer']} ><MyProfile /></PrivateRoute>} />

                    <Route path='security/audit-logs' element={<PrivateRoute roles={['super_admin']} ><AuditLogs /></PrivateRoute>} />
                    <Route path='security/login-history' element={<PrivateRoute roles={['super_admin']} ><LoginHistory /></PrivateRoute>} />
                    <Route path='security/user-auditlog/:id' element={<PrivateRoute roles={['super_admin']} ><UserAuditLog /></PrivateRoute>} />

                    <Route path='branches' element={<PrivateRoute roles={['super_admin']} ><Branches /></PrivateRoute>}/>
                    <Route path='branch/create' element={<PrivateRoute roles={['super_admin']} ><CreateBranch /></PrivateRoute>}/>
                    <Route path='branch/assign-staff' element={<PrivateRoute roles={['super_admin']} ><AssignStaff /></PrivateRoute>}/>

                    <Route path='platfrom-users' element={<PrivateRoute roles={['super_admin']} ><Users /></PrivateRoute>}/>
                    <Route path='platfrom-user/:id' element={<PrivateRoute roles={['super_admin']} ><ViewUser /></PrivateRoute>}/>
                    <Route path='user/create' element={<PrivateRoute roles={['super_admin']} ><CreateUser /></PrivateRoute>}/>

                    <Route path='website/chatbot' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff']} ><ChatBotManage /></PrivateRoute>}/>
                    <Route path='website/create-system-files' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff']} ><AddNewDocs /></PrivateRoute>}/>
                   
                    <Route path='products' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff']} ><Products /></PrivateRoute>}/>
                    <Route path='product/create' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff']} ><Products /></PrivateRoute>}/>
                    <Route path='product/view/:id' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff']} ><ViewProduct /></PrivateRoute>}/>
                    
                    <Route path='categories' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff']} ><Categories /></PrivateRoute>}/>
                    <Route path='category/create' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff']} ><CreateCategory /></PrivateRoute>}/>
                    <Route path='category/view/:id' element={<PrivateRoute roles={['super_admin', 'branch_admin', 'staff']} ><ViewCategory /></PrivateRoute>}/>


               </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App