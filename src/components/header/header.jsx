import { useState } from 'react'

import './header.css'

function Header() {
  const [count, setCount] = useState(0)

  return (
    <div className='headerWrapper'>
        <div className='navDiv'>
            <div className='logoBlock'>
                <img alt='logo'/>
            </div>
            <div className='navBlocks'>
                <div className='navMenu'>
                    <div className="menuTag"> Menu</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header
