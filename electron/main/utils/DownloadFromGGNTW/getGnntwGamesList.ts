import axios from 'axios'

type GgntwGame = {
  id: number
  name: string
}

export const getGgntwGamesList = async (): Promise<GgntwGame[]> => {
  try {
    const res = await axios.get('https://api.ggntw.com/steam.games')
    return res.data.supported as GgntwGame[]
  } catch (err) {
    return []
  }
}
