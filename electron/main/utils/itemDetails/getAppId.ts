import { HTMLPage } from '../../types'

export default function getAppId(page: HTMLPage) {
  const appId = page.querySelector(
    '#ig_bottom > div.apphub_HomeHeaderContent > div.apphub_HeaderTop.workshop > div.apphub_OtherSiteInfo.responsive_hidden > a'
  )?.attrs['data-appid']

  return appId
}
