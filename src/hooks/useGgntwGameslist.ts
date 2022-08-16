import axios from 'axios/dist/axios'
import { useEffect, useState } from 'react'

const useGgntwGameslist = () => {
  //  * States
  const [gameList, setGameList] = useState([])

  // * Effects
  useEffect(() => {
    getGameList()
  }, [])

  // * Functions
  const getGameList = async () => {
    const response = await axios.get('https://api.ggntw.com/steam.games')
    const data = await response.data
    if (data.supported) {
      setGameList(data.supported)
    }
  }

  return gameList
}

export default useGgntwGameslist
