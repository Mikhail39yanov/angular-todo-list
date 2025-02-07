import { HttpInterceptorFn } from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'token'

  const modifiedUrl = req.url.includes('?') ? `${req.url}&debug=true` : `${req.url}?debug=true`

  let clonedRequest = req.clone({ url: modifiedUrl })

  if (token) {
    clonedRequest = clonedRequest.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })
  }

  return next(clonedRequest)
}
