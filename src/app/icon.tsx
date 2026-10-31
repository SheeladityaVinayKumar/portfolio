import { ImageResponse } from 'next/og'

export const size = {
  width: 128,
  height: 128,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: '#EA580C',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          borderRadius: '28px',
          fontWeight: 900,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-3px',
        }}
      >
        SV
      </div>
    ),
    {
      ...size,
    }
  )
}
