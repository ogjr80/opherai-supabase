import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  className?: string;
}

export default function BackButton({ href, className = '' }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors ${className}`}
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      <span>Back</span>
    </button>
  );
}