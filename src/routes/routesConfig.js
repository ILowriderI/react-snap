import RegisterPage from "../components/RegisterPage/RegisterPage";
import NewPost from "../components/NewPost/NewPost";
import HomePage from "../components/HomePage/HomePage";
import Message from "../components/Message/Message";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import SavedProductsPage from "../components/SavedProductsPage/SavedProductsPage";
import ProductPage from "../components/ProductPage/ProductPage";
import ChatPage from "../components/ChatPage/ChatPage";
import LoginPage from "../components/LoginPage/LoginPage";
import SearchPage from "../components/SearchPage/SearchPage";
import NotFound from "../components/NotFound/NotFound";




const routesConfig = [
  {
    path: "/new-post",
    element: <NewPost />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:   "/saved" ,
    element: <SavedProductsPage />,
  },
  {
    path: "/message",
    element: <Message />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/chat/:id",
    element: <ChatPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
 
];

export default routesConfig;
