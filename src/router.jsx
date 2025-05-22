import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Lists from "./pages/Lists";
import VeiwPost from "./pages/VeiwPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "list",
        element: <Lists />,
      },
      {
        path: "view/:id",
        element: <VeiwPost />,
      },
      {
        path: "write",
        element: <Editor />,
      },
      {
        path: "edit/:id",
        element: <Editor />,
      },
    ],
  },
]);

export default router;
