export function getFromCache(cacheKey: string): string | null {
    return localStorage.getItem(cacheKey);
  }
  
  export function setInCache(cacheKey: string, imageUrl: string): void {
    localStorage.setItem(cacheKey, imageUrl);
  }

  export function cacheToDataURL (cacheKey:string,imageUrl:string){
    const toDataURL = (url:string) => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
    toDataURL(imageUrl)
    .then((dataUrl:unknown) => {
      setInCache(cacheKey, dataUrl as string );
    })
  }
