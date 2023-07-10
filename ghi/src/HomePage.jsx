import React from 'react'


const HomePage = () => {
  return (
    <>
    <div>HomePage</div>
        <ul>
          <li>
              <Link to="http://localhost:8000/api/parks/{state}">Alabama</Link>
          </li>
        </ul>
    </>
  )
}


export default HomePage
