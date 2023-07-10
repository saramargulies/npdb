import React, { useEffect, useState} from 'react'


const ParksByStateList() => {

    const [park, setPark] = useState([])

    const fetchData = async () => {
        const url = `http://localhost:8000/api/parks/${state}`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setState(data.state);


    }
}
}

  return (
    <div>ParksByStateList</div>
  )


export default ParksByStateList
