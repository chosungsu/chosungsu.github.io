'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * 라우트(pathname)가 바뀔 때마다 스크롤을 최상단으로 이동시켜
 * 이전 페이지의 스크롤 위치가 유지되는 문제를 방지합니다.
 */
export default function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // 브라우저의 기본 스크롤 위치 복원 기능 비활성화 (뒤로가기 시에도 적용)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 페이지 이동 후 최상단으로 스크롤
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
} 