import Layout from "./Layout";
import Home from "./Home";
import ErrorPage from "./ErrorPage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import HomeDashboard from "./HomeDashboard";
import UsernameInputPage from "./UsernameInputPage";
import Profile from "./Profile";
import Stat from "./Stat";
import StatStories from "../components/StatStories";
import StatAudience from "../components/StatAudience";
import Notifications from "./Notification";
import ReadingList from "./ReadingList";
import EditProfile from "./EditProfile";

const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
    ],
  },
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <HomeDashboard />,
      },
      {
        path: "/username-input",
        element: <UsernameInputPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "edit",
            element: <EditProfile />,
          }
        ]
      },
      {
        path: "/stat",
        element: <Stat />,
        children: [
          {
            index: true,
            element: <StatStories />,
          },
          {
            path: "audience",
            element: <StatAudience />,
          },
        ],
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
];

export default routes;
