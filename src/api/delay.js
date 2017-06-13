export default 0;


export function fetchWithDelay(request){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
                resolve (fetch(request));
            }, 2500);
    });
}
