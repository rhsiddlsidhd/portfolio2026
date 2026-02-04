// src/components/organisms/HeroSection.tsx
import { useEffect, useState } from 'react';
import { getProfile } from '@/api/projectAPI';
import type { Profile } from '@/types/profile.d.ts';
import type { ApiError } from '@/types/api.d.ts'; // ApiError import 추가

const HeroSection = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError((err as ApiError).message || 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    // TODO: Replace with a Skeleton UI component
    return <section id="hero" className="h-screen flex items-center justify-center"><div>Loading...</div></section>;
  }

  if (error) {
    return <section id="hero" className="h-screen flex items-center justify-center"><div>Error: {error}</div></section>;
  }

  if (!profile) {
    return null;
  }

  return (
    <section id="hero" className="h-screen flex flex-col items-center justify-center text-center p-4">
      {/* TODO: Replace with Avatar atom component */}
      <img src={profile.avatarUrl} alt={profile.name} className="w-32 h-32 rounded-full mb-4 border-4" />

      <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
      <p className="text-xl text-muted-foreground mb-4">{profile.tagline}</p>
      <p className="max-w-2xl mb-8">{profile.bio}</p>

      <div className="flex gap-4">
        {/* TODO: Replace with Button atom components */}
        <button className="p-2 px-4 rounded-md border">Projects</button>
        <button className="p-2 px-4 rounded-md border">Contact</button>
      </div>
    </section>
  );
};

export default HeroSection;
