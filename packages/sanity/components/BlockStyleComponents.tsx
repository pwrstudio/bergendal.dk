import React from 'react'

export const NormalStyle = ({ children }: any) => <p>{children}</p>

export const SmallTextStyle = ({ children }: any) => (
  <p style={{ fontSize: '12px' }}>{children}</p>
)

export const MediumTextStyle = ({ children }: any) => (
  <p style={{ fontSize: '18px' }}>{children}</p>
)

export const LargeTextStyle = ({ children }: any) => (
  <p style={{ fontSize: '24px' }}>{children}</p>
)
