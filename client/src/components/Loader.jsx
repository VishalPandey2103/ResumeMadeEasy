import React from 'react'
import { LoaderCircleIcon } from 'lucide-react'

const Loader = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <LoaderCircleIcon
        size={28}
        className='animate-spin'
        style={{ color: 'var(--text-muted)' }}
      />
    </div>
  )
}

export default Loader