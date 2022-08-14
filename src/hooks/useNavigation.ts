import { currentPageAtom } from '@/atoms/CurrentPageAtom'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useRecoilValue } from 'recoil'

const useNavigation = () => {
  // * Atoms
  const currentPage = useRecoilValue(currentPageAtom)

  // * Hooks
  const navigate = useNavigate()

  // * Effects
  useEffect(() => {
    switch (currentPage) {
      case 'home':
        navigate('/')
        break
      case 'settings':
        navigate('/settings')
        break
      default:
        navigate('/')
        break
    }
  }, [currentPage])
}

export default useNavigation
