import axios from 'axios';
import { AUTH_TOKEN, BASE_URL_SERVER } from '../../../../../Configs/server';


const API_ENDPOINT = {
  GET_LOCATION_LIST: "/api/locations",
  GET_DETAILS: "api/locations/{id}",
  UPDATE_DETAILS: "api/locations/{id}",
  CREATE_NEW: "/api/locations",
  DELETE_LOCATION: "api/locations/{id}"
}

const configs = {
  headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
};

class LocationService {

  getLocationList = async () => {
    return await axios.get(BASE_URL_SERVER + API_ENDPOINT.GET_LOCATION_LIST);
  };

  getLocationDetail = async (id) => {
    return await axios.get(
      BASE_URL_SERVER + API_ENDPOINT.GET_DETAILS + id,
      configs
    );
  };

  updateDetails = async (id, data) => {
    return await axios.put(
      BASE_URL_SERVER + API_ENDPOINT.UPDATE_DETAILS + id,
      data,
      configs
    );
  };

  createNew = async (data) => {
    return await axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_NEW, data, configs);
  };

  deleteLocation = async (id) => {
    return await axios.deleteAirline(BASE_URL_SERVER + API_ENDPOINT.DELETE_LOCATION + id, configs);
  }
}

const locationsService = new LocationService();
export default locationsService;
