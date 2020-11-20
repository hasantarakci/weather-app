import axios from 'axios';

let HttpService = axios.create();
let baseurl = process.env.VUE_APP_API_BASE_URL;

class cityWeather {
  subdomain = 'data/2.5';

  // Get city weather with cityName
  getCityWeather(cityName) {
    return HttpService.get(
      `${baseurl}/${this.subdomain}/weather?q=${cityName}&appid=${process.env.VUE_APP_API_KEY}`,
    );
  }

  // Get multi city weather with cityId
  getMultiCityWeather(...arr) {
    return HttpService.get(
      `${baseurl}/${this.subdomain}/group?id=${[...arr]}&units=metric&appid=${
        process.env.VUE_APP_API_KEY
      }`,
    );
  }

  // Get city weather forecast with cityId
  getCityWeatherForecast(cityId) {
    return HttpService.get(
      `${baseurl}/${this.subdomain}/forecast?id=${cityId}&appid=${process.env.VUE_APP_API_KEY}`,
    );
  }
}

export default new cityWeather();
