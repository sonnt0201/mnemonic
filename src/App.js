import "./App.css";
import { MainNavbar } from "./main-navbar";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  DonePage,
  HomePage,
  OverduePage,
  OverallPage,
  DeletedPage,
  ChatPage,
  AccountInfor,
  SignUpPage,
  LoginPage,
  PendingPage,
} from "./pages";
import { useEffect } from "react";
import { useTasks, ActionEnum } from "./stores";
import { ToastNoti } from "./ToastNoti";
import { AuthListener } from "./AuthListener";
import { useUser } from "./account";
import { DownloadButton } from "./DownloadButton";
import { Tabbar } from "./tabbar";
const TIME = 60 * 1000; // thời gian giữa các lần update countDaysLeft
function App() {
  const [tasks, dispatchTasks] = useTasks();
  const [user] = useUser();
  const navigate = useNavigate();

  // useEffect để gọi bộ đếm, đếm mỗi phút
  useEffect(() => {
    const checker = setInterval(() => {
      const now = new Date();
      // chạy checker ở useEffect để có thể hủy bộ đếm khi app unmount
      dispatchTasks({
        type: ActionEnum.COUNT_DAYS_LEFT,
        payload: now,
      });
    }, TIME);

    return () => clearInterval(checker);
  }, []); // chỉ chạy lần đầu render

  //  if (!user) return <LoginPage/>
  return (
    <div className="App">
      <AuthListener />
      <MainNavbar />
      <Routes>
        {/* mở thì nhảy thẳng vào home, nếu không có user thì nhảy sang login */}
        <Route path="/mnemonic/" element={<HomePage />} />
        {user && (
          <>
            <Route path="/mnemonic/done-page" element={<DonePage />} />
            <Route path="/mnemonic/overall-page" element={<OverallPage />} />
            <Route path="/mnemonic/pending-page" element={<PendingPage />} />
            <Route path="/mnemonic/overdue-page" element={<OverduePage />} />
            <Route path="/mnemonic/deleted-page" element={<DeletedPage />} />
            <Route path="/mnemonic/chatgpt" element={<ChatPage />} />
          </>
        )}

        <Route path="/mnemonic/signin" element={<LoginPage />} />
        <Route path="/mnemonic/account" element={<AccountInfor />} />
        <Route path="/mnemonic/signup" element={<SignUpPage />} />
      </Routes>

      <ToastNoti />

      <DownloadButton/>
      {user && <Tabbar/>}
    </div>
  );
}

export default App;
