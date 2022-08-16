import axios from 'axios'
import { GgntwGame } from '../../../../lib/globalTypes'

export const getGgntwGamesList = async (): Promise<GgntwGame[]> => {
  try {
    const res = await axios.get('https://api.ggntw.com/steam.games')
    return res.data.supported as GgntwGame[]
  } catch (err) {
    return []
  }
}
