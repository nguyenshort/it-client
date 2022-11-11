//CDN
export enum CDNLocation {
  LOCAL
}

export const $cdn = (path: string, location = CDNLocation.LOCAL) => {
  if (!path) {
    return ''
  }

  if (/^http/.test(path)) {
    return path
  }

  let _path = path.replace(/^\//, '')

  switch (location) {
    case CDNLocation.LOCAL:
      _path = 'import.meta.env.VITE_IT_CDN' + path
      break
  }

  return _path
}
