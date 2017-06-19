import axios from 'axios';
export default 0;

export function fetchWithDelay(request){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
                    try{
                        resolve (fetch(request));
                    }catch(ex){
                        console.log(ex);
                        throw ex;

                    }
            }, 0);
    });
}

export function fetchWithDelay2(request){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
                    try{
                        resolve ( axios(request));
                    }catch(ex){
                        console.log(ex);
                        throw ex;

                    }
            }, 0);
    });
}
