'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/utils/supabase/authService';
import { UserRole } from '@/types/auth';

export const RegisterForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('candidate');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.signUp(email, password, role);
      router.push(`/onboarding/${role}`);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields implementation */}
    </form>
  );
};