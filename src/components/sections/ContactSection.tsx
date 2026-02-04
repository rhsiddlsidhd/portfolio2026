// src/components/sections/ContactSection.tsx
import React, { useState, useEffect } from "react";
// import { useInView } from 'react-intersection-observer'; // useInView 제거
import { getProfile } from "@/api/projectAPI"; // 프로필 데이터를 가져올 API 함수

import Skeleton from "@/components/atoms/skeleton"; // 스켈레톤 컴포넌트
import { SECTION_IDS } from "@/constants/routes"; // 섹션 ID
import { Card } from "@/components/atoms/card"; // Card 컴포넌트 사용
import AnimationSection from "@/components/molecules/AnimationSection"; // AnimationSection import
import type { Profile } from "@/types/profile";
import type { ApiError } from "@/types/api";

const ContactSection: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        setError(
          (err as ApiError).message ||
            "Failed to fetch profile data for contact",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <AnimationSection
        id={SECTION_IDS.CONTACT}
        className="container mx-auto p-8"
      >
        {" "}
        {/* AnimationSection으로 감쌈 */}
        <h2 className="text-3xl font-bold mb-6">
          <Skeleton className="h-8 w-1/4" />
        </h2>
        <Card className="p-6 max-w-md mx-auto">
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </Card>
      </AnimationSection>
    );
  }

  if (error) {
    return (
      <AnimationSection
        id={SECTION_IDS.CONTACT}
        className="container mx-auto p-8"
      >
        {" "}
        {/* AnimationSection으로 감쌈 */}
        <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
        <p className="text-red-500">Error: {error}</p>
      </AnimationSection>
    );
  }

  if (!profile || !profile.contact) {
    return (
      <AnimationSection
        id={SECTION_IDS.CONTACT}
        className="container mx-auto p-8"
      >
        {" "}
        {/* AnimationSection으로 감쌈 */}
        <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
        <p>No contact information available.</p>
      </AnimationSection>
    );
  }

  return (
    <AnimationSection
      id={SECTION_IDS.CONTACT}
      className="container mx-auto p-8"
    >
      {" "}
      {/* AnimationSection으로 감쌈 */}
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
      <Card className="p-6 max-w-md mx-auto">
        <p className="mb-2">
          Email:{" "}
          <a
            href={`mailto:${profile.contact.email}`}
            className="text-primary hover:underline"
          >
            {profile.contact.email}
          </a>
        </p>
        <p className="mb-2">
          GitHub:{" "}
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {profile.contact.github}
          </a>
        </p>
        {profile.contact.linkedin && (
          <p className="mb-2">
            LinkedIn:{" "}
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {profile.contact.linkedin}
            </a>
          </p>
        )}
        {profile.contact.blog && (
          <p>
            Blog:{" "}
            <a
              href={profile.contact.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {profile.contact.blog}
            </a>
          </p>
        )}
      </Card>
    </AnimationSection>
  );
};

export default ContactSection;
