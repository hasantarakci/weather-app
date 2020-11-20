<template>
  <div>
    <VueHeader />
    <div class="search-area">
      <VueInput ref="cityinput" placeholder="Şehir" v-model="searchCityName" />
      <VueButton @click="searchCity" buttonTitle="Ara" />
    </div>
    <ul class="city-list">
      <li class="city-items" v-for="city in multiCityWeather" :key="city.id">
        <p class="city-name">
          Weather in {{ city.name }}, {{ city.sys.country }}
          <img
            :src="`http://openweathermap.org/images/flags/${city.sys.country.toLowerCase()}.png`"
          />
        </p>
        <p class="city-temperature">
          <img
            :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`"
            alt="01n@2x.png"
            class="circle-img"
            width="50"
            height="50"
          />
          {{ city.main.temp }} °C
          <img
            @click="showWeatherForecast(city.id)"
            :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`"
            :title="`${city.name} şehrinin 8 günlük hava tahmini için tıklayınız`"
            alt="01n@2x.png"
            class="info-img"
            width="50"
            height="50"
          />
          <button @click="deleteCity(city.id)">Sil</button>
        </p>
        <a
          :href="`https://www.google.com.tr/maps/@${city.coord.lat},${city.coord.lon},10z`"
          target="_blank"
          class="google-link"
        >{{ city.name }} şehrini haritada görüntüleyiniz</a>
        <VueTable
          class="table-wrapper"
          :data="{
            Weather: city.weather[0].main,
            'Min-Temp': city.main.temp_min + ' °C',
            'Max-Temp': city.main.temp_max + ' °C',
            'Feels Like': city.main.feels_like + ' °C',
            Pressure: city.main.pressure + ' hPa',
            Humidity: city.main.humidity + '%',
            'Wind Speed': city.wind.speed + ' m/s',
            'Geo-Coords': 'Lon: ' + city.coord.lon + ' - Lat: ' + city.coord.lat,
            Sunrise:
              new Date(city.sys.sunrise * 1000).getHours() +
              ':' +
              new Date(city.sys.sunrise * 1000).getMinutes(),
            Sunset:
              new Date(city.sys.sunset * 1000).getHours() +
              ':' +
              new Date(city.sys.sunset * 1000).getMinutes(),
          }"
        ></VueTable>
      </li>
    </ul>
    <div v-if="showForecastModal">forecast</div>
    <VueFooter />
  </div>
</template>

<script>
import VueHeader from '@/components/VueHeader.vue';
import VueFooter from '@/components/VueFooter.vue';
import VueButton from '@/components/VueButton.vue';
import VueInput from '@/components/VueInput.vue';
import VueTable from '@/components/VueTable.vue';
import CityWeather from '@/services/Api/cityWeather';

export default {
  name: 'Home',
  components: {
    VueHeader,
    VueFooter,
    VueButton,
    VueInput,
    VueTable,
  },
  data() {
    return {
      multiCityId: [745044, 323786, 740481, 296562, 2643743, 311044],
      multiCityWeather: [],
      searchCityName: '',
      cityWeatherForecast: [],
      showForecastModal: false,
    };
  },
  methods: {
    getMultiCityWeather() {
      CityWeather.getMultiCityWeather(...this.multiCityId)
        .then(response => {
          this.multiCityWeather = response.data.list;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCityWeather() {
      CityWeather.getCityWeather(this.searchCityName)
        .then(response => {
          let index = this.multiCityId.indexOf(response.data.id);
          if (index < 0) {
            if (this.multiCityId.length >= 20) {
              this.multiCityId.pop();
            }
            this.multiCityId.unshift(response.data.id);
            this.getMultiCityWeather();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCityWeatherForecast(cityId) {
      CityWeather.getCityWeatherForecast(cityId)
        .then(response => {
          this.cityWeatherForecast = response.data.list;
          console.log(this.cityWeatherForecast);
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchCity() {
      this.getCityWeather();
    },
    deleteCity(cityId) {
      if (this.multiCityId.length > 1) {
        let index = this.multiCityId.indexOf(cityId);
        this.multiCityId.splice(index, 1);
        this.getMultiCityWeather();
      }
    },
    showWeatherForecast(cityId) {
      this.showForecastModal = true;
      this.getCityWeatherForecast(cityId);
    },
  },
  created() {
    this.getMultiCityWeather();
  },
};
</script>

<style lang="scss" scoped>
.search-area {
  text-align: center;
}

.city-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;

  .city-items {
    max-width: 500px;
    // flex-basis: 400px;
    text-align: left;
    margin: 5px;

    .city-name,
    .city-temperature {
      margin: 10px 0;
    }

    .city-name {
      font: 24px Oswald, sans-serif;
      color: #505050;

      img {
        vertical-align: middle;
      }
    }

    .city-temperature {
      font: 30px Oswald, sans-serif;
      display: flex;
      align-items: center;
      color: #505050;
      .info-img {
        cursor: pointer;
      }
    }

    .google-link {
      color: black;
      font-weight: bold;
      &:visited {
        color: black;
      }
      &:hover,
      &:link:hover {
        text-decoration-color: red;
      }
    }

    .table-wrapper {
      margin: 10px 0;
    }
  }
}
</style>
