import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { WebserviceService } from 'src/app/service/webservice.service';
import 'leaflet.pm';
declare var $: any;
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  public map: any;
  center_latlng: any = [14.26625690599938, 100.06070528823888];
  zoom: any = 6;
  layerMap: any;

  list_province: any = [];
  list_amphoe: any = [];
  list_tambon: any = [];
  province: any = "";
  amphoe: any = "";
  tambon: any = "";

  layer_group: any;

  station_list: any = [];
  station: any = {
    areaTH: "",
    nameTH: "",
    lat: "",
    long: "",
  };

  st_icon = L.icon({
    iconUrl: 'assets/images/hospital.png',
    iconSize: [20, 27],
    iconAnchor: [0, 0],
  })

  station_layer: any;

  st_check: any = true;





  constructor(
    private webservice: WebserviceService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.initmap();
    await this.getData();
  }

  async getData() {
    await this.webservice.province().then((res: any) => {
      // console.log(res);

      function compare(a: any, b: any) {
        if (a.properties.pv_th < b.properties.pv_th) {
          return -1;
        }
        if (a.properties.pv_th > b.properties.pv_th) {
          return 1;
        }
        return 0;
      }
      res.features.sort(compare);

      this.list_province = res.features;
      console.log(this.list_province);


    })

    await this.setBoundaryInMap('province');

    await this.webservice.airData().then((res: any) => {
      console.log(res.stations);
      this.station_list = res.stations;
      this.getStation();
    })
  }

  async setBoundaryInMap(type: any) {
    if (this.layer_group != null) {
      this.layer_group.clearLayers();
    }
    if (type == "province") {
      await this.list_province.forEach((e: any) => {
        var bounds = L.geoJson(e, {
          onEachFeature: onEachFeature
        }).addTo(this.layer_group);
      })

      function onEachFeature(feature: any, layer: any) {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        layer.setStyle({
          color: '#' + randomColor,
          fillColor: '#' + randomColor,
          dashArray: 5,
          fillOpacity: 0.5,
        })
        // layer.bindPopup("จังหวัด : " + feature.properties.pv_th);
      }
      this.map.setView(this.center_latlng, this.zoom);

    } else if (type == "amphoe") {
      await this.list_amphoe.forEach((e: any) => {
        var bounds = L.geoJson(e, {
          onEachFeature: onEachFeature
        }).addTo(this.layer_group);
      })

      function onEachFeature(feature: any, layer: any) {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        layer.setStyle({
          color: '#' + randomColor,
          fillColor: '#' + randomColor,
          dashArray: 5,
          fillOpacity: 0.5,
        })
        // layer.bindPopup("อำเภอ : " + feature.properties.ap_th);
      }
    } else if (type == "tambon") {
      await this.list_tambon.forEach((e: any) => {
        var bounds = L.geoJson(e, {
          onEachFeature: onEachFeature
        }).addTo(this.layer_group);
      })

      function onEachFeature(feature: any, layer: any) {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        layer.setStyle({
          color: '#' + randomColor,
          fillColor: '#' + randomColor,
          dashArray: 5,
          fillOpacity: 0.5,
        })
        // layer.bindPopup("ตำบล : " + feature.properties.tb_th);
      }
    }


  }



  async initmap() {
    this.map = L.map("map").setView(this.center_latlng, this.zoom);
    this.layerMap = L.tileLayer(
      "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      {
        maxZoom: 25,
      }
    ).addTo(this.map);
    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);

    this.map.pm.addControls({
      position: 'topright',
      drawCircle: false,
      drawPolygon: false,
      drawPolyline: false,
      drawRectangle: false,
      drawCircleMarker: false,
      removalMode: false,
      cutPolygon: false,
      editMode: false,
      dragMode: false,
    });

    this.map.on('pm:create', (e: any) => {
      console.log(e.layer._latlng);
      e.layer.remove();
      this.station.lat = e.layer._latlng.lat;
      this.station.long = e.layer._latlng.lng;
      $("#create_station").modal('show');
    });

    // this.map.pm.enableDraw('Marker', { snappable: false });


    this.layer_group = L.layerGroup();
    this.layer_group.addTo(this.map)
    this.station_layer = L.layerGroup();
    this.station_layer.addTo(this.map)
  }

  async change_select_province(type: any) {

    if (type == "province") {
      await this.webservice.amphoe(this.province).then((res: any) => {
        function compare(a: any, b: any) {
          if (a.properties.ap_th < b.properties.ap_th) {
            return -1;
          }
          if (a.properties.ap_th > b.properties.ap_th) {
            return 1;
          }
          return 0;
        }
        res.features.sort(compare);
        this.list_amphoe = res.features;
      })
      this.amphoe = "";
      this.tambon = "";
      if (this.province == "") {
        this.setBoundaryInMap(type);
      } else {
        this.setBoundaryInMap('amphoe');
      }


    }
    if (type == "amphoe") {
      await this.webservice.tambon(this.province, this.amphoe).then((res: any) => {
        function compare(a: any, b: any) {
          if (a.properties.tb_th < b.properties.tb_th) {
            return -1;
          }
          if (a.properties.tb_th > b.properties.tb_th) {
            return 1;
          }
          return 0;
        }
        res.features.sort(compare);
        this.list_tambon = res.features;
      })
      this.tambon = "";
      if (this.amphoe == "") {
        this.setBoundaryInMap('amphoe');
      } else {
        this.setBoundaryInMap('tambon');
      }
    }
    if (type == "tambon") {
      if (this.tambon == "") {
        this.setBoundaryInMap('tambon');
      } else {
        let f = this.list_tambon.find((find: any) => find.properties.tb_th == this.tambon);
        if (f != undefined) {
          this.layer_group.clearLayers();
          var bounds = L.geoJson(f, {
            onEachFeature: onEachFeature
          }).addTo(this.layer_group);
          this.map.fitBounds(bounds.getBounds());
          function onEachFeature(feature: any, layer: any) {
            var randomColor = Math.floor(Math.random() * 16777215).toString(16);
            layer.setStyle({
              color: '#' + randomColor,
              fillColor: '#' + randomColor,
              dashArray: 5,
              fillOpacity: 0.5,
            })
            layer.bindPopup("ตำบล : " + feature.properties.tb_th);
          }
        }
      }

    }

  }

  getStation() {
    // var st_divicon = L.divIcon({
    //   // Specify a class name we can refer to in CSS.
    //   className: 'css-icon-charge',
    //   html: '<div class="gps_ring"></div>'
    //   // Set marker width and height
    //   , iconSize: [5, 5]
    //   , iconAnchor: [2.5, 2.5]
    // })
    this.station_list.forEach((e: any) => {
      var st = L.marker([e.lat, e.long], { icon: this.st_icon }).bindPopup(
        '<table class="table table-bordered"><tr><td>Nameth:</td><td>' + e.nameTH + '</td></tr>' +
        '<tr><td>areaTH:</td><td>' + e.areaTH + '<td></tr>' +
        '<tr><td>AQI:</td><td>' + 'level:' + e.LastUpdate.AQI.Level + "aqi:" + e.LastUpdate.AQI.aqi + '</td></tr>' +
        '<tr><td>CO:</td><td>' + 'unit:' + e.LastUpdate.CO.unit + "value:" + e.LastUpdate.CO.value + '</td></tr>' +
        '<tr><td>NO2:</td><td>' + 'unit:' + e.LastUpdate.NO2.unit + "value:" + e.LastUpdate.NO2.value + '</td></tr>' +
        '<tr><td>O3:</td><td>' + 'unit:' + e.LastUpdate.O3.unit + "value:" + e.LastUpdate.O3.value + '</td></tr>' +
        '<tr><td>PM10:</td><td>' + 'unit:' + e.LastUpdate.PM10.unit + "value:" + e.LastUpdate.PM10.value + '</td></tr>' +
        '<tr><td>PM25:</td><td>' + 'unit:' + e.LastUpdate.PM25.unit + "value:" + e.LastUpdate.PM25.value + '</td></tr>' +
        '<tr><td>SO2:</td><td>' + 'unit:' + e.LastUpdate.SO2.unit + "value:" + e.LastUpdate.O3.value + '</td></tr>' +
        '</table>').addTo(this.station_layer);

      // var tooltip = L.popup()
      //   .setLatLng([e.lat, e.long])
      //   .setContent('<table><tr><td>Nameth:<td><td>' + e.nameTH + '<td></tr>' +
      //               '<tr><td>areaTH:<td><td>' + e.areaTH + '<td></tr>' +
      //               '<tr><td>AQI:<td><td>' +'level:'+ e.LastUpdate.AQI.Level +"aqi:" + e.LastUpdate.AQI.aqi + '<td></tr>' +
      //               '<tr><td>CO:<td><td>' +'unit:'+ e.LastUpdate.CO.unit +"value:" + e.LastUpdate.CO.value + '<td></tr>' +
      //               '<tr><td>NO2:<td><td>' +'unit:'+ e.LastUpdate.NO2.unit +"value:" + e.LastUpdate.NO2.value + '<td></tr>' +
      //               '<tr><td>O3:<td><td>' +'unit:'+ e.LastUpdate.O3.unit +"value:" + e.LastUpdate.O3.value + '<td></tr>' +
      //               '<tr><td>PM10:<td><td>' +'unit:'+ e.LastUpdate.PM10.unit +"value:" + e.LastUpdate.PM10.value + '<td></tr>' +
      //               '<tr><td>PM25:<td><td>' +'unit:'+ e.LastUpdate.PM25.unit +"value:" + e.LastUpdate.PM25.value + '<td></tr>' +
      //               '<tr><td>SO2:<td><td>' +'unit:'+ e.LastUpdate.SO2.unit +"value:" + e.LastUpdate.O3.value + '<td></tr>' +
      //                '</table>')
      //   .addTo(this.map);
    });
  }

  stCheck() {
    switch (this.st_check) {
      case true:
        this.getStation();
        break;
      case false:
        this.station_layer.clearLayers();
        break;
    }

  }

  saveStation() {
    console.log(this.station);
    L.marker([this.station.lat, this.station.long], { icon: this.st_icon }).bindPopup(
      '<table class="table table-bordered"><tr><td>Nameth:</td><td>' + this.station.nameTH + '</td></tr>' +
      '<tr><td>areaTH:</td><td>' + this.station.areaTH + '<td></tr>' +
      '</table>').addTo(this.station_layer);
    this.map.pm.disableDraw('Marker');
  }




}


