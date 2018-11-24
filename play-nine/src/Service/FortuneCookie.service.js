import axios from 'axios';

const FortuneCookieService = {
    getAny : (randomNumber) => {
        return axios.get(`http://fortunecookieapi.herokuapp.com/v1/fortunes?limit=1&skip=${randomNumber}`);
    }

}

export default FortuneCookieService;