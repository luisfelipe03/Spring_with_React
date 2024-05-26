'use client';

import {Template} from '@/components';
import {useState} from 'react';

export default function LoginPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);
    
    return (
        <div>
            <Template loading={loading}>
                <h1>Login</h1>
            </Template>
        </div>
    )
}