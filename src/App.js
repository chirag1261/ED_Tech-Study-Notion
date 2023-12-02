import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Error from './pages/Error'
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import OpenRoute from './components/core/Auth/OpenRoute'
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Settings from './components/core/Dashboard/Settings';
import Cart from "./components/core/Dashboard/Cart";
import MyCourses from './components/core/Dashboard/InstructorCourses/MyCourses'
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import EditCourse from './components/core/Dashboard/EditCourse'
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import { useEffect } from "react";
import { fetchUserDetails } from "./services/operations/profileAPI";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();

    const shouldShowNavbar = !location.pathname.includes("/view-course");

    useEffect(() => {
        if(!user) {
            dispatch(fetchUserDetails(token));
        }
    }, []);

    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
            
            { shouldShowNavbar && <Navbar/> }

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
                <Route path="/login" element={ <OpenRoute> <Login /> </OpenRoute> } />

                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/update-password/:id" element = {<UpdatePassword/>} />
                <Route path="/verify-email" element = {<VerifyEmail/>} />
                <Route path="/about" element= {<About/>} />
                <Route path="/contact" element= {<Contact/>} />
                
                <Route element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
                    <Route path="/dashboard/my-profile" element = {<ProtectedRoute><MyProfile/></ProtectedRoute>} />
                    <Route path="/dashboard/settings" element = {<ProtectedRoute><Settings/></ProtectedRoute>} />

                    {
                        user?.accountType === ACCOUNT_TYPE.STUDENT &&
                        <>
                            <Route path="/dashboard/enrolled-courses" element = {<ProtectedRoute><EnrolledCourses/></ProtectedRoute>} />
                            <Route path="/dashboard/cart" element = {<ProtectedRoute><Cart/></ProtectedRoute>} />
                        </>
                    }

                    {
                        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
                        <>
                            <Route path="/dashboard/instructor" element = {<ProtectedRoute><Instructor/></ProtectedRoute>} />
                            <Route path="/dashboard/my-courses" element = {<ProtectedRoute><MyCourses/></ProtectedRoute>} />
                            <Route path="/dashboard/add-course" element = {<ProtectedRoute><AddCourse/></ProtectedRoute>} />
                            <Route path="/dashboard/edit-course/:courseId" element = {<ProtectedRoute><EditCourse/></ProtectedRoute>} />
                        </>
                    }
                </Route>

                <Route path="/catalog/:name" element={<Catalog/>} />
                <Route path="/courses/:courseId" element={<CourseDetails/>} />

                <Route element={<ProtectedRoute><ViewCourse/></ProtectedRoute>}>
                    {
                        user?.accountType === ACCOUNT_TYPE.STUDENT && (
                            <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                                element = {<ProtectedRoute><VideoDetails/></ProtectedRoute>}
                            />
                        )
                    }
                </Route>

                
                <Route path="*" element={<Error/>} />
            </Routes>
        </div>
    )
}

export default App;
