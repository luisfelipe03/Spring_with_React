import LoginPage from '@/app/login/page';
import { useAuth } from '@/resources';

interface AuthenticatedPageProps {
    children: React.ReactNode;
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({children}: AuthenticatedPageProps) => {
    
    const auth = useAuth();

    if(!auth.isSessionValid()) {
        return <LoginPage />;
    }
    
    
    return (
        <div>
            {children}
        </div>
    );
}