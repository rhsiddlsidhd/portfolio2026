// src/components/sections/AboutSection.tsx
import React, { useState, useEffect } from "react";
// import { useInView } from 'react-intersection-observer'; // useInView 제거
import { getProfile } from "@/api/projectAPI"; // 프로필 데이터를 가져올 API 함수
// 프로필 타입
import Skeleton from "@/components/atoms/skeleton"; // 스켈레톤 컴포넌트
import { SECTION_IDS } from "@/constants/routes"; // 섹션 ID
import AnimationSection from "@/components/molecules/AnimationSection"; // AnimationSection import
import type { Profile } from "@/types/profile";
import type { ApiError } from "@/types/api";

const AboutSection: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfile(); // 수정된 getProfile 함수 호출
        setProfile(data);
      } catch (err) {
        // ApiError 타입으로 캐스팅하여 에러 메시지 활용
        setError((err as ApiError).message || "Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <AnimationSection
        id={SECTION_IDS.ABOUT}
        className="container mx-auto p-8"
      >
        {" "}
        {/* AnimationSection으로 감쌈 */}
        <h2 className="text-3xl font-bold mb-6">
          <Skeleton className="h-8 w-1/4" />
        </h2>
        <div className="flex items-center space-x-4 mb-8">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </AnimationSection>
    );
  }

  if (error) {
    return (
      <AnimationSection
        id={SECTION_IDS.ABOUT}
        className="container mx-auto p-8"
      >
        {" "}
        {/* AnimationSection으로 감쌈 */}
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-red-500">Error: {error}</p>
      </AnimationSection>
    );
  }

  return (
    <AnimationSection id={SECTION_IDS.ABOUT} className="container mx-auto p-8">
      {" "}
      {/* AnimationSection으로 감쌈 */}
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <div className="flex items-center space-x-4 mb-8">
        {/* TODO: Avatar 컴포넌트 사용 */}
        <img
          src={profile?.avatarUrl}
          alt={profile?.name}
          className="w-24 h-24 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <h3 className="text-2xl font-semibold">{profile?.name}</h3>
          <p className="text-lg text-muted-foreground">{profile?.tagline}</p>
        </div>
      </div>
      <p className="text-base leading-relaxed mb-8">{profile?.bio}</p>
      {/* TODO: Contact 정보 컴포넌트화 */}
      <div className="text-sm text-muted-foreground">
        <p>Email: {profile?.contact.email}</p>
        <p>
          GitHub:{" "}
          <a
            href={profile?.contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile?.contact.github}
          </a>
        </p>
      </div>
    </AnimationSection>
  );
};

export default AboutSection;
