'use client';

import Yrkestittel from '@/app/stilling/_ui/stilling-admin/admin_moduler/Yrkestittel';
import SideLayout from '@/components/layout/SideLayout';
import React from 'react';

export default function TestIndex() {
  return (
    <div className='relative ' style={{ contain: 'layout' }}>
      <SideLayout>
        <div className=''>
          <Yrkestittel />
        </div>
      </SideLayout>
    </div>
  );
}
