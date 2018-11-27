import axios from "axios";

const LeaderBoardService = {
    getAll : ()=>{
        return axios.get('storage.json');
    }
}

export default LeaderBoardService;