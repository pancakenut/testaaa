import * as React from'react';
import { useState, useCallback, useContext, useMemo } from'react';

// 定义用户信息的类型
type UserInfo = {
    id: string;
    name: string;
    email: string;
};

// 定义上下文的值的类型
type AuthContextValue = {
    isLoggedIn: boolean;
    userInfo: UserInfo | null;
    onLogin: (user: UserInfo) => void;
    onLogout: () => void;
};

// 创建上下文
export const AuthContext = React.createContext<AuthContextValue>({
    isLoggedIn: false,
    userInfo: null,
    onLogin: () => {},
    onLogout: () => {}
});

// 创建上下文的 Provider
export const AuthProvider = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const onLogin = useCallback((user) => {
        setIsLoggedIn(true);
        setUserInfo(user);
    }, []);

    const onLogout = useCallback(() => {
        setIsLoggedIn(false);
        setUserInfo(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                userInfo,
                onLogin,
                onLogout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

// 使用上下文的 Hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

const LoginComponent = () => {
    const { isLoggedIn, onLogin } = useAuth();

    const handleLogin = () => {
        const newUser = {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@example.com'
        };
        onLogin(newUser);
    };

    return (
        <div>
            {isLoggedIn? (
                <p>You are already logged in.</p>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};

const ProfileComponent = () => { 
    const { isLoggedIn, userInfo } = useAuth();

    return (
        <div>
            {isLoggedIn? (
                <div>
                    <p>Welcome, {userInfo?.name}!</p>
                    <p>Your email: {userInfo?.email}</p>
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <LoginComponent />
            <ProfileComponent />
        </AuthProvider>
    );
};

export default App;







