import LoginPage from '@/app/login/page';
import { useAuth } from '@/resources';
import { useRouter } from 'next/navigation';

interface AuthenticatedPageProps {
    children: React.ReactNode;
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({children}: AuthenticatedPageProps) => {
    
    const auth = useAuth();
    const router = useRouter();

    if(!auth.isSessionValid()) {
        router.push('/login');
    }
    
    
    return (
        <div>
            {children}
        </div>
    );
}