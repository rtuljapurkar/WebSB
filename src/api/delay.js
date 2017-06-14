export default 0;

export function fetchWithDelay(request){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
                    try{
                        resolve ( fetch(request));
                    }catch(ex){
                        throw ex;
                    }

            }, 0);
    });
}
